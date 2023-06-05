import { configureStore, createSlice } from "@reduxjs/toolkit";

let winOverflow = createSlice({
  name: "winOverflow",
  initialState: false,
  reducers: {
    change(state, bool) {
      return bool.payload;
    },
  },
});
let openWindowList = createSlice({
  name: "openWindowList",
  initialState: [],
  reducers: {
    openWindowListAdd(state, data) {
      let copy = [...state];
      copy.push(data.payload);
      console.log('copy',copy)
      return copy;
    },
  },
});
export let { change } = winOverflow.actions;
export let { openWindowListAdd } = openWindowList.actions;
export default configureStore({
  reducer: {
    winOverflow: winOverflow.reducer,
    openWindowList: openWindowList.reducer,
  },
});
