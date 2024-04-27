import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPencil } from '@fortawesome/free-solid-svg-icons';

import UploadVideo from '../UploadCore/UploadVideo';

interface ChapterUploadVideoFormProps {
  initialData: {
    chapterVideoURL: string;
  };
  chapterID: string;
  courseID: string;
}

export const ChapterUploadVideoForm = ({
  initialData,
  chapterID,
  courseID,
}: ChapterUploadVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [chapterVideo, setChapterVideo] = useState<string>(
    initialData.chapterVideoURL
  );

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapterVideoURL
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing && <>Cancel</>}
          {!isEditing && !chapterVideo && (
            <>
              <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4 mr-2" />
              Add an chapter Video
            </>
          )}
          {!isEditing && chapterVideo && (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit chapterVideoURL
            </>
          )}
        </button>
      </div>
      {!isEditing &&
        (!chapterVideo ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-6">
            <FontAwesomeIcon
              icon={faPencil}
              className="h-10 w-10 text-slate-500"
            />
          </div>
        ) : (
          <div className="relative aspect-video mt-6 ring-1 ring-gray-200 rounded-md">
            <video
              src={chapterVideo}
              // autoPlay
              controls
              loop
              className="w-full h-96"
            ></video>
          </div>
        ))}

      {isEditing && (
        <div className="">
          <UploadVideo
            courseID={courseID}
            chapterID={chapterID}
            toggleEdit={toggleEdit}
            setChapterVideo={setChapterVideo}
          />
        </div>
      )}
    </div>
  );
};
