import React, { useState, useEffect } from "react";
import { apiGetCategories } from "../Api/app";
import { NavLink } from "react-router-dom";
import { createSlug } from "../Ultils/help";

function Sidebar() {
  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    if (response.success) setCategories(response.productCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  // console.log(categories);
  return (
    <div className=" relative mt-4 flex w-full flex-col justify-between rounded-lg bg-white p-1 border  ">
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isActive }) =>
            isActive
              ? " bg-main px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
              : "flex cursor-pointer items-center justify-between px-4 py-6 h-7 hover:text-main"
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
