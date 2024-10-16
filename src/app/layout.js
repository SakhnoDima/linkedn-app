import { Inter } from "next/font/google";

import "./globals.css";
import Script from "next/script";

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
                <NavBar />
                <div className="flex-1 w-full p-[50px]">{children}</div>
              </main>
              <Modal />
            </ToastContextProvider>
          </ModalContextProvider>
        </UserContextProvider>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1532215527400129');
          fbq('trackCustom', 'Init');
        `}
        </Script>
      </body>
    </html>
  );
}
