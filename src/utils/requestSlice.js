import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action?.payload,
  },
});

export default requestSlice.reducer;
export const { addRequests } = requestSlice.actions;
