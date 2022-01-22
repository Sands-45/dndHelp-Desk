import React, { useState } from "react";
import {
  FaChartBar,
  FaReceipt,
  FaHeadset,
  FaUserTie,
} from "react-icons/fa";
import { BsBell, BsGearFill, BsSearch, BsTextRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import User from "./User";
import { NavLink, Outlet } from "react-router-dom";
import Main from "./Main";
import Alert from "../Others/Alert";

const MainComponent = () => {
  const [menu, setMenu] = useState(false);
  const logged = useSelector((state) => state.UserInfo.authenticated);
  const location = useLocation();

  if (logged !== true) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-slate-300 w-screen h-screen min-h-[60rem] overflow-hidden relative">
      {/**Alert */}
      <Alert/>
      {/**Small Screens Menu ====================== */}
      <div
        className={`flex lg:hidden absolute top-12 right-[17%] w-[8rem] border border-slate-400 z-[100] shadow-2xl rounded-lg bg-slate-800 ${
          menu ? "h-[10rem]" : "h-0 opacity-0"
        } transition-scale duration-300 flex flex-col text-slate-400 space-y-2 p-4 justify-center overflow-hidden`}
      >
        <NavLink
          to="/help-desk"
          className={`TabsLinks ${
            location.pathname === "/help-desk" ? "navlinks" : ""
          } ${(document.title = `Dial n Dine Help-Desk${location.pathname}`)}`}
        >
          <FaHeadset
            className="inline-block
			  "
          />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/help-desk/reports"
          className={`TabsLinks ${
            location.pathname === "/help-desk/reports" ? "navlinks" : ""
          }`}
        >
          <FaChartBar
            className="inline-block
			  "
          />
          <span>Reports</span>
        </NavLink>
        <NavLink
          to="/help-desk/tickets"
          end={true}
          className={`TabsLinks ${
            location.pathname === "/help-desk/tickets" ? "navlinks" : ""
          }`}
        >
          <FaReceipt
            className="inline-block
			  "
          />
          <span>Tickets</span>
        </NavLink>
        <NavLink
          to="/help-desk/contacts"
          end={true}
          className={`TabsLinks ${
            location.pathname === "/help-desk/tickets" ? "navlinks" : ""
          }`}
        >
          <FaUserTie
            className="inline-block
			  "
          />
          <span>Contacts</span>
        </NavLink>
        <NavLink
          to="/help-desk/settings"
          end={true}
          className={`TabsLinks ${
            location.pathname === "/help-desk/tickets" ? "navlinks" : ""
          }`}
        >
          <BsGearFill
            className="inline-block
			  "
          />
          <span>Settings</span>
        </NavLink>
      </div>

      {/**NavBar ============== */}
      <nav className="sticky  pl-[9.5%] pr-[10.5%]  top-0 h-[4rem] w-full bg-slate-900 backdrop-blur-lg p-2 flex justify-between items-center">
        {/**Logo ==================== */}
        <svg
          className="stroke-slate-400 text-[1.5rem] font-sans fill-transparent"
          width="210"
          height="50"
          viewBox="0 0 200 50"
        >
          <text x="0" y="35">
            <tspan className="stroke-[1.5px]">dnd</tspan>
            <tspan className="stroke-[.6px]" x="43" y="35">
              Help-Desk
            </tspan>
          </text>
        </svg>

        {/**Large Screens Menu Items===================== */}
        <div className="text-gray-400 hidden lg:flex space-x-5">
          <NavLink
            to="/help-desk"
            className={`TabsLinks ${
              location.pathname === "/help-desk" ? "navlinks" : ""
            } ${(document.title = `Dial n Dine Help-Desk${location.pathname}`)}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/help-desk/reports"
            className={`TabsLinks ${
              location.pathname === "/help-desk/reports" ? "navlinks" : ""
            }`}
          >
            Reports
          </NavLink>
          <NavLink
            to="/help-desk/tickets"
            end={true}
            className={`TabsLinks ${
              location.pathname === "/help-desk/tickets" ? "navlinks" : ""
            }`}
          >
            Tickets
          </NavLink>
          <NavLink
            to="/help-desk/contacts"
            end={true}
            className={`TabsLinks ${
              location.pathname === "/help-desk/tickets" ? "navlinks" : ""
            }`}
          >
            Contacts
          </NavLink>
          <NavLink
            to="/help-desk/settings"
            end={true}
            className={`TabsLinks ${
              location.pathname === "/help-desk/tickets" ? "navlinks" : ""
            }`}
          >
            Settings
          </NavLink>
        </div>

        {/*Notifications Control ====================*/}
        <div className="flex space-x-4">
          {/**Small Screen Menu Btn ================ */}
          <BsTextRight
            onClick={() => setMenu(menu === false ? true : false)}
            className="text-2xl text-slate-400 lg:hidden flex cursor-pointer"
          />

          <button className="text-slate-400 text-xl relative">
            <abbr title="notifiations">
              <BsBell />
              <span
                className={`flex h-3 w-3 absolute top-[-5%] right-[-5%] scale-100 z-[999]`}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
            </abbr>
          </button>

          <button className="text-slate-400 text-xl relative">
            <abbr title="Serach">
              <BsSearch />
            </abbr>
          </button>
        </div>
      </nav>
      <User />
      <Main />
      <Outlet />
    </div>
  );
};

export default MainComponent;
