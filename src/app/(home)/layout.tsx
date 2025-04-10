import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
      <Footer />
    </>
  );
}
