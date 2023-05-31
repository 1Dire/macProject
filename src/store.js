import { configureStore, createSlice } from "@reduxjs/toolkit";

let winOverflow = createSlice({
  name: "winOverflow",
  initialState: false,
  reducers: {
    change(state ,bool) {
      return bool.payload
    },
  },
});
export let { change } = winOverflow.actions;
export default configureStore({
  reducer: {
    winOverflow: winOverflow.reducer,
  },
});
