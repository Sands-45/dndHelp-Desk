import { createSlice } from "@reduxjs/toolkit";

const initialId = () => {
  const init = window.localStorage.getItem("threadId");
  return JSON.parse(init);
};

const initialState = {
  allTickets: [],
  threadMessage: [],
  threadId: initialId(),
  contacts: [],
  settings: [],
  filters: {
    startDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).toLocaleDateString(),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      30
    ).toLocaleDateString(),
    client: "",
    status: "",
    agent: "",
    category: "",
  },
  filteredTickets: [],
  frequentlyAsked: [],
};

export const TicketsSlice = createSlice({
  name: "Tickets",
  initialState,
  reducers: {
    addAllTickets: (state, action) => {
      state.allTickets = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    loadSettings: (state, action) => {
      state.settings = action.payload;
    },
    setThreadMessage: (state, action) => {
      state.threadMessage = action.payload;
    },
    setThreadId: (state, action) => {
      state.threadId = action.payload;
    },
    loadFrequentlyAsked: (state, action) => {
      state.frequentlyAsked = action.payload;
    },
    filter: (state, action) => {
      state.filters = action.payload;
    },
    updateFilteredTickets: (state, action) => {
      state.filteredTickets = (action.payload).sort((a, b) => {
        return (
          new Date(a.due_date !== null && a.due_date).getDate() -
          new Date(b.due_date !== null && b.due_date).getDate()
        );
      });
    },
  },
});

export const {
  addAllTickets,
  setContacts,
  loadSettings,
  setThreadMessage,
  setThreadId,
  loadFrequentlyAsked,
  filter,
  updateFilteredTickets,
} = TicketsSlice.actions;

export default TicketsSlice.reducer;
