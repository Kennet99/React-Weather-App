import React from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
};

export default function Card({ children, title }: Props) {
  return (
    <div className="p-4 border shadow-sm rounded-2xl bg-linear-to-br from-card to-card/60 text-white flex flex-col">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}
