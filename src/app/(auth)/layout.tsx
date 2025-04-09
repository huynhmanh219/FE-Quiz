import { Footer } from "@/components/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#1a1f3c] to-[#0f172a] flex items-center justify-center">
        <div className="w-full max-w-md bg-white/90 rounded-2xl p-8 shadow-2xl">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
