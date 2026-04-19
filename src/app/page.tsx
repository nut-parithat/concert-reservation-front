'use client";';
import { ManageAccountsIcon, UserIcon } from "@/components/commons/icons";
import RootCard from "@/components/root/RootCard";
import React from "react";

const RootPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex items-center justify-start p-6">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-primary rounded-full"></div>
          <span className="text-lg font-semibold text-primary">BRAND</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-neutral flex flex-col items-center justify-center flex-1 w-full p-4">
        <h1 className="text-3xl font-bold text-black mb-2">
          Select Access Level
        </h1>
        <p className="text-black mb-10 text-center">
          Lorem ipsum dolor sit amet consectetur. Elit purus nam.
        </p>

        {/* Access Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* User Card */}
          <RootCard
            title="User"
            description="Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non."
            actionText="Enter Workspace"
            href="/login?role=user"
            renderIcon={<UserIcon className="w-20 h-20 text-primary" />}
            className="text-primary bg-white"
            hrefClassName="text-white bg-primary hover:bg-primary/90"
          />

          {/* Administrator Card */}
          <RootCard
            title="Administrator"
            description="Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non."
            actionText="Enter Portal"
            href="/login?role=admin"
            renderIcon={<ManageAccountsIcon className="w-20 h-20 text-white" />}
            className="text-white bg-primary"
            hrefClassName="text-primary bg-white hover:bg-white/90"
          />
        </div>
      </main>
    </div>
  );
};

export default RootPage;
