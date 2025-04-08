import { Footer } from "@/components/Footer";
import "./globals.css"; 
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";


export const metadata: Metadata = {
  title: "FE Quiz App",
  description: "Đồ án tốt nghiệp ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
     
      <body className="bg-gray-500 text-gray-900">
        <div className="min-h-screen flex flex-col">
         <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6 bg-white">{children}</main>
          </div>
            <Footer />
        </div>
      </body>
    
    </html>
  );
}