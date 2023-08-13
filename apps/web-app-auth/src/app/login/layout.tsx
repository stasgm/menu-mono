import React from 'react';

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="text-gris flex">
        <div className="bg-blancucho flex h-screen w-1/6 flex-col items-center justify-center">
          {children}
        </div>
      </div>
      <div className="w-5/6">a</div>
    </main>
  );
}
