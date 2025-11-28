import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, actions) => actions?.payload,
    removeConnections: (state, actions) =>
      state?.filter((item) => item?._id !== actions?.payload?._id),
  },
});

export default connectionSlice?.reducer;
export const { addConnections } = connectionSlice.actions;
