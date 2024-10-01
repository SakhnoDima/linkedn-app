"use client";

import { useRouter } from "next/navigation";

const GoBack = ({ children, className, ...props }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <button
      {...props}
      onClick={handleBack}
      className={`flex items-center justify-center gap-2 p-2 w-[150px] mb-4 border border-gray-400 rounded-xl hover:text-blue-600 hover:border-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default GoBack;
