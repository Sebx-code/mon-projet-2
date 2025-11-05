import { Outlet } from "react-router-dom";
import SideBar from "./sideBar"

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-slate-900 text-gray-200 flex flex-col p-6 shadow-lg border-r border-gray-800">
        <SideBar />
      </div>

      <main className="flex-1 bg-gray-800 overflow-y-auto shadow-inner">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
