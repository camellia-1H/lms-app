import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useResendConfirmCodeMutation,
  useVerifyEmailMutation,
} from '../redux/userApi';

const VerifyEmail: FC = () => {
  const [email, setEmail] = useState<string>('');
  const { register, handleSubmit } = useForm();
  const [verify] = useVerifyEmailMutation();
  const [resendVerifyCode] = useResendConfirmCodeMutation();

  const submitForm = async (data: any) => {
    await verify({
      email: data.email,
      confirmation_code: data.confirmationCode,
    });
  };

  const handleResendVerifyCode = async () => {
    await resendVerifyCode({ email: email });
  };
  return (
    <div className="w-full">
      <div className="w-[32rem] bg-gray-50 rounded-lg m-auto mt-[8%] shadow-sm shadow-gray-500">
        <div className="p-12">
          <h1 className="text-3xl text-center mb-8">verify page</h1>
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 mb-3">
              <label
                htmlFor="confirmationCode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                confirmationCode
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="confirmationCode"
                  required
                  {...register('confirmationCode')}
                  className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              type="submit"
              className="max-w-20 mt-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Verify
            </button>
          </form>
          <button onClick={handleResendVerifyCode}>Resend Code</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
