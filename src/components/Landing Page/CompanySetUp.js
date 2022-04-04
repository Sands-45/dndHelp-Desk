import React, { useState } from "react";
import Help from "../Others/Help";
import darkLogo from "./images/dndHelp-Desk.png";
import lightLogo from "./images/dndHelp-Desk_Light.png";
import { Link, useNavigate } from "react-router-dom";
import supportImage from "./images/support-image.svg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//Firestore ===================
import { collection, addDoc, getFirestore } from "firebase/firestore";

const CompanySetUp = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [setUpValues, setValues] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    company_name: "",
    companany_address: "",
    department: "",
    sending_email: "",
    password: "",
    port: "",
    host: "",
  });

  // init services for firestore =========================
  const db = getFirestore();

  //collectionsRef =======================================
  let membersRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        .toLowerCase()
        .replace(/\s/g, "")}/members`
    );

  let emailAccountsRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        .toLowerCase()
        .replace(/\s/g, "")}/email_accounts`
    );

  let companyDetailsRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        .toLowerCase()
        .replace(/\s/g, "")}/settings/all_settings/company_details`
    );

  let categoriesRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        .toLowerCase()
        .replace(/\s/g, "")}/settings/all_settings/categories`
    );

  //Sing Up Or Create New Accouunt
  const handleSubmit = (e, email, password) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        if (data) {
          // New User =================================
          addDoc(membersRef, {
            name: setUpValues.user_name,
            dept: setUpValues.department,
            email: setUpValues.user_email,
            access: "admin",
            bio: "",
            active: true,
            status: "unavailable",
            photoUrl: "",
            companies: "",
          });

          //New  Email Account ==========================
          addDoc(emailAccountsRef, {
            name: "Support",
            email: setUpValues.sending_email,
            password: setUpValues.password,
            host: setUpValues.host,
            port: setUpValues.port,
          });

          //Company Details ==========================
          addDoc(companyDetailsRef, {
            name: setUpValues.company_name,
            address: setUpValues.companany_address,
            subscription: "Pro Plus",
          });

          //Support Categories ==========================
          addDoc(categoriesRef, {
            categories: [
              "Late Delivery",
              "Failed Order",
              "Incorrect Order",
              "Refund",
              "Poor Service (Driver)",
              "Poor Service (Agent)",
              "Poor Service (Store)",
            ],
          });

          //Set Organisation For LogIn ================================
          window.localStorage.setItem(
            "orgarnization_name",
            setUpValues.company_name.toLocaleLowerCase().replace(/\s/g, "")
          );

          //Redirect To LogIn ================================
          navigate("/app");
        }
      })
      .catch(() => navigate("/error-page"));
  };

  //Component  =================================
  return (
    <div className="h-screen w-screen min-h-[40rem] bg-slate-300 grid grid-cols-3 lg:grid-cols-5 overflow-hidden overflow-y-scroll relative">
      {/**Contents Fist Half ================================= */}
      <div className="col-span-2 bg-slate-900 hidden lg:flex flex-col items-center justify-center p-4">
        <div className="relative w-full flex justify-center">
          <img src={lightLogo} alt="welcome" className="w-[50%]" />
        </div>
        <img src={supportImage} alt="welcome" className="w-[70%]" />
      </div>

      {/**Contents Second Half ================================= */}
      <div className="col-span-3 bg-inherit flex items-center justify-center p-4 relative">
        <div className="absolute top-2 2xl:top-8 right-6 text-slate-800 text-sm font-semibold">
          Already have an account ?{" "}
          <Link to="/logIn" className="text-blue-600">
            Login now !
          </Link>
        </div>

        {/**Form ============================================== */}
        <form
          onSubmit={(e) =>
            handleSubmit(e, setUpValues.user_email, setUpValues.user_password)
          }
          className="w-full max-w-[40rem] gap-4 flex flex-col p-2"
        >
          <div className="flex justify-center w-full">
            <img src={darkLogo} alt="logo" className="w-24 mt-auto" />
          </div>
          <h1 className="text-xl font-semibold text-center capitalize text-slate-800">
            Create Your Account
          </h1>

          {/**Start =========================== */}
          <h2 className="mt-4 text-sm font-semibold text-center uppercase text-slate-600">
            Personal Info
          </h2>
          <hr className="bg-slate-400 border-0 h-[1px]" />
          {/**Name & Email Address ========================= */}
          <div className="flex w-full justify-between items-center gap-4">
            <label
              htmlFor="user_name"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Full-Name
              </span>
              <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder="Your name"
                required
                value={setUpValues.user_name}
                onChange={(e) =>
                  setValues({ ...setUpValues, user_name: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="user_email"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Email Address
              </span>
              <input
                type="email"
                name="user_email"
                id="user_email"
                placeholder="yoremail@email.com"
                required
                value={setUpValues.user_email}
                onChange={(e) =>
                  setValues({ ...setUpValues, user_email: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          {/**Password & Home Address ========================= */}
          <div className="flex w-full justify-between items-center gap-4">
            <label
              htmlFor="user_password"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Password
              </span>
              <input
                type="password"
                name="user_password"
                id="user_password"
                required
                placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎"
                value={setUpValues.user_password}
                onChange={(e) =>
                  setValues({ ...setUpValues, user_password: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="department"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Department
              </span>
              <input
                type="text"
                name="department"
                id="department"
                required
                placeholder="Co-Founder ..."
                value={setUpValues.department}
                onChange={(e) =>
                  setValues({ ...setUpValues, department: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          <h2 className="mt-8 text-sm font-semibold text-center uppercase text-slate-600">
            Your Company
          </h2>
          <hr className="bg-slate-400 border-0 h-[1px]" />

          {/**Company Name & Company Address ========================= */}
          <div className="flex w-full justify-between items-center gap-4">
            <label
              htmlFor="company_name"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Company name
              </span>
              <input
                type="text"
                name="company_name"
                id="company_name"
                placeholder="dndHelp-Desk"
                required
                value={setUpValues.company_name}
                onChange={(e) =>
                  setValues({ ...setUpValues, company_name: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="companany_address"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Company Address
              </span>
              <input
                type="text"
                name="companany_address"
                id="companany_address"
                required
                placeholder="14 Lily Road, JP North"
                value={setUpValues.companany_address}
                onChange={(e) =>
                  setValues({
                    ...setUpValues,
                    companany_address: e.target.value,
                  })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          {/**Company Outgoing Email & Server host ========================= */}
          <div className="flex w-full justify-between items-center gap-4">
            <label
              htmlFor="sending_email"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Email Account
              </span>
              <input
                type="text"
                name="sending_email"
                id="sending_email"
                placeholder="support@company.com"
                required
                value={setUpValues.sending_email}
                onChange={(e) =>
                  setValues({ ...setUpValues, sending_email: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="host"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Outgoing Mail Server Host
              </span>
              <input
                type="text"
                name="host"
                id="host"
                placeholder="server.domain.com"
                required
                value={setUpValues.host}
                onChange={(e) =>
                  setValues({
                    ...setUpValues,
                    host: e.target.value,
                  })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          {/**Port  & password ========================= */}
          <div className="flex w-full justify-between items-center gap-4">
            <label
              htmlFor="port"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                OUTGOING MAIL SERVER PORT
              </span>
              <input
                type="text"
                name="port"
                id="port"
                placeholder="465"
                required
                value={setUpValues.port}
                onChange={(e) =>
                  setValues({ ...setUpValues, port: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="password"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Email Account password
              </span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎"
                required
                value={setUpValues.password}
                onChange={(e) =>
                  setValues({
                    ...setUpValues,
                    password: e.target.value,
                  })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          {/**Create Account */}
          <div className="flex w-full justify-center items-center gap-4">
            <button className="mt-2 h-10 w-40 bg-slate-900 rounded-md text-slate-100 font-bold hover:opacity-90 outliq focus:outline-none transition-all uppercase text-sm">
              SignUp
            </button>
          </div>

          <div className="flex justify-center space-x-1 font-medium text-sm">
            <span>By creating an account you agree to our</span>{" "}
            <Link to="" className="text-blue-600">
              Terms and Conditions
            </Link>{" "}
            <span>and </span>
            <Link to="" className="text-blue-600">
              Privacy Policy.
            </Link>
          </div>
        </form>
      </div>

      {/**Help Chat ============ */}
      <Help />
    </div>
  );
};

export default CompanySetUp;
