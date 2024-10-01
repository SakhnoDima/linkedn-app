"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import TargetActionButton from "./target-action-button";
import InvitationLetterBlock from "./invitation-letter-block";
import { ScannersLinkedinTable } from "../linkedin/components/scanners-linkedin-table";

const UsersLinkedinFilters = () => {
  const { data: session } = useSession();

  const [filters, setFilters] = useState([]);
  const [currentTarget, setCurrentTarget] = useState([]);

  return (
    <div className="overflow-x-auto">
      <div className=" p-[16px] flex justify-between">
        <div className="flex gap-[16px]">
          <TargetActionButton setFilters={setFilters} actions="add" />
          {currentTarget?.length === 1 && (
            <TargetActionButton
              setFilters={setFilters}
              actions="edit"
              currentTarget={currentTarget}
              setCurrentTarget={setCurrentTarget}
            />
          )}
          {currentTarget.length > 0 && (
            <TargetActionButton
              setFilters={setFilters}
              actions="delete"
              currentTarget={currentTarget}
              setCurrentTarget={setCurrentTarget}
            />
          )}
        </div>
        <div className="flex gap-[16px]">
          <InvitationLetterBlock />
        </div>
      </div>
      <ScannersLinkedinTable
        setCurrentTarget={setCurrentTarget}
        filters={filters}
        setFilters={setFilters}
        userId={session?.user.id}
      />
    </div>
  );
};

export default UsersLinkedinFilters;
