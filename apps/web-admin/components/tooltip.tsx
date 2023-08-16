// 'use client';
import { CustomFlowbiteTheme, Tooltip as SourceTooltip, TooltipProps } from 'flowbite-react';
import { ReactNode } from 'react';

interface Props extends TooltipProps {
  children: ReactNode;
}

export function Tooltip({ children, ...props }: Props) {
  return (
    <SourceTooltip theme={customTheme} {...props}>
      {children}
    </SourceTooltip>
  );
}

const customTheme: CustomFlowbiteTheme['tooltip'] = {
  target: 'w-fit',
  animation: 'transition-opacity',
  arrow: {
    base: 'absolute z-10 h-2 w-2 rotate-45',
    style: {
      dark: 'bg-gray-900 dark:bg-gray-700',
      light: 'bg-white',
      auto: 'bg-white dark:bg-gray-700',
    },
    placement: '-4px',
  },
  base: 'absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm',
  hidden: 'invisible opacity-0',
  style: {
    dark: 'bg-gray-900 text-white dark:bg-gray-700',
    light: 'border border-gray-200 bg-white text-gray-900',
    auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white',
  },
  content: 'relative z-20',
};
