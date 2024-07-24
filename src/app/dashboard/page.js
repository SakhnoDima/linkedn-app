"use client";
import React from "react";
import Button from "../components/button";
import axios from "axios";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();

  const handleClick = async () => {
    try {
      if (!session.user.id) {
        throw new Error("Not active session");
      }
      const linkedinFilters = await axios.get("/api/linkedin-tasks", {
        params: {
          userId: session?.user.id,
        },
      });
      console.log(linkedinFilters);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>DashboardPage</h2>
      <Button onClick={handleClick}>
        <p>Get</p>
      </Button>
    </div>
  );
};

export default DashboardPage;
