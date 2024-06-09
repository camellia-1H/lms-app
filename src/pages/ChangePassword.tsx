import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { changePassword, resetPassword } from '../services/authorize';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/userReducer';

const FormSchema = z.object({
  oldPassword: z.string().min(8, 'Password must be at least 8 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormInput = z.infer<typeof FormSchema>;

const ChangePasswordPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
  });

  // const [registerAccount] = useRegisterMutation();
  const submitForm = async (data: FormInput) => {
    try {
      await changePassword(user.email, data.oldPassword, data.password);
      dispatch(logOut());
      navigate('/user/login');
      // setShow(true);
    } catch (error) {
      console.error(error);
    }
  };

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const passwordsMatch = password === confirmPassword;

  return (
    <div className="w-full">
      <div className="w-[32rem] bg-gray-50 rounded-lg m-auto mt-[8%] shadow-sm shadow-gray-500">
        <div className="p-12">
          <h1 className="text-4xl font-bold text-center mb-6">
            Change Password
          </h1>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="my-4 flex flex-col gap-y-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Old Password
                  </label>
                  <div className="mt-2">
                    {errors?.oldPassword?.message && (
                      <p className="text-sm text-red-600">
                        {errors.oldPassword.message}
                      </p>
                    )}
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="password"
                        id="oldPassword"
                        placeholder="Old Password"
                        {...register('oldPassword')}
                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2">
                    {!passwordsMatch && (
                      <p className="text-sm text-red-600">
                        Passwords do not match
                      </p>
                    )}
                    {errors?.password?.message && (
                      <p className="text-sm text-red-600">
                        {errors?.password.message}
                      </p>
                    )}
                    <input
                      id="password"
                      type="password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('password')}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    {!passwordsMatch && (
                      <p className="text-sm text-red-600">
                        Passwords do not match
                      </p>
                    )}
                    {errors?.confirmPassword?.message && (
                      <p className="text-sm text-red-600">
                        {errors?.confirmPassword.message}
                      </p>
                    )}
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('confirmPassword')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="block mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-950/90 font-medium text-white rounded-md transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
