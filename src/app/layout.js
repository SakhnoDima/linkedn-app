import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Linkedin Bot",
  description: "Linkedin bot",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <div className="px-[50px]">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
