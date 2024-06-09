import { FormEvent, useEffect, useState } from 'react';

import { Uploader } from './Uploader';
import {
  useCreateCourseChapterVideoMutation,
  useUpdateCourseChapterMutation,
  useUpdateDurationChapterMutation,
} from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const UploadVideo = ({
  courseID,
  chapterID,
  toggleEdit,
  setChapterVideo,
}: {
  courseID: string;
  chapterID: string;
  toggleEdit: () => void;
  setChapterVideo: (objectVideoURL: string) => void;
}) => {
  const token = useSelector((state: RootState) => state.user.token);
  const user = useSelector((state: RootState) => state.user.user);

  const [file, setFile] = useState<any>();
  const [objectVideoURL, setObjectVideoURL] = useState<string>('');
  const [uploader, setUploader] = useState<Uploader>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const [progress, setProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();

  const [createCourseChapterVideo] = useCreateCourseChapterVideoMutation();
  const [updateCourseChapter] = useUpdateCourseChapterMutation();
  const [updateDuration] = useUpdateDurationChapterMutation();

  useEffect(() => {
    if (file) {
      const videoUploaderOptions = {
        fileName: file.name,
        file: file,
        accessToken: token.accessToken,
      };
      console.log(file);
      const video = document.createElement('video');

      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        setVideoDuration(video.duration);
      };
      video.src = URL.createObjectURL(file);

      let percentage = 0;

      const uploader = new Uploader(videoUploaderOptions);
      setUploader(uploader);

      uploader
        .onProgress(({ percentage: newPercentage }: { percentage: number }) => {
          // to avoid the same percentage to be logged twice
          if (newPercentage !== percentage) {
            percentage = newPercentage;
            setProgress(percentage);
          }
        })

        .onError((error: any) => {
          setFile(undefined);
          console.error(error);
        })
        .onSuccess(({ objectVideoURL }: { objectVideoURL: string }) => {
          setObjectVideoURL(objectVideoURL);
          setUploading(false);
          setSuccess(true);
        });
      uploader.start();
      setUploading(true);
    }
  }, [file]);

  const onCancel = () => {
    if (uploader) {
      uploader.abort();
      setFile(undefined);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseMuxCreate = await createCourseChapterVideo({
      courseID,
      chapterID,
      objectVideoURL,
    }).unwrap();

    updateCourseChapter({
      courseID,
      chapterID,
      chapterVideoUrl: objectVideoURL,
      updatedAt: generateTime(),
    });

    updateDuration({
      userID: user.userID,
      courseID,
      chapterID,
      duration: Math.round(videoDuration as number),
    });

    updateCourseChapter({
      courseID,
      chapterID,
      muxData: {
        assetId: responseMuxCreate.id,
        playbackId: responseMuxCreate.playback_ids[0].id,
      },
      updatedAt: generateTime(),
    });
    setChapterVideo(objectVideoURL);
    toggleEdit();
  };
  console.log('videoDuration', videoDuration);

  return (
    <div>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="space-y-4 mt-4"
      >
        {!isSuccess && (
          <div>
            <h1>Upload your file</h1>
            <input
              type="file"
              accept=".mp4,.mkv"
              onChange={(e: any) => {
                console.log(e.target.files[0]);
                setFile(e.target?.files?.[0]);
              }}
            />
            <div>
              <button onClick={onCancel}>Cancel Upload</button>
            </div>
            <progress value={progress} max={100} />
          </div>
        )}

        <div>
          {isSuccess && (
            <div>
              {/* <MuxPlayer
                playbackId={responseMuxCreate.playback_ids[0].id}
                metadata={{
                  video_id: 'video-id-123456',
                  video_title: `Chapter Video ${chapterID}`,
                }}
                streamType="on-demand"
              /> */}
              <video src={objectVideoURL} controls className="w-full h-96" />
              <div className="text-xs text-muted-foreground mt-2">
                Videos can take a few minutes to process. Refresh the page if
                video does not appear.
              </div>
            </div>
          )}
          <div className="flex items-center gap-x-2">
            <button
              disabled={!isSuccess || uploading}
              type="submit"
              className={[
                !isSuccess
                  ? 'bg-gray-500/70 '
                  : 'cursor-pointer hover:bg-black bg-blue-500 ',
                'px-3 py-2 rounded-lg text-white font-bold',
              ].join('')}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadVideo;
