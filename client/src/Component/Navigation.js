import React from "react";
import { navigation } from "../Ultils/contants";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="w-main h-[48px] border-y mb-8 py-2 flex items-center">
      {navigation.map((e) => (
        <NavLink
          to={e.path}
          key={e.id}
          className={({ isActive }) =>
            isActive ? "pr-4 hover:text-main " : "pr-4 hover:text-main "
          }
        >
          {e.value}
        </NavLink>
      ))}
    </div>
  );
}

export default Navigation;
