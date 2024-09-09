import { createSlice } from "@reduxjs/toolkit";

const initialState = { visible: false, type: "", message: "" };

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    showAlert: (state, action) => {
      state.visible = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideAlert: (state) => {
      state.visible = false;
      state.type = "";
      state.message = "";
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice;
