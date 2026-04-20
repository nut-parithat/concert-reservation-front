import React from "react";
import { ConcertDTO } from "@/model/concert.dto";
import ConcertCard from "@/components/home/concert/ConcertCard";

type Props = {
  concerts: ConcertDTO[];
  loading?: boolean;
  role: "admin" | "user";
  onDelete?: (id: string) => void;
  onReserve?: (id: string) => void;
  onCancel?: (id: string) => void;
};

const ConcertList = ({
  concerts,
  loading,
  role,
  onDelete,
  onReserve,
  onCancel,
}: Props) => {
  if (loading) {
    return <div className="text-center py-10 text-gray-400">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {concerts.map((concert) => (
        <ConcertCard
          key={concert.id}
          name={concert.name}
          description={concert.description}
          totalSeats={concert.totalSeat}
          role={role}
          disableReserve={concert.totalSeat === concert.reservedSeat}
          isReserved={concert.isReserved}
          onDelete={() => onDelete?.(concert.id)}
          onReserve={() => onReserve?.(concert.id)}
          onCancel={() => onCancel?.(concert.id)}
        />
      ))}
    </div>
  );
};

export default ConcertList;
