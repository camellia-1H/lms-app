import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import MuxUploader from '@mux/mux-uploader-react';
import MuxPlayer from '@mux/mux-player-react/lazy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import * as UpChunk from '@mux/upchunk';

import {
  useGenerateAuthenticatedMuxURLMutation,
  useUploadS3VideoMutation,
} from '../../redux/utilsApi';
import Loader from '../Loader';
import { generateTime } from '../../utils/string-utils';
import { useCreateCourseChapterVideoMutation } from '../../redux/coursesApi';

interface ChapterUploadVideoFormProps {
  initialData: {
    chapterVideoURL: string;
  };
  chapterID: string;
  courseID: string;
}

interface ResponseMutation {
  data: any;
}

const formSchema = z.object({
  chapterVideoURL: z.string().min(1, {
    message: 'chapterVideoURL is required',
  }),
});

export const ChapterUploadVideoForm = ({
  initialData,
  chapterID,
  courseID,
}: ChapterUploadVideoFormProps) => {
  const [previewCoureChapterVideo, setPreviewCoureChapterVideo] =
    useState<string>('');
  const [chapterVideoURL, setChapterVideoURL] = useState<string>(
    initialData?.chapterVideoURL
  );
  const [fileName, setFileName] = useState<string>('');
  const [typeVideo, setTypeVideo] = useState<string>('');

  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [currentFile, setCurrentFile] = useState<any>(null);

  const [uploadVieoS3, { isLoading, isSuccess }] = useUploadS3VideoMutation();
  const [
    generateAuthenticatedMuxURL,
    // { data, isSuccess: isGenerateSuccess, isLoading: isGenerateLoading },
  ] = useGenerateAuthenticatedMuxURLMutation();
  const [
    createCourseChapterVideo,
    {
      isLoading: createCourseChapterVideoLoading,
      isSuccess: createCourseChapterVideoSuccess,
    },
  ] = useCreateCourseChapterVideoMutation();

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    setChapterVideoURL(previewCoureChapterVideo);
    setPreviewCoureChapterVideo('');
    // setProgress(0);
  };

  // useEffect(() => {
  //   if (isGenerateSuccess) {
  //     try {
  //       const upload = UpChunk.createUpload({
  //         endpoint: data,
  //         file: currentFile, // the file object with all your video file’s data
  //         chunkSize: 1024, // Uploads the file in ~5mb chunks
  //       });
  //       console.log(upload);

  //       // Subscribe to events
  //       upload.on('error', (error) => {
  //         setStatusMessage(error.detail);
  //       });

  //       upload.on('progress', (progress) => {
  //         setProgress(progress.detail);
  //       });

  //       upload.on('success', () => {
  //         console.log(upload);
  //         setStatusMessage("Wrap it up, we're done here. 👋");
  //       });
  //     } catch (error) {
  //       console.log(`😱 Creating authenticated upload url failed: ${error}`);
  //     }
  //   }
  // }, [isGenerateLoading]);

  // useEffect(() => {
  //   createCourseChapterVideo({ courseID, chapterID, objectVideoURL });
  // }, [isSuccess]);
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const objectVideoURL = await uploadVieoS3({
        videoBase64: previewCoureChapterVideo,
        fileName,
        typeVideo,
      }).unwrap();

      // await createCourseChapterVideo({
      //   courseID,
      //   chapterID,
      //   objectVideoURL,
      // });

      // console.log(objectVideoURL);
      // if (!objectVideoURL) {
      //   alert('Create Video error');
      // }
      // const objectVideoURL = payload.data;

      //   toast.success('Course updated');
      toggleEdit();
      //   router.refresh();
    } catch {
      //   toast.error('Something went wrong');
    }
  };

  const handlerUploadVieo = async (e: any) => {
    const currentFile = e.files[0];
    setCurrentFile(currentFile);

    setFileName(currentFile.name);
    setTypeVideo(currentFile.type);

    const reader = new FileReader();
    reader.readAsDataURL(currentFile); // base64
    reader.onloadend = () => {
      console.log(reader.result);
      setPreviewCoureChapterVideo(reader.result as string);
    };
    // const authenticatedMuxURL = await generateAuthenticatedMuxURL('').unwrap();
    // console.log(authenticatedMuxURL);

    // try {
    //   const upload = UpChunk.createUpload({
    //     endpoint: authenticatedMuxURL,
    //     file: currentFile, // the file object with all your video file’s data
    //     chunkSize: 1024, // Uploads the file in ~5mb chunks
    //   });
    //   console.log(upload);

    //   // Subscribe to events
    //   upload.on('error', (error) => {
    //     setStatusMessage(error.detail);
    //   });

    //   upload.on('progress', (progress) => {
    //     console.log(progress.detail);
    //     setProgress(progress.detail);
    //   });

    //   upload.on('success', () => {
    //     console.log(upload);
    //     setStatusMessage("Wrap it up, we're done here. 👋");
    //   });
    //   upload.on('chunkSuccess', (chunkSuccess) => {
    //     console.log(chunkSuccess);
    //   });
    // } catch (error) {
    //   console.log(`😱 Creating authenticated upload url failed: ${error}`);
    // }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapterVideoURL
        {(isLoading || createCourseChapterVideoLoading) && (
          <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
            <Loader />
          </div>
        )}
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing && <>Cancel</>}
          {!isEditing && !chapterVideoURL && (
            <>
              <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4 mr-2" />
              Add an chapter Video
            </>
          )}
          {!isEditing && chapterVideoURL && (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit chapterVideoURL
            </>
          )}
        </button>
      </div>
      {!isEditing &&
        (!chapterVideoURL ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-6">
            <FontAwesomeIcon
              icon={faPencil}
              className="h-10 w-10 text-slate-500"
            />
          </div>
        ) : (
          <div className="relative aspect-video mt-6 ring-1 ring-gray-200 rounded-md">
            <video
              src={chapterVideoURL}
              // autoPlay
              controls
              loop
              className="w-full h-96"
            ></video>
          </div>
        ))}
      {isEditing && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {!previewCoureChapterVideo && (
            <MuxUploader
              endpoint={async (e) => {
                const authenticatedMuxURL = await generateAuthenticatedMuxURL(
                  ''
                ).unwrap();
                return authenticatedMuxURL as string;
              }}
              onUploadError={(e) => console.log(e)}
              onSuccess={(e) => console.log(e)}
              dynamicChunkSize={true}
              maxFileSize={1024000}
            />
          )}
          {!previewCoureChapterVideo && progress !== 100 && (
            <>
              <input
                type="file"
                onChange={(e) => handlerUploadVieo(e.target)}
                name=""
                id=""
              />
              <label htmlFor="upload-progress">Downloading progress:</label>
              <progress value={progress} max="100" />

              <em>{statusMessage}</em>
            </>
          )}

          {previewCoureChapterVideo && (
            <video
              src={previewCoureChapterVideo}
              // autoPlay
              controls
              loop
              className="w-full h-96"
            ></video>
          )}
          <div className="flex items-center gap-x-2">
            <button
              disabled={!isValid || isSubmitting || !previewCoureChapterVideo}
              type="submit"
              className={[
                !isValid || isSubmitting || !previewCoureChapterVideo
                  ? ''
                  : 'cursor-pointer ',
                'px-3 py-2 rounded-lg text-white font-bold hover:bg-black bg-blue-500',
              ].join('')}
            >
              Save
            </button>
          </div>
        </form>
      )}

      {initialData.chapterVideoURL && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
      {/* {createCourseChapterVideoSuccess && ( */}
      {/* <MuxPlayer
        loading="viewport"
        playbackId="nzs1IoMNrFHItxDJbr2NDkTbqJHPbYhRJNHlOW8nVPU"
        metadata={{
          video_id: 'video-id-123456',
          video_title: 'Bick Buck Bunny',
          viewer_user_id: 'user-id-bc-789',
        }}
        streamType="on-demand"
      /> */}
      {/* )} */}
    </div>
  );
};
