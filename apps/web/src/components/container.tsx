import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return <section className={`flex flex-col justify-between max-w-xl mx-auto px-6 py-10 sm:py-16`}>{children}</section>;
}
