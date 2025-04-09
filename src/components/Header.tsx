import Link from "next/link";

// src/components/Header.tsx
export const Header = () => {
    return (
      <header className="bg-slate-900 shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-400">Quiz Master</div>
        <nav className="space-x-6 text-xl text-white">
          <a href="#" className="hover:text-blue-500">Trang chủ</a>
          <Link href="" className="hover:text-blue-500">Đề thi</Link>
          <a href="#" className="hover:text-blue-500">Hướng dẫn</a>
          <Link href="/login" className="hover:text-blue-500">Đăng nhập</Link>
        </nav>
      </header>
    );
  };
  