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
    setThreadMessage:(state,action)=>{
      state.threadMessage = action.payload
    },
    setThreadId:(state,action)=>{
      state.threadId = action.payload
    }
  },
});

export const {
  addAllTickets,
  setContacts,
  loadSettings,
  setThreadMessage,
  setThreadId,
} = TicketsSlice.actions;

export default TicketsSlice.reducer;