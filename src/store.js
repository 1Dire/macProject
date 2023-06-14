import { configureStore, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
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
//작업 윈도우
let openWindowList = createSlice({
  name: "openWindowList",
  initialState: [],
  reducers: {
    openWindowListAdd(state, data) {
      return produce(state, (draft) => {
        draft.push(data.payload);
      });
    },
    openWindowListRemove(state, data) {
      return produce(state, (draft) => {
        draft.splice(data.payload, 1);
      });
    },
    openWindowShowChange(state, data) {
      const index = data.payload;
      return produce(state, (draft) => {
        draft[index].show = !draft[index].show;
      });
    },
    openWindowZindexChange(state, data) {
      const index = data.payload;
      return produce(state, (draft) => {
        draft[index].show = !draft[index].show;
      });
    },
    zIndexChange(state, data) {
      const payload = data.payload;
      return produce(state, (draft) => {
        draft[payload.index].zIndex = payload.topZindex;
      });
    },
  },
});

//포커스 중인 윈도우
let focusWindow = createSlice({
  name: "focusWindow",
  initialState: {},
  reducers: {
    focusChange(state, data) {
      return data.payload;
    },
  },
});
export let { change } = winOverflow.actions;
export let { openWindowListAdd } = openWindowList.actions;
export let { openWindowListRemove } = openWindowList.actions;
export let { openWindowShowChange } = openWindowList.actions;
export let { focusChange } = focusWindow.actions;
export let { zIndexChange } = openWindowList.actions;
export default configureStore({
  reducer: {
    winOverflow: winOverflow.reducer,
    openWindowList: openWindowList.reducer,
    mockMode: mockMode.reducer,
    focusWindow: focusWindow.reducer,
  },
});
