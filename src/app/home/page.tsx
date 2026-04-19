"use client";
import {
  AwardIcon,
  UserFormIcon,
  XCircleIcon,
} from "@/components/commons/icons";
import Layout from "@/components/commons/layout";
import SummaryCard from "@/components/home/SummaryCard";
import { message, Tabs, TabsProps } from "antd";
import FormCreateConcert from "@/components/home/FormCreateConcert";
import { getUserInfo } from "@/utils/info";
import { useEffect, useState } from "react";
import ConcertContent from "@/components/home/concert/ConcertContent";
import { Role } from "@/model/role.dto";
import PermissionGuard from "@/components/commons/guard/PermissionGuard";
import { PERMISSION_ROLE } from "@/constants/role";
import { getSummary } from "@/services/concert/summary";
import { getAxiosError } from "@/utils/error";
import { ConcertSummaryDTO } from "@/model/concert.dto";

export default function HomePage() {
  const iconClassName = "text-white h-10 w-10";
  const [activeTab, setActiveTab] = useState("1");
  const [userRole, setUserRole] = useState<Role>("user");
  const [summary, setSummary] = useState<ConcertSummaryDTO>();

  const onChangeTab = (key: string) => {
    setActiveTab(key);
  };

  const fetchSummary = async () => {
    if (!userRole || userRole === "user") {
      return;
    }
    try {
      const data = await getSummary();
      setSummary(data);
    } catch (error) {
      message.error(getAxiosError(error));
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserRole(getUserInfo().role);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSummary();
  }, [userRole]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: (
        <ConcertContent
          active={activeTab === "1"}
          role={userRole as "admin" | "user"}
        />
      ),
    },
    {
      key: "2",
      label: "Create",
      children: <FormCreateConcert key={activeTab} />,
    },
  ];

  return (
    <Layout role={userRole}>
      <PermissionGuard
        userRole={userRole}
        permissionRole={[PERMISSION_ROLE.ADMIN]}
      >
        <div className="grid grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total of seats"
            value={summary?.totalSeats || 0}
            color="bg-primary"
            renderIcon={<UserFormIcon className={iconClassName} />}
          />
          <SummaryCard
            title="Reserve"
            value={summary?.totalReserved || 0}
            color="bg-success"
            renderIcon={<AwardIcon className={iconClassName} />}
          />
          <SummaryCard
            title="Cancel"
            value={summary?.totalCancelled || 0}
            color="bg-error"
            renderIcon={<XCircleIcon className={iconClassName} />}
          />
        </div>
      </PermissionGuard>
      <PermissionGuard
        userRole={userRole}
        permissionRole={[PERMISSION_ROLE.ADMIN]}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
      </PermissionGuard>
      <PermissionGuard
        userRole={userRole}
        permissionRole={[PERMISSION_ROLE.USER]}
      >
        <ConcertContent
          active={activeTab === "1"}
          role={userRole as "admin" | "user"}
        />
      </PermissionGuard>
    </Layout>
  );
}
