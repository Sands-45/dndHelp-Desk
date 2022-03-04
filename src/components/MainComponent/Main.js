import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Businnes from "./images/businnes.jpg";
import {
  BsArrowRightShort,
  BsDashSquare,
  BsCheckAll,
  BsArrowRepeat,
  BsEnvelopeOpen,
  BsFillHandThumbsUpFill,
  BsEnvelope,
  BsAlarm,
} from "react-icons/bs";
import ToDo from "./ToDo";
import Filters from "../Reports/Filters";
import Calendar from "./Calendar";
import { markAsSeen } from "./../Data_Fetching/TicketsnUserData";
import { setThreadId } from "./../../store/TicketsSlice";

const Main = () => {
  const location = useLocation();
  let filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const dispatch = useDispatch();
  const [isChatOpen, setChat] = useState(false);
  const threadId = useSelector((state) => state.Tickets.threadId);
  const overDue =
    filteredTickets &&
    filteredTickets.filter(
      (firstMsg) =>
        new Date(firstMsg.due_date).toISOString() <= new Date().toISOString()
    );

  //Overdue Tickets =====================
  const overDueTickets =
    overDue.length >= 1 &&
    overDue.map((ticket) => {
      /**Unread Meassages ================= */
      let ticketReadStatus =
        overDue.length >= 1 &&
        overDue.filter(
          (message) =>
            message.ticket_id === ticket.ticket_id &&
            message.readStatus !== "read" &&
            message.from !== "agent"
        );

      /**Mark As read if thread is Active ========== */
      threadId === ticket.ticket_id &&
        ticketReadStatus.length >= 1 &&
        ticketReadStatus.forEach((message) => {
          markAsSeen(message.id, "read");
        });
      /**End ========== */
      return (
        <Link to="/app/tickets" key={ticket.id}>
          <div
            onClick={() => {
              dispatch(setThreadId(ticket.ticket_id));
              window.localStorage.setItem("threadId", JSON.stringify(threadId));
              setChat(!isChatOpen && true);
              ticketReadStatus.length >= 1 &&
                ticketReadStatus.forEach((message) => {
                  markAsSeen(message.id, "read");
                });
            }}
            className="h-10 w-10 rounded-xl dark:bg-slate-800 bg-slate-200 flex cursor-pointer items-center justify-center relative uppercase text-lg dark:text-slate-300 text-slate-500 font-bold custom-shadow border border-red-500"
          >
            <abbr title={ticket.recipient_name}>
              {ticket.recipient_name.charAt(0)}
            </abbr>
          </div>
        </Link>
      );
    });

  //Component ========================
  return (
    <div
      className={`${
        location.pathname === "/app" ? "grid" : "hidden"
      } dark:bg-transparent bg-transparent w-[90%] md:w-full container 2xl:w-[72rem] mt-4 overflow-hidden`}
    >
      <div className="grid gap-4 place-content-center pb-4 h-fit">
        <div className="row-span-2 w-full h-fit dark:bg-slate-900 bg-white rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center overflow-hidden p-4 gap-5 lg:h-[16rem] items-center lg:gap-2">
          <div className="col-span-1 md:col-span-2 lg:col-span-1 rounded-xl max-h-[13rem] w-full 2xl:flex overflow-hidden">
            <Calendar />
          </div>
          {/** Overdue Tickets ==================================*/}
          <div className="col-span-1 lg:max-h-[13rem] flex flex-col h-full justify-between overflow-hidden px-2 py-1  lg:border-l dark:border-slate-800 border-slate-300">
            {overDue.length >= 1 && (
              <div className="flex flex-col gap-1 pb-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
                <h2 className="text-base font-bold dark:text-slate-400 text-slate-600 capitalize text-center">
                  Overdue Tickets
                </h2>
                <p className="text-thin text-slate-500 text-xs lg:text-sm text-center">
                  {overDue.length} tickets displayed below are overdue. To
                  resolve these issues please visit the tickets page check those
                  highlighted with red border. To keep yourself up-to date the
                  calender has highlighted all due dates, just hover on top to
                  see clients name.
                </p>
              </div>
            )}
            {overDue.length <= 0 && (
              <div className="flex flex-col justify-between pb-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
                <h2 className="text-base font-bold dark:text-slate-400 text-slate-600 capitalize text-center">
                  Overdue Tickets
                </h2>
                <p className="text-thin text-slate-500 text-sm text-center">
                  You all catched up{" "}
                  <BsFillHandThumbsUpFill className="inline text-yellow-500" />
                  .You can check/hover on top of the highlighted dates on the
                  calendar to see upcoming deadline. . Don’t dwell on what went
                  wrong. Instead, focus on what to do next. Spend your energies
                  on moving forward toward finding the answer.
                </p>
              </div>
            )}
            <div className="flex justify-center items-end space-x-1">
              {overDueTickets}
              {overDue.length <= 1 && (
                <>
                  <div className="h-10 w-10 border border-slate-600 rounded-xl dark:bg-slate-800 bg-slate-200 custom-shadow flex cursor-pointer items-center justify-center relative uppercase animate-pulse text-lg dark:text-slate-300 text-slate-500 font-bold"></div>
                  <div className="h-10 w-10 rounded-xl border border-slate-600 dark:bg-slate-800 bg-slate-200 custom-shadow flex cursor-pointer items-center justify-center relative uppercase animate-pulse text-lg dark:text-slate-300 text-slate-500 font-bold"></div>
                  <div className="h-10 w-10 rounded-xl border border-slate-600 dark:bg-slate-800 bg-slate-200 custom-shadow flex cursor-pointer items-center justify-center relative uppercase animate-pulse text-lg dark:text-slate-300 text-slate-500 font-bold"></div>
                </>
              )}
            </div>
          </div>
          {/**End Of Overdue Tickets ==================================*/}

          {/**Manage Contacts ==================================*/}
          <div className="col-span-1 lg:max-h-[13rem] flex flex-col h-full justify-between overflow-hidden px-2 py-1 lg:border-l dark:border-slate-800 border-slate-300">
            <div className="flex flex-col gap-2 pb-2 overflow-hidden">
              <h2 className="text-base text-center font-bold dark:text-slate-400 text-slate-600 capitalize">
                contacts
              </h2>
              <p className="text-thin text-slate-500 text-sm text-center">
                Click below button to manage yours contacts. It is important to
                keep them up-to date as it will ensure no email is sent to the
                wrong recipient. All contacts must be added/saved before opening
                a new ticket.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Link to="./contacts">
                <button className="dark:bg-slate-800 bg-slate-200 rounded-lg dark:text-slate-400 text-slate-600 outline-none focus:outline-none focus:ring focus:ring-blue-600 hover:ring-1 ring-1 dark:ring-slate-600 ring-slate-400 dark:hover:ring-blue-600 hover:ring-blue-600 text-xs font-bold h-10 px-4 transition-all duration-300">
                  Manage Contacts
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden">
          <Filters />
        </div>

        {/**Others  ====================================== */}
        <div className="h-28 w-full rounded-xl dark:bg-slate-900 bg-white overflow-hidden p-4 space-x-4 grid grid-cols-3">
          {/**Agents Queue ====================== */}
          <div className="w-full h-full col-span-1 flex justify-center py-4">
            <div className="h-full w-full flex flex-col justify-between space-y-2">
              <div className="space-x-2 items-center h-full w-full grid grid-cols-3 px-2">
                <div className="col-span-1 h-full border-r dark:border-slate-800 border-slate-300 pr-6 flex flex-col justify-center items-center">
                  <p className="text-slate-500 text-lg font-bold">2</p>
                  <p className="text-slate-500 text-xs font-semibold">Online</p>
                </div>
                <div className="col-span-1 h-full border-r dark:border-slate-800 border-slate-300 pr-6 flex flex-col justify-center items-center">
                  <p className="text-slate-500 text-lg font-bold">2</p>
                  <p className="text-slate-500 text-xs font-semibold">Busy</p>
                </div>
                <div className="col-span-1 h-full pr-6 flex flex-col justify-center items-center">
                  <p className="text-slate-500 text-lg font-bold">2</p>
                  <p className="text-slate-500 text-xs font-semibold">
                    Offline
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/**Messages Reply Count ====================== */}
          <div className="col-span-1 flex justify-center items-center">
            <div className="h-14 w-[90%] flex items-center space-x-4 dark:bg-slate-800 bg-slate-100 rounded-lg p-2">
              <div className="h-10 w-12 dark:bg-[#2564eb7a] bg-[#2564eb54] text-slate-600 dark:text-slate-400 flex justify-center items-center text-2xl rounded-md">
                <BsEnvelope />
              </div>
              <h2 className="dark:text-slate-400 text-slate-600 tracking-wide uppercase text-xs font-sans w-full flex justify-between">
                <span>Inbox Replies</span>
                <span>0</span>
              </h2>
            </div>
          </div>
          {/**Reminders  Count ====================== */}
          <div className="col-span-1 flex justify-center items-center">
            <div className="h-14 w-[90%] flex items-center space-x-4 dark:bg-slate-800 bg-slate-100 rounded-lg p-2">
              <div className="h-10 w-12 dark:bg-[#2564eb7a] bg-[#2564eb54] text-slate-600 dark:text-slate-400 flex justify-center items-center text-2xl rounded-md">
                <BsAlarm />
              </div>
              <h2 className="dark:text-slate-400 text-slate-600 tracking-wide uppercase text-xs font-sans w-full flex justify-between">
                <span>Pending Reminders</span>
                <span>0</span>
              </h2>
            </div>
          </div>
        </div>
        {/**Bottom Half ================================ */}
        <div className="row-span-3 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ToDo />
          <div className="col-span-1 h-[26rem] grid grid-rows-5 dark:bg-slate-900 bg-white rounded-xl px-2">
            <div className="row-span-2 bg-no-repeat bg-center bg-contain border-b dark:border-slate-700 border-slate-400 flex flex-col justify-center items-center px-4">
              <h2 className="dark:text-slate-400 text-slate-600 text-2xl font-bold capitalize">
                Monthly Summary
              </h2>
              <p className="text-slate-500 text-center text-sm">
                To see more analytics please visit the reports page and you can
                also check the current progress or your tickets in tickets page.
              </p>
            </div>
            <div className="row-span-3 space-y-2 px-4 p-2">
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl  dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-500 flex justify-center items-center text-2xl">
                    <BsCheckAll />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-500 text-sm font-bold">
                    Resolved
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-500 text-xl font-semibold flex items-center">
                  {
                    filteredTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "resolved"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl  dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-500 flex justify-center items-center text-xl">
                    <BsDashSquare />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-500 text-sm font-bold">
                    Closed
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-500 text-xl font-semibold flex items-center">
                  {
                    filteredTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "closed"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl  dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-500 flex justify-center items-center text-xl">
                    <BsArrowRepeat />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-500 text-sm font-bold">
                    On-Hold
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-500 text-xl font-semibold flex items-center">
                  {
                    filteredTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "on hold"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-500 flex justify-center items-center text-xl">
                    <BsEnvelopeOpen />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-500 text-sm font-bold">
                    Open
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-500 text-xl font-semibold flex items-center">
                  {
                    filteredTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "open"
                    ).length
                  }
                </h5>
              </div>
            </div>
          </div>
          <div className="col-span-1 h-[26rem] hidden dark:bg-slate-900 bg-white rounded-xl lg:grid grid-rows-2 overflow-hidden place-items-center">
            <img
              className="h-full w-full object-cover object-center rounded-t-xl"
              src={Businnes}
              alt="business"
            />
            <div className="row-span-1 px-4 p-2 space-y-2 overflow-y-hidden">
              <h2 className="md:text-2xl text-lg dark:text-slate-400 text-slate-600 font-bold">
                Biggest Business Trends In 2022
              </h2>
              <p className="text-slate-400 text-sm">
                Here are the eight key trends every company will have to tackle
                in order to succeed.
              </p>
              <button className="bg-blue-600 outline-none focus:outline-none focus:ring focus:ring-blue-700 hover:ring-1 ring-1 ring-blue-800 hover:opacity-90 transition-all  text-sm text-slate-300 font-semibold px-4 py-2 rounded-md">
                Read more <BsArrowRightShort className="inline text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
