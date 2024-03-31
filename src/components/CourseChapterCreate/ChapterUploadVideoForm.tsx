import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import MuxUploader from '@mux/mux-uploader-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faPencil,
  faWater,
} from '@fortawesome/free-solid-svg-icons';

interface ChapterUploadVideoFormProps {
  initialData: {
    chapterVideoURL: string;
  };
  courseId: string;
}

const formSchema = z.object({
  chapterVideoURL: z.string().min(1, {
    message: 'chapterVideoURL is required',
  }),
});

export const ChapterUploadVideoForm = ({
  initialData,
  courseId,
}: ChapterUploadVideoFormProps) => {
  const [previewCoureChapterVideo, setPreviewCoureChapterVideo] =
    useState<any>('');
  const [chapterVideoURL, setChapterVideoURL] = useState<string>(
    initialData?.chapterVideoURL
  );

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    setChapterVideoURL(previewCoureChapterVideo);
    setPreviewCoureChapterVideo('');
  };

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //   await axios.patch(`/api/courses/${courseId}`, values);
      //   toast.success('Course updated');
      toggleEdit();
      //   router.refresh();
    } catch {
      //   toast.error('Something went wrong');
    }
  };

  const handlerUploadVieo = (e: any): any => {
    /// TODO : callapi upload video
    console.log(e);
    try {
      const reader = new FileReader();
      // const currentFile = e.target.files[0];
      reader.readAsDataURL(e); // base64
      reader.onloadend = () => {
        setPreviewCoureChapterVideo(reader.result as string);
      };
    } catch (error) {
      throw new Error('Function not implemented.');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapterVideoURL
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
              endpoint={(e: any) => handlerUploadVieo(e)}
              onUploadError={(e) => console.log(e)}
            />
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
              disabled={!isValid || isSubmitting}
              type="submit"
              className="px-3 py-2 rounded-lg text-white font-bold hover:bg-black bg-blue-500"
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
    </div>
  );
};
