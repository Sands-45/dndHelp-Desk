import { createSlice } from "@reduxjs/toolkit";

const initialId = () => {
  const init = window.localStorage.getItem("threadId");
  return JSON.parse(init);
};

const initialState = {
  allTickets: [],
  threadId: initialId(),
  contacts: [],
  email_templates: [],
  settings: [],
  unread:[],
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
    setThreadId: (state, action) => {
      state.threadId = action.payload;
    },
    loadFrequentlyAsked: (state, action) => {
      state.frequentlyAsked = action.payload;
    },
    loadTemplates: (state, action) => {
      state.email_templates = action.payload;
    },
    setUnread: (state, action) => {
      state.unread = action.payload;
    },
    updateFilteredTickets: (state, action) => {
      state.filteredTickets = action.payload.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
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
  loadTemplates,
  updateFilteredTickets,
  setUnread,
} = TicketsSlice.actions;

export default TicketsSlice.reducer;
