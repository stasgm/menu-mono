import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <section className="mx-auto flex max-w-xl flex-col justify-between px-2 py-4 sm:px-6 sm:py-10">
      {children}
    </section>
  );
};

export default Container;
