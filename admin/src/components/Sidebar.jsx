import { NavLink } from "react-router-dom";
import { CirclePlus, Logs, ClipboardList } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[22%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to={"/add"}
          className={
            "flex items-center justify-center md:justify-start gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          }
        >
          <CirclePlus className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to={"/list"}
          className={
            "flex items-center justify-center md:justify-start gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          }
        >
          <Logs className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to={"/orders"}
          className={
            "flex items-center justify-center md:justify-start gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          }
        >
          <ClipboardList className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
