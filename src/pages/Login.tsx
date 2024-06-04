import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginApi } from '../services/authorize';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../redux/userReducer';
import { useLoginMutation } from '../redux/userApi';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const LoginPage: FC = () => {
  const { register, handleSubmit } = useForm();
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
    console.log(loginCognito);
    dispatch(setAccessToken(loginCognito));
    await login().unwrap();
    setLoading(false);
    navigate(-1);
  };
  return (
    <div className="w-full">
      {isLoading && <Loader />}
      <div className="w-[32rem] bg-gray-50 rounded-lg m-auto mt-[8%] shadow-sm shadow-gray-500">
        <div className="p-12">
          <h1 className="text-4xl text-center mb-8">LOGIN TO LMS</h1>
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
            <div className="sm:col-span-3 mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="email"
                  v-model="email"
                  required
                  placeholder="Email"
                  {...register('email')}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  onClick={() => navigate('/user/forgot-password')}
                  className="text-sm text-sky-500 underline hover:text-sky-600"
                >
                  Forgot password?
                </button>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  required
                  placeholder="Password"
                  {...register('password')}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              type="submit"
              className="max-w-full text-lg mt-3 rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
