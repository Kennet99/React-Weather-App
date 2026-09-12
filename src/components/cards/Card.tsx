import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
};

export default function Card({ children, title }: Props) {
  return (
    <div className="p-4 border rounded shadow-sm rounded-2xl bg-zinc-900 text-white flex flex-col">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}
