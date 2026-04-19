export type ReservationAction = "reserve" | "cancel";

export interface ReservationHistoryDTO {
  reservationId: string;
  action: ReservationAction;
  username: string;
  concertName: string;
  datetime: string;
}
