import React, { useEffect, useState } from "react";
import ConcertList from "./ConcertList";
import { ConcertDTO } from "@/model/concert.dto";
import { getAllConcerts } from "@/services/concert/getAll";
import { deleteConcert } from "@/services/concert/delete";
import { reserveConcert } from "@/services/concert/reserve";
import { cancelConcert } from "@/services/concert/cancel";
import { message, Modal } from "antd";
import { getAxiosError } from "@/utils/error";

type Props = {
  active?: boolean;
  role: "admin" | "user";
};

const ConcertContent = ({ active, role }: Props) => {
  const [concerts, setConcerts] = useState<ConcertDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchConcerts = async () => {
    setLoading(true);
    try {
      const data = await getAllConcerts();
      setConcerts(data);
    } catch (error) {
      message.error(getAxiosError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!active) return;
    (async () => {
      setLoading(true);
      try {
        const data = await getAllConcerts();
        setConcerts(data);
      } catch (error) {
        message.error(getAxiosError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, [active]);

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this concert?",
      onOk: async () => {
        try {
          await deleteConcert(id);
          message.success("Concert deleted successfully");
          await fetchConcerts();
        } catch (error) {
          message.error(getAxiosError(error));
        }
      },
    });
  };

  const handleReserve = async (id: string) => {
    try {
      await reserveConcert(id);
      message.success("Reserved successfully");
      await fetchConcerts();
    } catch (error) {
      message.error(getAxiosError(error));
    }
  };

  const handleCancel = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to cancel this concert?",
      onOk: async () => {
        try {
          await cancelConcert(id);
          message.success("Cancelled successfully");
          await fetchConcerts();
        } catch (error) {
          message.error(getAxiosError(error));
        }
      },
    });
  };

  return (
    <div>
      <ConcertList
        concerts={concerts}
        loading={loading}
        role={role}
        onDelete={handleDelete}
        onReserve={handleReserve}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ConcertContent;
