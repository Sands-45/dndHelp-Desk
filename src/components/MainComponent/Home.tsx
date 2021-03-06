import { FC, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfile from "./../../default.webp";
import noUsers from "./images/no-userss.svg";
import { BsArrowRight } from "react-icons/bs";
import MostRecent from "./MostRecent";
import StatusSummary from "./StatusSummary";
import { RootState } from "../../Redux/store";
import Connect from "./Connect";
import ConnectModal from "./ConnectModal";

const Home: FC = () => {
  const [apiChannelModal, openAPIModal] = useState<boolean>(false);
  const location = useLocation();
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  let filteredTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );

  const overDue = useMemo(() => {
    return (
      filteredTickets &&
      filteredTickets.filter(
        (firstMsg) =>
          new Date(firstMsg.due_date !== null && firstMsg.due_date).getTime() <=
            new Date().getTime() && firstMsg.status === "open"
      )
    );
  }, [filteredTickets]);

  const categoriesData = useMemo(() => {
    return (
      categories.length >= 1 &&
      categories
        .map((element) => {
          return {
            name: element,
            value: (
              (filteredTickets?.filter(
                (ticket) =>
                  ticket?.category?.toLowerCase() === element?.toLowerCase()
              ).length /
                filteredTickets.length) *
              100
            ).toFixed(1),
          };
        })
        .splice(0, 5)
        .sort((a: any, b: any) => b.value - a.value)
    );
  }, [categories, filteredTickets]);

  const categoryPreloader =
    !categoriesData &&
    [1, 2, 3, 4, 5].map((index) => {
      return (
        <div key={index} className="w-full">
          <small className="text-slate-700 uppercase font-medium dark:text-slate-400 text-[0.6rem]">
            No Data
          </small>
          <div className="w-full flex items-center justify-between">
            <div
              role="progressbar"
              aria-label="progressbas"
              className="h-2 w-full flex-[3] rounded-full animate-pulse bg-slate-400 dark:bg-slate-700 overflow-hidden"
            ></div>
            <div className="flex-[1] flex justify-end text-slate-700 dark:text-slate-400 font-semibold text-xs">
              <span>0.0%</span>
            </div>
          </div>
        </div>
      );
    });

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers.map((user) => {
      return (
        <div
          key={user.id}
          className="w-full snap_child h-13 rounded dark:bg-[#33415569] bg-[#e2e8f0bd] flex items-center space-x-4 p-2 border dark:border-slate-700 border-slate-300"
        >
          <div
            className={`h-10 w-10 flex justify-center items-center rounded relative`}
          >
            <img
              src={
                user.photoUrl !== null && user.photoUrl !== ""
                  ? user.photoUrl
                  : defaultProfile
              }
              alt="profile"
              className={`object-cover w-full h-full object-center rounded border-2 border-slate-500 dark:border-slate-300`}
            />
            <div
              className={`absolute right-[-0.25rem] top-[-0.1rem] h-2.5 w-2.5 rounded-full border-2 dark:border-slate-700 border-slate-200 ${
                user.status === "available"
                  ? "bg-green-600"
                  : user.status === "unavailable"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }`}
            ></div>
          </div>
          <div className="text-xs whitespace-nowrap overflow-hidden text-ellipsis font-bold capitalize dark:text-slate-300 text-slate-800 tracking-wider">
            <abbr title={user.name}>
              <p>{user.name}</p>
            </abbr>
            <abbr title={user.email}>
              <p className="text-[0.7rem] font-medium tracking-normal dark:text-slate-400 text-slate-600 lowercase">
                {user.email}
              </p>
            </abbr>
          </div>
        </div>
      );
    });

  //Component ========================
  return (
    <div
      className={`${
        location.pathname === "/app" ? "grid" : "hidden"
      } dark:bg-transparent bg-transparent w-[95%] 2xl:w-[75rem] min-h-screen mt-4 select-text`}
    >
      <div className="grid gap-4 place-content-center pb-4 h-fit tracking-wide">
        <section className="row-span-3 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/**Top 5 Categories  ========================= */}
          <div className="col-span-1 h-[20rem] flex flex-col justify-between dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded-md overflow-hidden p-4 py-6">
            <div className="w-full">
              <h1 className="dark:text-slate-300 text-slate-900 text-xs text-center font-bold dark:font-semibold uppercase">
                Top 5 Categories
              </h1>
              <p className="text-center text-xs font-medium tracking-normal text-slate-600 dark:text-slate-400 mt-2">
                Actual figures can be found on the reports page.
              </p>
            </div>
            <div className="flex flex-col mt-2 w-full justify-center gap-1 overflow-hidden rounded-lg px-4">
              {categoriesData &&
                categoriesData?.map((element: any, index) => {
                  return (
                    <div key={index} className="w-full">
                      <small className="text-slate-800 dark:text-slate-400 text-[0.6rem] font-medium uppercase">
                        {element.name}
                      </small>
                      <div className="w-full flex items-center justify-between">
                        <div
                          role="progressbar"
                          aria-label="progressbas"
                          className="h-2 w-full flex-[3] rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden"
                        >
                          <div
                            style={{
                              width: `${
                                Number(element.value)
                                  ? parseFloat(element.value).toFixed(1)
                                  : "0.0"
                              }%`,
                            }}
                            className="h-full bg-blue-700 text.[0.15rem] border-r dark:border-slate-800 border-slate-400 text-slate-300 relative hover:opacity-80 rounded-full"
                          >
                            <abbr
                              title={`${element.name} : ${
                                Number(element.value)
                                  ? parseFloat(element.value).toFixed(0)
                                  : 0.0
                              }%`}
                            >
                              <div className="w-full h-full"></div>
                            </abbr>
                          </div>
                        </div>
                        <div className="flex-[1] flex justify-end text-slate-700 dark:text-slate-400 font-semibold text-xs">
                          <span>
                            {element.value >= 0.1 ? element.value : "0.0"}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/**Preloader ============= */}
              {categoryPreloader}
            </div>
          </div>
          {/**Todo List ================================ */}
          {/* <ToDo />*/}
          {/**Tickets Per Status Summary ================================ */}
          <div className="col-span-1 h-[20rem] grid grid-rows-5 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded-md px-4 pb-4">
            <div className="row-span-2 bg-no-repeat bg-center bg-contain flex flex-col justify-center items-center px-4">
              <h1 className="dark:text-slate-300 text-slate-900 text-xs text-center font-bold dark:font-semibold uppercase mt-1">
                Tickets Per Status
              </h1>
              <p className="dark:text-slate-400 text-slate-600 text-center text-xs font-medium tracking-normal mt-2 px-2">
                Hover your mouse on top of each slice below to see the
                percentages, for more analytics please visit the reports page.
              </p>
            </div>
            <StatusSummary />
          </div>
          {/**MostRecent ================================= */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 h-[20rem] dark:bg-slate-800 bg-white  border dark:border-slate-800 border-slate-300 rounded-md p-4 pt-3 pb-4 flex flex-col justify-between items-center">
            <article className="text-center">
              <h1 className="dark:text-slate-300 text-slate-900 text-xs text-center font-bold dark:font-semibold uppercase mt-3">
                Recent Activities
              </h1>
              <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-600 mt-2">
                Your most recent activities.
              </p>
            </article>
            <MostRecent />
          </div>
        </section>

        {/**Bottom Half ================================ */}
        <section className="row-span-2 w-full h-fit lg:h-[18rem] rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center space-y-4 lg:space-y-0 lg:gap-4">
          <div className="col-span-2 w-full h-full rounded-md grid grid-cols-2 md:grid-cols-7 gap-4">
            {/**Connect Other Sources || Omni Channel Settings==================================== */}
            <Connect openAPIModal={openAPIModal} />
            <ConnectModal
              apiChannelModal={apiChannelModal}
              openAPIModal={openAPIModal}
            />

            {/**Progress ============================== */}
            <article className="col-span-5 md:col-span-2 min-h-[10rem] h-full rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 flex flex-col space-y-5">
              <h3 className="dark:text-slate-300 text-slate-900 text-lg font-medium font-sans capitalize">
                Progress
              </h3>
              <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-600">
                You managed to get{" "}
                <span className="text-slate-900 dark:text-slate-300 font-semibold">
                  {" "}
                  {(
                    (filteredTickets.filter(
                      (data) =>
                        new Date(data.date).getTime() >=
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1
                          ).getTime() &&
                        new Date(data.date).getTime() <=
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            30
                          ).getTime() &&
                        data?.status?.toLowerCase() === "solved"
                    ).length /
                      filteredTickets.filter(
                        (data) =>
                          new Date(data.date).getTime() >=
                            new Date(
                              new Date().getFullYear(),
                              new Date().getMonth(),
                              1
                            ).getTime() &&
                          new Date(data.date).getTime() <=
                            new Date(
                              new Date().getFullYear(),
                              new Date().getMonth(),
                              30
                            ).getTime()
                      )?.length) *
                    100
                  )?.toFixed(0) || 0}
                  %
                </span>{" "}
                of your tickets resolved.
                <br /> Currently you have{" "}
                <span className="text-slate-900 dark:text-slate-300 font-semibold">
                  {" "}
                  {(filteredTickets.length >= 1 &&
                    filteredTickets.filter((ticket) => ticket.status === "open")
                      ?.length) ||
                    0}
                </span>{" "}
                open tickets, and{" "}
                <span className="text-slate-900 dark:text-slate-300 font-semibold">
                  {overDue.length}
                </span>{" "}
                overdue tickets.
              </p>
              <div
                role="progressbar"
                aria-label="progressbas"
                className="w-full h-2 rounded-full overflow-hidden dark:bg-slate-700 bg-slate-300"
              >
                <div
                  style={{
                    width: `${(
                      (filteredTickets.filter(
                        (data) =>
                          new Date(data.date).getTime() >=
                            new Date(
                              new Date().getFullYear(),
                              new Date().getMonth(),
                              1
                            ).getTime() &&
                          new Date(data.date).getTime() <=
                            new Date(
                              new Date().getFullYear(),
                              new Date().getMonth(),
                              30
                            ).getTime() &&
                          data?.status?.toLowerCase() === "solved"
                      ).length /
                        filteredTickets.filter(
                          (data) =>
                            new Date(data.date).getTime() >=
                              new Date(
                                new Date().getFullYear(),
                                new Date().getMonth(),
                                1
                              ).getTime() &&
                            new Date(data.date).getTime() <=
                              new Date(
                                new Date().getFullYear(),
                                new Date().getMonth(),
                                30
                              ).getTime()
                        ).length) *
                      100
                    ).toFixed(1)}%`,
                  }}
                  className="h-full bg-blue-600 rounded-full"
                ></div>
              </div>
              <Link
                to="/app/tickets"
                className="text-blue-600 text-sm font-medium flex items-center space-x-2"
              >
                <span>View all Your Tickets</span>
                <BsArrowRight />
              </Link>
            </article>
          </div>

          {/**Online Users ================================ */}
          <div className="col-span-2 lg:col-span-1 h-[18rem] w-full rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-2">
            <div className="h-full w-full dark:bg-slate-800 bg-white rounded-md flex flex-col place-items-center p-4 py-2 overflow-hidden">
              {allMembers.length >= 1 &&
                (user[0]?.access && user[0]?.access) !== "client" && (
                  <div className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap space-y-2">
                    <header className="sticky top-0 z-[99] dark:text-slate-300 text-slate-900 text-lg font-semibold font-sans tracking-wide capitalize dark:bg-slate-800 bg-white h-12 flex justify-between gap-2 border-b border-slate-300 dark:border-slate-700 pb-2 mb-1">
                      <h3 className="flex-[2] text-base font-medium font-sans tracking-wide capitalize">
                        Members
                      </h3>
                      <div className="flex-[3] gap-1 items-center h-full w-full grid grid-cols-3 capitalize">
                        <div className="col-span-1 flex flex-col justify-center items-center">
                          <p className="dark:text-slate-300 text-slate-700 text-xs font-bold">
                            {
                              allMembers.filter(
                                (user) => user.status === "available"
                              ).length
                            }
                          </p>
                          <p className="text-slate-500 text-[0.6rem] font-semibold">
                            available
                          </p>
                        </div>
                        <div className="col-span-1 flex flex-col justify-center items-center">
                          <p className="dark:text-slate-300 text-slate-700  text-xs font-bold">
                            {
                              allMembers.filter(
                                (user) => user.status === "busy"
                              ).length
                            }
                          </p>
                          <p className="text-slate-500 text-[0.6rem] font-semibold">
                            Busy
                          </p>
                        </div>
                        <div className="col-span-1 flex flex-col justify-center items-center">
                          <p className="dark:text-slate-300 text-slate-700  text-xs font-bold">
                            {
                              allMembers.filter(
                                (user) => user.status === "unavailable"
                              ).length
                            }
                          </p>
                          <p className="text-slate-500 text-[0.6rem] font-semibold">
                            Unavailable
                          </p>
                        </div>
                      </div>
                    </header>
                    {users}
                  </div>
                )}

              {/**Placeholders ||Preloader ====================== */}
              {(allMembers.length <= 0 ||
                (user[0]?.access && user[0]?.access) === "client") && (
                <div className="h-full w-full">
                  <div className="h-full w-full rounded-lg dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 p-6 space-y-4">
                    <h2 className="dark:text-slate-400 text-slate-600 tracking-wide text-center uppercase text-xs font-sans font-bold">
                      add your team members
                    </h2>
                    <img
                      src={noUsers}
                      alt="no-users"
                      className="object-center object-fit w-full h-[90%]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
