import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestSlice from "./requestSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feeds: feedReducer,
    connections: connectionsReducer,
    request: requestSlice,
  },
});

export default appStore;
