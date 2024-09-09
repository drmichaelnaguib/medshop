import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alert-slice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    // auth: authSlice.reducer,
  },
});

export default store;
