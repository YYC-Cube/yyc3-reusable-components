import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
  isActive?: boolean;
  tooltip?: string;
}

export function Button({ variant, size, isActive, tooltip, ...props }: ButtonProps) {
  return <button {...props} />;
}
