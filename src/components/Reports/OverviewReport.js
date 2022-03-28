import React, { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const OverviewReport = ({ data }) => {
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const categories = useSelector((state) => state.Tickets.categories);
  const [option, setOption] = useState("hour");
  const categoriesData = useMemo(() => {
    return (
      categories.length >= 1 &&
      categories.map((element) => {
        return {
          name: element,
          value: (
            ((data.length >= 1 &&
              data.filter(
                (ticket) =>
                  ticket.category.toLowerCase() === element.toLowerCase()
              ).length) /
              data.length) *
            100
          ).toFixed(1),
        };
      })
    );
  }, [categories, data]);

  categoriesData &&
    categoriesData.sort((a, b) => {
      return Number(b.value) - Number(a.value);
    });

  //Total Calls Incoming or Outgoing ===========================
  const totalCalls = useMemo(() => {
    return allTickets.length >= 1 && data.length >= 1
      ? allTickets.filter((ticket) =>
          data.some((item) => item.ticket_id === ticket.ticket_id)
        ).length
      : 0;
  }, [allTickets, data]);

  //Top 5 categories Bar ==================
  const colorPalettes = [
    "#1e40af",
    "#6366f1",
    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#1e40af",
    "#6366f1",
    "#2563eb",
  ];
  const category =
    categoriesData.length >= 1 &&
    categoriesData.map((element, index) => {
      return (
        <div
          key={index}
          style={{
            width: `${
              Number(element.value)
                ? parseFloat(element.value).toFixed(1)
                : "0.0"
            }%`,
            backgroundColor: `${colorPalettes[index]}`,
          }}
          className="h-full text.[0.15rem] border-r dark:border-slate-800 border-slate-400 text-slate-300 relative hover:opacity-80"
        >
          <abbr
            title={`${element.name} : ${
              Number(element.value) ? parseFloat(element.value).toFixed(0) : 0
            }%`}
          >
            <div className="w-full h-full"></div>
          </abbr>
        </div>
      );
    });

  //Preping daily count  Data==============
  let toolTip = option === "day" ? "Day" : "Time";
  let toolTipEtxra = option === "day" ? "" : ":00Hrs";
  const solvedTickets =
    data.length >= 1 &&
    data.filter((ticket) => ticket.status === "solved" && ticket.fcr === "no");
  const chartData = useMemo(() => {
    return [
      ...new Set(
        data.map((data) =>
          option === "day"
            ? new Date(data.date).getDate()
            : new Date(data.date).getHours() + 1
        )
      ),
    ].map((elem) => ({
      name: elem,
      value:
        option === "day"
          ? data.filter((data) => new Date(data.date).getDate() === elem).length
          : data.filter((data) => new Date(data.date).getHours() === elem)
              .length,
    }));
  }, [data, option]);

  //Sort data =========
  chartData.sort((a, b) => {
    return Number(a.name) - Number(b.name);
  });

  //Component =============================
  return (
    <div className="col-span-3 lg:col-span-1  rounded-xl flex flex-col space-y-4">
      <div className="h-[13rem] dark:bg-slate-800 bg-slate-200 border dark:border-slate-800 border-slate-300 w-full p-4 pt-6 overflow-hidden rounded-xl shadow">
        <h2 className="text-xs dark:text-slate-300 text-slate-900 font-sans dark:font-semibold font-bold uppercase tracking-normal">
          Tickets Statistics
        </h2>
        <div className="mt-4 flex space-x-4 px-2 h-14 w-full justify-between">
          <div className="dark:text-slate-300 text-slate-700">
            <h4 className="text-base font-semibold text-center uppercase">
              {data.length}
            </h4>
            <h4 className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-500 font-semibold text-center uppercase">
              Total Tickets
            </h4>
          </div>
          <div className="dark:text-slate-300 text-slate-700">
            <h4 className="text-base font-semibold text-center uppercase">
              {totalCalls}
            </h4>
            <h4 className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-500 font-semibold text-center uppercase">
              Aggregate
            </h4>
          </div>
          <div className="dark:text-slate-300 text-slate-700">
            <h4 className="text-base font-semibold text-center">
              {`${
                solvedTickets.length >= 1
                  ? (
                      Number(
                        (
                          solvedTickets
                            .map(
                              (data) =>
                                new Date(data.closed_time).getTime() -
                                new Date(data.date).getTime()
                            )
                            .reduce((acc, value) => acc + value, 0) /
                          solvedTickets.length /
                          60000
                        ).toFixed(0)
                      ) / 60
                    )
                      .toString()
                      .split(".")[0]
                  : 0
              }`}
              <span className="text-xs">hrs</span>{" "}
              {`${
                solvedTickets.length >= 1
                  ? Number(
                      (
                        solvedTickets
                          .map(
                            (data) =>
                              new Date(data.closed_time).getTime() -
                              new Date(data.date).getTime()
                          )
                          .reduce((acc, value) => acc + value, 0) /
                        solvedTickets.length /
                        60000
                      ).toFixed(0)
                    ) % 60
                  : 0
              }`}
              <span className="text-xs">mins</span>
            </h4>
            <h4 className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-500 font-semibold text-center uppercase">
              AV Age of Query
            </h4>
          </div>
        </div>
        <div className="flex flex-col h-16 space-y-2 w-full justify-center">
          <small className="text-xs space-y-2 font-semibold tracking-normal capitalize dark:text-slate-300 text-slate-900">
            Tickets Per Categories
          </small>
          <div className="h-2.5 w-full rounded-full dark:bg-slate-700 bg-slate-200 flex overflow-hidden border dark:border-slate-800 border-slate-400">
            {category}
          </div>
        </div>
      </div>

      {/**Traffic trend chart ======================== */}
      <div className="h-[18rem] dark:bg-slate-800 bg-slate-200 border dark:border-slate-800 border-slate-300 w-full p-4 overflow-hidden rounded-xl shadow">
        <div className="h-full w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-xs dark:text-slate-300 text-slate-900 font-sans dark:font-semibold font-bold uppercase tracking-normal">
              Traffic
            </h2>
            <select
              onChange={(e) => setOption(e.target.value)}
              className="h-8 w-20 rounded-md text-xs p-2 dark:bg-slate-900 bg-slate-100 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none"
            >
              <option value="hour">Hourly</option>
              <option value="day">Daily</option>
            </select>
          </div>
          <ReactECharts
            style={{ height: "100%", width: "100%" }}
            option={{
              xAxis: {
                show: true,
                type: "category",
                data: chartData.map((data) => data.name),
                splitNumber: 1,
                splitLine: {
                  show: false,
                },
                axisLine: {
                  show: true,
                  lineStyle: { color: "#64748b" },
                },
              },
              yAxis: {
                show: true,
                type: "value",
                splitNumber: 1,
                splitLine: {
                  show: false,
                },
                axisLine: {
                  show: true,
                  lineStyle: { color: "#64748b" },
                },
                min: 0,
              },
              series: [
                {
                  data: chartData.map((data) =>
                    (data.value / chartData.length).toFixed(0)
                  ),
                  type: "line",
                  smooth: true,
                  showSymbol: false,
                  lineStyle: { width: 2 },
                  areaStyle: {},
                },
              ],
              tooltip: {
                trigger: "axis",
                formatter: `${toolTip} {b0}${toolTipEtxra} : {c0} Tickets`,
                backgroundColor: "#94a3b8",
                borderColor: "#94a3b8",
                textStyle: {
                  color: "#fff",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewReport;
