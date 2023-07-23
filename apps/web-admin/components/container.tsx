import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className, ...rest }: Props) => {
  return (
    <div {...rest} className={`m-auto w-full max-w-screen-md px-5 ${className}`}>
      {children}
    </div>
  );
};
