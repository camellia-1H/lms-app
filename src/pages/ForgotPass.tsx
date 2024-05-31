import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { forgotPassword } from '../services/authorize';

const FormSchema = z.object({
  email: z.string().min(1, 'Bắt buộc').email(),
});

type FormInput = z.infer<typeof FormSchema>;

const ForgotPass: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
  });

  const submitForm = async (data: any) => {
    await forgotPassword(data.email);
  };

  return (
    <div className="w-full">
      <div className="w-[32rem] bg-gray-50 rounded-lg m-auto mt-[8%] shadow-sm shadow-gray-500">
        <div className="p-12">
          <h1 className="text-3xl text-center mb-8">Reset your password</h1>
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
            <p>
              Enter your user account's verified email address and we will send
              you a password reset link.
            </p>
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
                  placeholder="Email"
                  {...register('email', { required: 'Requireddffda' })}
                  className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.email?.message && <p>{errors.email.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="max-w-20 mt-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
