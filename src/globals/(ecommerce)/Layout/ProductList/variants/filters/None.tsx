import { type ReactNode } from "react";

export const None = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <main className="container pb-6 pt-24">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">{title}</h1>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {children}
      </div>
    </main>
  );
};
