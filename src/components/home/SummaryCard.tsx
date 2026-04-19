import React from "react";

interface Props {
  title: string;
  value: number;
  color: string;
  renderIcon: React.ReactNode;
}

const SummaryCard = ({ title, value, color, renderIcon }: Props) => {
  return (
    <div className={`${color} text-white rounded-2xl px-6 py-9 shadow`}>
      <div className="pb-1.5 text-center flex justify-center">{renderIcon}</div>
      <p className="text-md text-center opacity-80">{title}</p>
      <h3 className="text-3xl text-center font-bold mt-2">{value}</h3>
    </div>
  );
};

export default SummaryCard;
