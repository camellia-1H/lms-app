import { FC, useEffect, useState } from 'react';
// import { useScanAllCoursesMutation } from '../redux/coursesApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import {
  useGetUserInfoMutation,
  useUpdateUserInfoMutation,
} from '../../../redux/userApi';
import Loader from '../../../components/Loader';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useUploadS3ImageMutation } from '../../../redux/utilsApi';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import ListPackage from '../../../components/Dashboard/ListPackage';

const formSchema = z.object({
  email: z.string().email().min(1, 'Bắt buộc'),
  name: z.string().min(1, 'Name must be least 1 characters'),
  description: z
    .string()
    .min(1, 'Description must be least 1 characters')
    .max(255, 'Description must be max 255 characters'),
});

const TeacherProfileDashPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  // const [isRHV, setIsRHV] = useState();
  const [userInfo, setUserInfo] = useState<any>();

  const [fileName, setFileName] = useState<string>('');
  const [typeImage, setTypeImage] = useState<string>('');
  const [previewImage, setpreviewImage] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [
    getAuthorInfo,
    { isLoading: loadingGetAuth, isSuccess: successGetAuth },
  ] = useGetUserInfoMutation();

  const [updateUserInfo, { isLoading: loadingUpdateUserInfo }] =
    useUpdateUserInfoMutation();

  const [uploadImageS3, { isLoading: loadingUpImg }] =
    useUploadS3ImageMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, errors } = form.formState;

  const fetchAuthorInfo = async () => {
    const data = await getAuthorInfo({
      userID: user.userID,
    }).unwrap();
    setUserInfo(data.userInfo);
    setImageUrl(data.userInfo?.avatar);
    setName(data.userInfo?.name);
    setDescription(data.userInfo?.description);
    form.setValue('name', data.userInfo?.name);
    form.setValue('description', data.userInfo?.description);
  };
  useEffect(() => {
    fetchAuthorInfo();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setName(values.name);
    setDescription(values.description);
    try {
      await updateUserInfo({
        userID: user.userID,
        name: values.name,
        description: values.description,
      }).unwrap();
      toast.success('Profile updated');
      fetchAuthorInfo();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const updateAvatar = async () => {
    try {
      const responeUploadImageS3: any = await uploadImageS3({
        imageUrl: previewImage,
        fileName: fileName,
        typeImage: typeImage,
      }).unwrap();
      console.log(responeUploadImageS3.data);
      setpreviewImage('');
      await updateUserInfo({
        userID: user.userID,
        avatar: responeUploadImageS3,
      }).unwrap();
      toast.success('Profile updated');
      fetchAuthorInfo();
    } catch {
      toast.error('Something went wrong');
    }
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

  return (
    <>
      {(loadingGetAuth || loadingUpdateUserInfo || loadingUpImg) && <Loader />}

      {successGetAuth && (
        <div className="flex flex-col gap-y-3">
          <div className="self-end">
            <Link to={'/'} className="flex items-center">
              <span className="mr-3">Home</span>
              <img
                className="h-10 w-10 rounded-full"
                src={userInfo?.avatar}
                alt="khong cos avaldad"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-y-4">
            <div>
              <h2 className="text-3xl font-bold">Profile</h2>
            </div>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 flex flex-col"
          >
            <div className="flex gap-x-20">
              <div className="flex flex-col gap-y-4">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                {errors?.name?.message && (
                  <p className="text-sm text-red-600">{errors?.name.message}</p>
                )}
                <input
                  type="text"
                  // defaultValue={name}
                  disabled={isSubmitting}
                  className="w-full outline-none min-w-[400px] outline-gray-950/60 focus:outline-blue-300 rounded-md p-2 text-black"
                  {...form.register('name')}
                />

                <label
                  htmlFor="email"
                  className="block text-lg font-medium leading-6 text-gray-900m mt-6"
                >
                  Email
                </label>
                <input
                  type="text"
                  value={userInfo?.email}
                  disabled={true}
                  className="w-full outline-none bg-gray-300 min-w-[400px]  focus:outline-blue-300 rounded-md p-2 text-black"
                  {...form.register('email')}
                />

                <label
                  htmlFor="description"
                  className="block text-lg font-medium leading-6 text-gray-900m mt-6"
                >
                  Description
                </label>
                {errors?.description?.message && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
                <textarea
                  defaultValue={description}
                  // content={userInfo?.description}
                  // value={}
                  className="w-full outline-none min-w-[400px] outline-gray-950/60 focus:outline-blue-300 rounded-md p-2 text-black"
                  {...form.register('description')}
                />
              </div>
              <div className="flex items-center">
                {imageUrl && (
                  <div className="flex flex-col items-center">
                    <h1 className="text-xl font-bold">Avatar</h1>
                    <div className="flex items-center mt-2 w-64 h-64 ">
                      <img
                        src={imageUrl}
                        className="w-full rounded-full block aspect-square"
                      ></img>
                    </div>
                  </div>
                )}
                {previewImage && (
                  <>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="mx-6 text-xl text-sky-500"
                    />
                    <div className="flex flex-col items-center">
                      <h1 className="text-xl font-bold">Preview</h1>
                      <div className="flex items-center mt-2">
                        <img
                          src={previewImage}
                          className="w-64 h-64 rounded-full"
                          height={200}
                        ></img>
                      </div>
                      <button
                        className="px-3 py-2 rounded-lg text-white font-bold  cursor-pointer hover:bg-black bg-blue-500 "
                        onClick={updateAvatar}
                      >
                        Change
                      </button>
                    </div>
                  </>
                )}
                {!previewImage && (
                  <div className="mt-2 ml-10 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-inherit rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span className="text-lg">Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                            className="sr-only"
                            onChange={onFileChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <button
                disabled={isSubmitting}
                type="submit"
                className={[
                  isSubmitting
                    ? 'bg-gray-500/70 '
                    : 'cursor-pointer hover:bg-black bg-blue-500 ',
                  'px-3 py-2 rounded-lg text-white font-bold',
                ].join('')}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      <hr className="my-4" />

      {successGetAuth && (
        <div>
          <h1 className="text-3xl font-bold">Package</h1>
          <div className="mt-6">
            <ListPackage
              userInfo={userInfo}
              fetchAuthorInfo={fetchAuthorInfo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherProfileDashPage;
