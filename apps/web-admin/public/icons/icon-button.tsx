import { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (params: any) => void;
}
export const IconButton = ({ children, className = '', onClick = () => {} }: IconButtonProps) => (
  <button
    type="button"
    className="mr-2 inline-flex items-center rounded-lg p-2 text-center text-sm font-medium hover:bg-gray-500"
    onClick={onClick}
  >
    {children}
  </button>
);
