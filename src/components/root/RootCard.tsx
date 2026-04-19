import { cn } from "@/utils/className";
import Link from "next/link";
import React from "react";
import { ArrowForwardIcon } from "../commons/icons";

interface Props {
  title: string;
  description: string;
  actionText: string;
  href: string;
  renderIcon: React.ReactNode;
  className: string;
  hrefClassName: string;
}

const RootCard = ({
  title,
  description,
  actionText,
  href,
  renderIcon,
  className,
  hrefClassName,
}: Props) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm px-8 py-25 flex flex-col items-start border border-gray-100 text-primary",
        className,
      )}
    >
      <div className=" text-4xl mb-4">{renderIcon}</div>
      <h2 className="text-xl font-semibold  mb-3">{title}</h2>
      <p className=" mb-6">{description}</p>
      <Link
        href={href}
        className={cn(
          "bg-primary text-white px-6 py-3 rounded-md hover:opacity-90 cursor-pointer transition flex items-center space-x-2",
          hrefClassName,
        )}
      >
        <span>{actionText}</span>
        <ArrowForwardIcon className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default RootCard;
