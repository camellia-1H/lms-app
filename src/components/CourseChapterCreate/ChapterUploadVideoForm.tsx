import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import MuxUploader from '@mux/mux-uploader-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useUploadS3VideoMutation } from '../../redux/utilsApi';
import Loader from '../Loader';

interface ChapterUploadVideoFormProps {
  initialData: {
    chapterVideoURL: string;
  };
  chapterID: string;
}

const formSchema = z.object({
  chapterVideoURL: z.string().min(1, {
    message: 'chapterVideoURL is required',
  }),
});

export const ChapterUploadVideoForm = ({
  initialData,
  chapterID,
}: ChapterUploadVideoFormProps) => {
  const [previewCoureChapterVideo, setPreviewCoureChapterVideo] =
    useState<string>('');
  const [chapterVideoURL, setChapterVideoURL] = useState<string>(
    initialData?.chapterVideoURL
  );
  const [fileName, setFileName] = useState<string>('');
  const [typeVideo, setTypeVideo] = useState<string>('');

  const [isEditing, setIsEditing] = useState(false);
  const [uploadVieoS3, { isLoading }] = useUploadS3VideoMutation();

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
      uploadVieoS3({
        videoBase64: previewCoureChapterVideo,
        fileName,
        typeVideo,
      });
      //   await axios.patch(`/api/courses/${chapterID}`, values);
      //   toast.success('Course updated');
      toggleEdit();
      //   router.refresh();
    } catch {
      //   toast.error('Something went wrong');
    }
  };

  const handlerUploadVieo = (e: any): any => {
    /// TODO : callapi upload video
    setFileName(e.name);
    setTypeVideo(e.type);

    const reader = new FileReader();
    // const currentFile = e.target.files[0];
    reader.readAsDataURL(e); // base64
    reader.onloadend = () => {
      console.log(reader.result);
      setPreviewCoureChapterVideo(reader.result as string);
    };
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapterVideoURL
        {isLoading && (
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
