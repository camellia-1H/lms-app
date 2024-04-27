import { FormEvent, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useUpdateCourseMutation } from '../../redux/coursesApi';
import { generateTime } from '../../utils/string-utils';
import { useUploadS3ImageMutation } from '../../redux/utilsApi';
import toast from 'react-hot-toast';

interface ImageFormProps {
  initialData: {
    imageUrl: string;
  };
  courseID: string;
}
const userID = 'userID1';

export const ImageForm = ({ initialData, courseID }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl);
  const [previewImage, setpreviewImage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [typeImage, setTypeImage] = useState<string>('');

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    setpreviewImage('');
    setImageUrl(previewImage); //
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

    setFileName(currentFile.name);
    setTypeImage(currentFile.type);
  };

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const [uploadImageS3] = useUploadS3ImageMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(fileName);

    try {
      console.log(previewImage);
      console.log(imageUrl);
      const responeUploadImageS3: any = await uploadImageS3({
        imageUrl: previewImage,
        fileName: fileName,
        typeImage: typeImage,
      });
      await updateCourse({
        userID,
        courseID,
        imageUrl: responeUploadImageS3.data,
        updatedAt: generateTime(),
      }).unwrap();
      toast.success('Course updated');
      toggleEdit();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course thumbnail
        <button onClick={toggleEdit} className="flex items-center">
          {isEditing && <>Cancel</>}
          {!isEditing && !imageUrl && (
            <>
              <FontAwesomeIcon icon={faCirclePlus} className="h-4 w-4 mr-2" />
              Add an imageUrl
            </>
          )}
          {!isEditing && imageUrl && (
            <>
              <FontAwesomeIcon icon={faPencil} className="h-4 w-4 mr-2" />
              Edit imageUrl
            </>
          )}
        </button>
      </div>
      {!isEditing &&
        (!imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-6">
            <FontAwesomeIcon
              icon={faPencil}
              className="h-10 w-10 text-slate-500"
            />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img
              alt="Upload"
              className="object-cover rounded-md"
              src={imageUrl}
            />
          </div>
        ))}

      {isEditing && (
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
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
                  <p className="font-medium text-md py-3">Preview imageUrl</p>
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
              disabled={isLoading}
              type="submit"
              className={[
                isLoading
                  ? 'bg-gray-500/70 '
                  : 'cursor-pointer hover:bg-black bg-blue-500 ',
                'px-3 py-2 rounded-lg text-white font-bold',
              ].join('')}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
