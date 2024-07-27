import { Inter } from "next/font/google";
import "./globals.css";

import NavBar from "./components/navigation";
import { ModalContextProvider } from "./context/modal-context";
import UserContextProvider from "@/app/context/user-context";
import Modal from "./components/modal";
import { ToastContextProvider } from "./context/toast-context";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linkedin Bot",
  description: "Linkedin bot",
};

export default async function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <ModalContextProvider>
            <ToastContextProvider>
              <Header />
              <main className="flex">
                <nav className="w-[200px]">
                  <NavBar />
                </nav>
                <div className="flex-1 p-[50px]">{children}</div>
              </main>
              <Modal />
            </ToastContextProvider>
          </ModalContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
