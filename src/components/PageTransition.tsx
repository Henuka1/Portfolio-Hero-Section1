import React from 'react';

interface Props {
  children: React.ReactNode;
  isActive: boolean;
}

export function PageTransition({ children, isActive }: Props) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
        isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {children}
    </div>
  );
}
