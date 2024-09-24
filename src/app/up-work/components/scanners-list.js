"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useToastContext } from "@/app/context/toast-context";
import { useSession } from "next-auth/react";
import { ScannerItem } from "./scanner-item";

export const ScannersList = ({ scanners, setScanners }) => {
  const showToast = useToastContext();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScanners = async () => {
      try {
        const { data } = await axios.get("/api/scanners", {
          params: {
            userId: session?.user.id,
          },
        });
        if (session?.user.id) {
          setScanners([...data.reverse()]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        showToast(error.response.data.message, "error");
      }
    };

    fetchScanners();
  }, [session?.user.id]);

  return (
    <div>
      {loading ? (
        <p className="text-center p-1 border-b">Loading...</p>
      ) : (
        <ul>
          {scanners.map((elem) => (
            <ScannerItem key={elem._id} scanner={elem} />
          ))}
          {scanners.length === 0 && (
            <li className="text-center p-1 border-b">
              You don`t have scanners yet
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
