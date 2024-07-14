"use client";
import SaveCodeForm from "./save-user-cod";
import { useModalContext } from "../context/modal-context";

const ShowPopUp = () => {
  const { openModal } = useModalContext();
  return (
    <p className="mt-[10px]">
      Check your email. If you received a verification code, add it{" "}
      <span className="underline cursor-pointer hover:text-blue-500" onClick={() => openModal(<SaveCodeForm />)}>here </span>
    </p>
  );
};

export default ShowPopUp;
