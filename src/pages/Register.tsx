import {
  faChevronDown,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Combobox, Transition } from '@headlessui/react';
import React from 'react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../redux/userApi';
const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
];
const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm();

  const [registerAccount] = useRegisterMutation();
  const submitForm = async (data: any) => {
    console.log(data);
    await registerAccount({
      name: data.name,
      email: data.email,
      password: data.password,
    }).unwrap();
    navigate('/user/verify-email');
  };

  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState('');
  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="w-full">
      <div className="w-[32rem] bg-gray-50 rounded-lg m-auto mt-[8%] shadow-sm shadow-gray-500">
        <div className="p-12">
          <h1 className="text-4xl font-bold text-center mb-8">
            Become my student
          </h1>
          <h2 className="text-lg font-base text-center mb-8">
            Create an account as a Student
          </h2>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="my-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 mt-4">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        id="email"
                        v-model="email"
                        placeholder="Email"
                        {...register('email')}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="Name"
                      v-model="name"
                      required
                      placeholder="Name"
                      {...register('name')}
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="address"
                      v-model="address"
                      placeholder="Ha Noi"
                      {...register('address')}
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <Combobox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <div className="relative mt-1">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                          <Combobox.Input
                            className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            displayValue={(person: any) => person.name}
                            onChange={(event) => setQuery(event.target.value)}
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            {open ? (
                              <FontAwesomeIcon
                                icon={faChevronDown}
                                className="px-2"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faChevronLeft}
                                className="px-2"
                              />
                            )}
                          </Combobox.Button>
                        </div>
                        <Transition
                          as={React.Fragment}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                          afterLeave={() => setQuery('')}
                        >
                          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                Nothing found.
                              </div>
                            ) : (
                              filteredPeople.map((person) => (
                                <Combobox.Option
                                  key={person.id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? 'bg-gray-600 text-white'
                                        : 'text-gray-900'
                                    }`
                                  }
                                  value={person}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal'
                                        }`}
                                      >
                                        {person.name}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active
                                              ? 'text-white'
                                              : 'text-teal-600'
                                          }`}
                                        >
                                          <FontAwesomeIcon
                                            icon={faChevronLeft}
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Combobox.Option>
                              ))
                            )}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    )}
                  </Combobox>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="phoneNumber"
                      type="text"
                      v-model="phoneNumber"
                      {...register('phoneNumber')}
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  {/* <h1 :className="errorForm.length > 0 ? 'text-red-500' : ''">
                {{ errorForm }}
              </h1> */}
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      type="text"
                      v-model="password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('password')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="text-white font-bold px-6 py-2 bg-blue-700 rounded-lg hover:bg-black"
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

export default RegisterPage;
