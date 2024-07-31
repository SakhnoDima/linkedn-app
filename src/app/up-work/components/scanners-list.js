"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useToastContext } from "@/app/context/toast-context";
import { useSession } from "next-auth/react";
import { ScannerItem } from "./scanner-item";
import Loader from "@/app/components/loader";

export const ScannersList = ({ scanners, setScanners }) => {
  const showToast = useToastContext();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScanners = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/scanners", {
          params: {
            userId: session?.user.id,
          },
        });
        if (session?.user.id) {
          console.log(data);
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
      {loading && <Loader className="text-center" />}
      {scanners.length > 0 ? (
        <ul>
          {scanners.map((elem) => (
            <ScannerItem key={elem._id} elem={elem} />
          ))}
        </ul>
      ) : (
        <p>You don`t have scanners yet</p>
      )}
    </div>
  );
};
