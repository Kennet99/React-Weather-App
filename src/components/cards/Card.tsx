import React from "react";
import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

export default function Card({
  children,
  title,
  className,
  childrenClassName,
}: Props) {
  return (
    <div
      className={clsx(
        "p-4 border shadow-sm rounded-2xl bg-linear-to-br from-card to-card/60 text-white flex flex-col",
        className,
      )}
    >
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div
        className={clsx(
          childrenClassName,
          //"flex-1",
          `animate-[fade-in_0.5s_ease-out_forwards]`,
        )}
      >
        {children}
      </div>
    </div>
  );
}
