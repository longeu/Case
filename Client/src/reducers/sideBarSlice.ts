import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowSideBar: true,
};
const sideBarSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showSideBar(state) {
      state.isShowSideBar = !state.isShowSideBar;
    },
    hideSideBar(state) {
      state.isShowSideBar = false;
    },
  },
});
const { reducer, actions } = sideBarSlice;
export const { showSideBar, hideSideBar } = actions;
export default reducer;
