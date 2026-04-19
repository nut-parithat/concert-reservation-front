export interface ConcertDTO {
  id: string;
  name: string;
  description: string;
  totalSeat: number;
  reservedSeat: number;
  cancelledSeat: number;
  createdAt: string;
  createdBy: string;
}

export interface CreateConcertRequestDTO {
  name: string;
  description: string;
  totalSeat: number;
}

export interface ReserveConcertResponseDTO {
  reservationId: string;
  concertId: string;
  userId: string;
  status: "RESERVED" | "CANCELLED";
  createdAt: string;
}

export interface ConcertSummaryDTO {
  totalSeats: number;
  totalReserved: number;
  totalCancelled: number;
  totalAvailable: number;
}
