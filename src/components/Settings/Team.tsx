import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultProfile from "./../../default.webp";
import noUsers from "./../MainComponent/images/no-userss.svg";
import { Navigate } from "react-router";
import { deleteUser, activateUser } from "../Data_Fetching/TicketsnUserData";
import { BsFillTrashFill, BsSearch, BsPlusLg } from "react-icons/bs";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import NewUser from "./NewUser";
import { AppDispatch, RootState } from "../../Redux/store";

const Team: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );
  const [newUserModal, setModal] = useState<boolean | any>(false);
  const [search, setSearch] = useState<string | any>(" ");

  //Delete User ================
  const deleteMember = (id: any, uid: any) => {
    fetch("https://dndhelp-desk-first.herokuapp.com/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        uid: uid,
      }),
    })
      .then((req) => req.json())
      .then(() => {
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Deleted User Successfully",
              color: "bg-green-200",
            },
          ])
        );
      })
      .catch((error) => {
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: error.status,
              color: "bg-red-200",
            },
          ])
        );
      });
    deleteUser(id);
  };

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers.map((user) => {
      let id = user.id;
      return (
        <tr
          key={id}
          className={`w-full snap_child h-16 rounded dark:bg-slate-800 bg-white grid grid-cols-9 space-x-4 p-2 border dark:border-slate-700 border-slate-300 ${
            user.name
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(search.toLowerCase().replace(/\s/g, "")) === true ||
            user.email
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(search.toLowerCase().replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          }`}
        >
          <td className="col-span-4 space-x-1 items-center flex">
            <div className="h-10 w-10 rounded border-2 p-[2px] dark:border-slate-500 border-slate-400 relative overflow-hidden">
              <img
                src={
                  user.photoUrl !== null && user.photoUrl !== ""
                    ? user.photoUrl
                    : defaultProfile
                }
                alt="profile"
                className="object-cover w-full h-full object-center rounded-sm"
              />
            </div>
            <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis font-semibold capitalize dark:text-slate-400 text-slate-600">
              <abbr title={user.name}>{user.name}</abbr>
              <br />
              <small className="capitalize col-span-1 dark:text-slate-500 text-slate-500">
                {user.dept} / {user.access}
              </small>
            </p>
          </td>
          <td className="col-span-4 h-full">
            <p className=" h-full text-xs lowercase whitespace-nowrap overflow-hidden text-ellipsis dark:text-slate-400 text-slate-600 flex items-center">
              <abbr title={user.email}>{user.email}</abbr>
            </p>
          </td>
          <td className="col-span-1 text-xs items-right flex justify-end items-center space-x-4">
            <div className="cursor-pointer rounded-full bg-slate-400 relative shadow-sm">
              <abbr title="Activate / Deactivate">
                <input
                  onChange={(e) => activateUser(id, e.target.checked)}
                  type="checkbox"
                  name="toggle"
                  id="toggle1"
                  checked={Boolean(user.active)}
                  className={`focus:outline-none checkbox w-4 h-4 rounded-full bg-white absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto ${
                    user.active && "right-0"
                  }`}
                />
                <label
                  htmlFor="toggle1"
                  className="toggle-label dark:bg-slate-700 block w-8 h-3 overflow-hidden rounded-full bg-slate-400 cursor-pointer"
                />
              </abbr>
            </div>
            <abbr title="Delete Account">
              <button
                onClick={() => {
                  let code = prompt("Enter Pin To Perform Action");
                  code === "0001"
                    ? deleteMember(user.id, user.uid)
                    : alert("Wrong Pin");
                }}
                className="h-8 w-8 rounded outline-none focus:outline-none flex items-center justify-center bg-inherit hover:opacity-80"
              >
                <BsFillTrashFill className="text-red-500 cursor-pointer text-base" />
              </button>
            </abbr>
          </td>
        </tr>
      );
    });

  //Allow Admin Only ==========================
  if (member_details[0].access !== "admin") {
    return <Navigate to="/app" />;
  }

  //Component ==================
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between">
        <h1 className="dark:text-slate-300 text-slate-800  text-base font-bold tracking-wide">
          All Members
        </h1>
        <div className="flex items-center gap-4">
          <label className="relative" htmlFor="searchUser">
            <input
              type="search"
              name="searchUser"
              id="searchUser"
              placeholder="Quick Search ..."
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-[15rem] transition-all bg-transparent border-0 border-b dark:border-slate-700 border-slate-500 focus:ring-0 focus:border-slate-400 dark:focus:border-slate-800 text-slate-600 dark:text-slate-400 placeholder:text-xs placeholder:text-slate-600 dark:placeholder:text-slate-400 z-[999] pl-8"
            />
            <BsSearch
              className={`absolute top-3 left-3 text-slate-600 dark:text-slate-400 text-sm ${
                search !== " " && "hidden"
              }`}
            />
          </label>
          <button
            onClick={() => setModal(true)}
            className="h-10 w-10 rounded bg-blue-600 text-slate-300 font-bold text-sm flex items-center justify-center outline-none focus:outline-none"
          >
            <BsPlusLg />
          </button>
        </div>
      </div>
      <section className="h-[49rem] bg-transparent rounded flex flex-col place-items-center mt-1 py-4 overflow-hidden">
        {allMembers.length >= 1 && (
          <table className="w-full h-full flex flex-col justify-between">
            <thead className="w-full">
              <tr className="w-full h-6 mb-4 text-xs sticky top-0 z-[99] grid grid-cols-9 gap-2 font-semibold uppercase dark:text-slate-300 text-slate-700 border-b border-slate-400 dark:border-slate-700 bg-inherit">
                <th className="col-span-4 text-left">User</th>
                <th className="col-span-4 text-left pl-4">Email</th>
                <th className="col-span-1 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="w-full h-[45rem] overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap space-y-2">
              {users}
            </tbody>
          </table>
        )}
        {allMembers.length <= 0 && (
          <div className="h-full w-full">
            <div className="h-full w-full rounded border dark:border-slate-700 border-slate-400 p-6">
              <h2 className="dark:text-slate-400 text-slate-600 tracking-wide text-center uppercase text-xs font-sans font-bold">
                add your team members
              </h2>
              <img
                src={noUsers}
                alt="no-users"
                className="object-center object-fit w-full h-full"
              />
            </div>
          </div>
        )}
      </section>

      {/**Add New User ============================= */}
      <NewUser newUserModal={newUserModal} setModal={setModal} />
    </div>
  );
};

export default Team;
