import { Toaster } from "sonner";
import "./globals.css"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Toaster position="top-right" richColors expand={true} />
      </body>
    </html>
  );
}
