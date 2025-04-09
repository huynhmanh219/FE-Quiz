import { BookCheck, BarChart3 } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white p-4 space-y-4 hidden md:block">
      <div className="text-lg font-semibold mb-6">Bảng điều khiển</div>
      <ul className="space-y-2">
        <li>
          <Link href="/quiz" className="flex items-center gap-2 hover:text-blue-400">
            <BookCheck size={18} /> Danh sách đề thi
          </Link>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2 hover:text-blue-400">
            <BarChart3 size={18} /> Kết quả
          </a>
        </li>
      </ul>
    </aside>
  );
};
