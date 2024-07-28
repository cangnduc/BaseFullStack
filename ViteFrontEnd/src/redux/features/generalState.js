// redux/features/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import exp from "constants";

const initialState = {
  isUpdate: false, // default theme
};

const updateSlice = createSlice({
  name: "isUpdate",
  initialState,
  reducers: {
    toggleUpdate: (state) => {
      state.isUpdate = !state.isUpdate;
    },
    setUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
  },
});

export const { toggleUpdate, setUpdate } = updateSlice.actions;

export default updateSlice.reducer;
