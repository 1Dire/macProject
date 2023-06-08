import { configureStore, createSlice } from "@reduxjs/toolkit";

//목업모드
let mockMode = createSlice({
  name: "mockMoe",
  initialState: true,
});
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
      return copy;
    },
    openWindowListRemove(state, data) {
      let copy = [...state];
      copy.splice(data.payload, 1);
      return copy;
    },
  },
});
export let { change } = winOverflow.actions;
export let { openWindowListAdd } = openWindowList.actions;
export let { openWindowListRemove } = openWindowList.actions;
export default configureStore({
  reducer: {
    winOverflow: winOverflow.reducer,
    openWindowList: openWindowList.reducer,
    mockMode: mockMode.reducer,
  },
});
