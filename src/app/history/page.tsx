"use client";
import Layout from "@/components/commons/layout";
import { getReservationHistory } from "@/services/reservation/getReservationHistory";
import { ReservationHistoryDTO } from "@/model/reservation.dto";
import { getUserInfo } from "@/utils/info";
import { Role } from "@/model/role.dto";
import { getAxiosError } from "@/utils/error";
import { message } from "antd";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [userRole, setUser] = useState<Role>("user");
  const [history, setHistory] = useState<ReservationHistoryDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getUserInfo()?.role);

    (async () => {
      setLoading(true);
      try {
        const data = await getReservationHistory();
        setHistory(data);
      } catch (error) {
        message.error(getAxiosError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout role={userRole}>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-black text-md">
            <tr>
              <th className="px-6 py-4 text-left">Date Time</th>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Concert Name</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : history.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  No history found
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr
                  key={`${item.reservationId}${index}`}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(item.datetime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{item.username}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {item.concertName}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.action === "reserve"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.action}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
