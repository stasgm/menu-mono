import React from 'react';

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="flex text-gris">
        <div className="flex h-screen w-1/6 flex-col items-center justify-center bg-blancucho">
          {children}
        </div>
      </div>
      <div className="w-5/6">a</div>
    </main>
  );
}
