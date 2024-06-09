import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginApi } from '../services/authorize';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../redux/userReducer';
import { useLoginMutation } from '../redux/userApi';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const FormSchema = z.object({
  email: z.string().email('Must be email').min(1, 'Required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormInput = z.infer<typeof FormSchema>;

const LoginPage: FC = () => {
  const [showIn, setShow] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(false);

  const [login] = useLoginMutation();

  const submitForm = async (data: any) => {
    setLoading(true);
    const loginCognito = await loginApi({
      email: data.email,
      password: data.password,
    });
    if (loginCognito) {
      dispatch(setAccessToken(loginCognito));
      await login().unwrap();
      setLoading(false);
      navigate(-1);
    } else {
      setLoading(false);
      setShow(true);
    }
  };
  return (
    <div className="w-full">
      {isLoading && <Loader />}
      <div className="w-[32rem] bg-gray-50 rounded-lg m-auto mt-[8%] shadow-sm shadow-gray-500">
        <div className="p-12">
          <h1 className="text-4xl text-center mb-8">LOGIN TO LMS</h1>
          {showIn && (
            <div className="flex gap-x-2 items-center">
              <FontAwesomeIcon icon={faX} className="text-red-400" />
              <p className="text-red-400 italic">Incorrect email or password</p>
            </div>
          )}
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
            <div className="sm:col-span-3 mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                {errors?.email?.message && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
                <input
                  type="text"
                  id="email"
                  v-model="email"
                  required
                  placeholder="Email"
                  {...register('email')}
                  className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 mb-3">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/user/forgot-password')}
                  className="text-sm text-sky-500 underline hover:text-sky-600"
                >
                  Forgot password?
                </button>
              </div>
              <div className="mt-2">
                {errors?.password?.message && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Password"
                  {...register('password')}
                  className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              type="submit"
              className="max-w-20 mt-3 block bg-blue-500 hover:bg-blue-950/90 font-medium text-white rounded-md px-3 py-2 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
