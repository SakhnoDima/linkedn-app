import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]/route";
import NavBar from "./components/navigation";
import { ModalContextProvider } from "./context/modal-context";
import UserContextProvider from "@/app/context/user-context";
import Modal from "./components/modal";
import { ToastContextProvider } from "./context/toast-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linkedin Bot",
  description: "Linkedin bot",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <ModalContextProvider>
            <ToastContextProvider>
              <div className="px-[50px]">
                <NavBar />
                {children}
              </div>
              <Modal />
            </ToastContextProvider>
          </ModalContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
