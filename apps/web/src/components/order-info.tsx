import { useState } from 'react';

export default function Form({}) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <form className="w-full flex items-center bg-white dark:bg-gray-800 rounded-md max-w-xl mx-auto px-7 mt-7 sm:mt-12 h-10 sm:h-12 space-x-1">
      <input
        type="text"
        className="flex-1 border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0"
        placeholder="Your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        className="flex-1 border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0"
        placeholder="Your phone number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
    </form>
  );
}
