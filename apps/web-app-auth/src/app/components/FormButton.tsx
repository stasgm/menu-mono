import React from 'react';

type Params = {
  text: string;
};

export default function FormButton({ text }: Params) {
  return (
    <button
      type="submit"
      className="w-full rounded bg-dorado px-4 py-2 font-bold text-negrito hover:bg-azulito"
    >
      {text}
    </button>
  );
}
