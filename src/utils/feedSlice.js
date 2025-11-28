import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feeds",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      console.log({ action, state });
      return state?.filter(({ _id }) => action?.payload !== _id);
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
