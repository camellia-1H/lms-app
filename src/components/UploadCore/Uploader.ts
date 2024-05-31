import axios from 'axios';

// initializing axios
const api = axios.create({
  baseURL: 'https://a50crcnry3.execute-api.us-east-1.amazonaws.com/Dev/s3',
});

interface UploaderParam {
  chunkSize: number;
  // number of parallel uploads
  threadsQuantity: number;
  file: string;
  fileName: string;
  aborted: boolean;
  uploadedSize: number;
  progressCache: {};
  activeConnections: {};
  parts: [];
  uploadedParts: [];
  fileId: null;
  fileKey: null;
  objectVideoURL: string;
  onProgressFn: () => {};
  onErrorFn: () => {};
  onSuccessFn: () => {};
  accessToken: string;
}

// original source: https://github.com/pilovm/multithreaded-uploader/blob/master/frontend/uploader.js
export class Uploader {
  chunkSize: any;
  threadsQuantity: number;
  file: any;
  fileName: any;
  aborted: boolean;
  uploadedSize: number;
  progressCache: any;
  activeConnections: any;
  parts: any[];
  uploadedParts: any[];
  fileId: null;
  fileKey: null;
  objectVideoURL: string;
  onProgressFn: (param: any) => void;
  onErrorFn: (error: any) => void;
  onSuccessFn: (param: any) => void;
  accessToken: string;
  constructor(options: Partial<UploaderParam>) {
    // this must be bigger than or equal to 5MB,
    // otherwise AWS will respond with:
    // "Your proposed upload is smaller than the minimum allowed size"
    this.chunkSize = options.chunkSize || 1024 * 1024 * 10;
    // number of parallel uploads
    this.threadsQuantity = Math.min(options.threadsQuantity || 5, 15);
    this.file = options.file;
    this.fileName = options.fileName;
    this.aborted = false;
    this.uploadedSize = 0;
    this.progressCache = {};
    this.activeConnections = {};
    this.parts = [];
    this.uploadedParts = [];
    this.fileId = null;
    this.fileKey = null;
    this.objectVideoURL = '';
    this.onProgressFn = () => {};
    this.onErrorFn = () => {};
    this.onSuccessFn = () => {};
    this.accessToken = options.accessToken as string;
  }

  start() {
    this.initialize();
  }

  async initialize() {
    try {
      let fileName = this.fileName;

      // initializing the multipart request
      const videoInitializationUploadInput = {
        fileName: fileName,
      };
      const initializeReponse = await api.request({
        url: '/uploads/initializeMultipartUpload',
        method: 'POST',
        data: videoInitializationUploadInput,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      const AWSFileDataOutput = initializeReponse.data;

      this.fileId = AWSFileDataOutput.fileId;
      this.fileKey = AWSFileDataOutput.fileKey;

      // retrieving the pre-signed URLs
      const numberOfparts = Math.ceil(this.file.size / this.chunkSize);

      const AWSMultipartFileDataInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: numberOfparts,
      };

      const urlsResponse = await api.request({
        url: '/uploads/getMultipartPreSignedUrls',
        method: 'POST',
        data: AWSMultipartFileDataInput,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      const newParts = urlsResponse.data.parts;
      this.parts.push(...newParts);

      this.sendNext();
    } catch (error) {
      await this.complete(error);
    }
  }

  sendNext() {
    const activeConnections = Object.keys(this.activeConnections).length;

    if (activeConnections >= this.threadsQuantity) {
      return;
    }

    if (!this.parts.length) {
      if (!activeConnections) {
        this.complete();
      }

      return;
    }

    const part = this.parts.pop();
    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);

      const sendChunkStarted = () => {
        this.sendNext();
      };

      this.sendChunk(chunk, part, sendChunkStarted)
        .then(() => {
          this.sendNext();
        })
        .catch((error) => {
          this.parts.push(part);

          this.complete(error);
        });
    }
  }

  async complete(error?: any) {
    if (error && !this.aborted) {
      this.onErrorFn(error);
      return;
    }

    if (error) {
      this.onErrorFn(error);
      return;
    }

    try {
      await this.sendCompleteRequest();
    } catch (error) {
      this.onErrorFn(error);
    }
  }

  async sendCompleteRequest() {
    if (this.fileId && this.fileKey) {
      const videoFinalizationMultiPartInput = {
        fileId: this.fileId,
        fileKey: this.fileKey,
        parts: this.uploadedParts,
      };

      const response = await api.request({
        url: '/uploads/finalizeMultipartUpload',
        method: 'POST',
        data: videoFinalizationMultiPartInput,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      this.objectVideoURL = response.data;
      this.onSuccessFn({
        objectVideoURL: response.data,
      });
    }
  }

  sendChunk(chunk: any, part: any, sendChunkStarted: any) {
    return new Promise<void>((resolve, reject) => {
      this.upload(chunk, part, sendChunkStarted)
        .then((status) => {
          if (status !== 200) {
            reject(new Error('Failed chunk upload'));
            return;
          }

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  handleProgress(part: any, event: any) {
    if (this.file) {
      if (
        event.type === 'progress' ||
        event.type === 'error' ||
        event.type === 'abort'
      ) {
        this.progressCache[part] = event.loaded;
      }

      if (event.type === 'uploaded') {
        this.uploadedSize += this.progressCache[part] || 0;
        delete this.progressCache[part];
      }

      const inProgress = Object.keys(this.progressCache)
        .map(Number)
        .reduce((memo, id) => (memo += this.progressCache[id]), 0);

      const sent = Math.min(this.uploadedSize + inProgress, this.file.size);

      const total = this.file.size;

      const percentage = Math.round((sent / total) * 100);

      this.onProgressFn({
        sent: sent,
        total: total,
        percentage: percentage,
      });
    }
  }

  upload(file: any, part: any, sendChunkStarted: any) {
    // uploading each part with its pre-signed URL
    return new Promise((resolve, reject) => {
      if (this.fileId && this.fileKey) {
        const xhr = (this.activeConnections[part.PartNumber - 1] =
          new XMLHttpRequest());
        sendChunkStarted();

        const progressListener = this.handleProgress.bind(
          this,
          part.PartNumber - 1
        );

        xhr.upload.addEventListener('progress', progressListener);

        xhr.addEventListener('error', progressListener);
        xhr.addEventListener('abort', progressListener);
        xhr.addEventListener('loadend', progressListener);

        xhr.open('PUT', part.signedUrl);

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const ETag = xhr.getResponseHeader('ETag');

            if (ETag) {
              const uploadedPart = {
                PartNumber: part.PartNumber,
                ETag: ETag.replaceAll('"', ''),
              };

              this.uploadedParts.push(uploadedPart);

              resolve(xhr.status);
              delete this.activeConnections[part.PartNumber - 1];
            }
          }
        };

        xhr.onerror = (error) => {
          reject(error);
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.onabort = () => {
          reject(new Error('Upload canceled by user'));
          delete this.activeConnections[part.PartNumber - 1];
        };

        xhr.send(file);
      }
    });
  }

  onProgress(onProgress: any) {
    this.onProgressFn = onProgress;
    return this;
  }

  onError(onError: any) {
    this.onErrorFn = onError;
    return this;
  }

  onSuccess(onSuccess: any) {
    this.onSuccessFn = onSuccess;
    return this.objectVideoURL;
  }

  abort() {
    Object.keys(this.activeConnections)
      .map(Number)
      .forEach((id) => {
        this.activeConnections[id].abort();
      });

    this.aborted = true;
  }
}
