import React from 'react';

type Params = {
  text: string;
};

export default function FormButton({ text }: Params) {
  return (
    <button
      type="submit"
      className="bg-dorado hover:bg-azulito text-negrito w-full rounded px-4 py-2 font-bold"
    >
      {text}
    </button>
  );
}
