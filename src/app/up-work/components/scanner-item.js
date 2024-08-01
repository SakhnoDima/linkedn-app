import StatusBadge from "@/app/components/status-badge";
import { useRouter } from "next/navigation";

export const ScannerItem = ({ scanner }) => {
  const router = useRouter();

  return (
    <li
      onClick={() => {
        router.push(`/up-work/${scanner._id}`);
      }}
      className="flex flex-row items-center justify-around gap-4 p-1 border-b hover:cursor-pointer"
    >
      <p className="flex-3/4">Name: {scanner?.scannerName}</p>

      <StatusBadge className="flex-1/4" active={scanner?.autoBidding}>
        {scanner?.autoBidding ? "Active" : "Pending"}
      </StatusBadge>
    </li>
  );
};
