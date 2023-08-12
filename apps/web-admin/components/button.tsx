import { Button as FlowBiteButton, ButtonProps } from 'flowbite-react';

interface IButton extends ButtonProps {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', ...props }: IButton) => (
  <FlowBiteButton
    className={`border-none p-3 font-semibold ${
      variant === 'primary' ? 'bg-blue-700 disabled:bg-blue-400' : ''
    }`}
    {...props}
  />
);
