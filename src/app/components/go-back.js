import Link from "next/link";

const GoBack = ({ children, className, ...props }) => {
  return (
    <Link
      {...props}
      className={`flex items-center justify-center gap-2 p-2 w-[150px] mb-4 border border-gray-400 rounded-xl hover:text-blue-600 hover:border-blue-600 ${className}`}
    >
      {children}
    </Link>
  );
};

export default GoBack;
