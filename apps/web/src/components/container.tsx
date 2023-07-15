import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <section
      className={
        'flex flex-col justify-between max-w-xl mx-auto sm:px-6 px-2 py-4 sm:py-16'
      }
    >
      {children}
    </section>
  );
}
