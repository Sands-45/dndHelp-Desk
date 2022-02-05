import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BsLightningChargeFill, BsFillPlusSquareFill } from "react-icons/bs";
import TicketStatus from "./TicketStatus";
import DataFetching from "./DataFetching"

const SupportHome = () => {
  const location = useLocation();

  //Component =======================================
  return (
    <div className="bg-slate-300 w-screen h-screen min-h-[60rem] overflow-hidden relative">
      <div className="w-full h-[5rem] bg-slate-900 px-6 flex items-center justify-between">
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

        {/**Login if You are a Member ====================== */}
        <div className="flex space-x-4 items-center">
			<h4 className="text-slate-400 text-base font-semibold tracking-wide">Are you a member ?</h4>
			<NavLink to="/">
			  <button
				className="bg-blue-700 px-6 p-2 rounded-md text-slate-300 font-bold text-sm tracking-wide uppercase outline-none
					 focus:outline-none hover:opacity-90 transition-all duration-300 focus:ring focus:ring-blue-600"
			  >
				Login
			  </button>
			</NavLink>
		</div>
      </div>

      {/** */}
      <nav className="w-full h-[2.5rem] bg-slate-600 px-7 flex items-center space-x-4">
        <NavLink
          to="/support"
          className={`text-sm font-[600] text-slate-400  font-sans h-full items-center flex ${
            location.pathname === "/support" ? "supportlinks" : ""
          }`}
        >
          <BsLightningChargeFill className="inline" />
          <span>Ticket Status</span>
        </NavLink>
        <NavLink
          to="/support/new-ticket"
          className={`text-sm font-[600] text-slate-400 font-sans h-full space-x-1 items-center flex ${
            location.pathname === "/support/new-ticket" ? "supportlinks" : ""
          }`}
        >
          <BsFillPlusSquareFill className="inline" />
          <span>New Tickect</span>
        </NavLink>
      </nav>
      <TicketStatus />
	  <DataFetching/>
      <Outlet />
    </div>
  );
};

export default SupportHome;
