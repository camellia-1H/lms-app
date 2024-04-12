import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPencil } from '@fortawesome/free-solid-svg-icons';

interface ChapterImageFormProps {
  initialData: {
    imageUrl: string;
  };
  courseID: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});

export const ChapterImageForm = ({
  initialData,
  courseID,
}: ChapterImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<string>(initialData.imageUrl);
  const [previewImage, setpreviewImage] = useState<string>('');

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    setpreviewImage('');
    setImage(previewImage); //
  };

  const setFileTobase = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // base64
    reader.onloadend = () => {
      setpreviewImage(reader.result as string);
    };
  };

  const onFileChange = (e: any) => {
    const currentFile = e.target.files[0];
    setFileTobase(currentFile);
    console.log(currentFile);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(previewImage);

      //   await axios.patch(`/api/courses/${courseID}`, values);
      //   toast.success('Course updated');
      toggleEdit();
      // window.location.reload();
      //   router.refresh();
    } catch {
      //   toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course thumbnail
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing && <>Cancel</>}
          {!isEditing && !image && (
            <>
              <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && image && (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </button>
      </div>
      {!isEditing &&
        (!image ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <FontAwesomeIcon
              icon={faPencil}
              className="h-10 w-10 text-slate-500"
            />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img alt="Upload" className="object-cover rounded-md" src={image} />
          </div>
        ))}

      {isEditing && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {!previewImage && (
            <div className="col-span-full">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-inherit rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                        className="sr-only"
                        onChange={onFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {previewImage && (
            <div className="w-96 h-full">
              <div className="flex items-center">
                <div className="justify-items-end">
                  <p className="font-medium text-md py-3">Preview image</p>
                  <div className="flex items-center ">
                    <img
                      src={previewImage}
                      className="w-full"
                      height={200}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
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
    </div>
  );
};
