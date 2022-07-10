import { createSlice } from "@reduxjs/toolkit";
import { convertTypeToast } from "utils/convertTypeToast";

const initialState = {
  show: false,
  content: "",
  style: convertTypeToast("success"),
};
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setShow(state, action) {
      state.show = action.payload.show;
      state.content = action.payload.content;
      state.style = convertTypeToast(action.payload.type);
    },
    setHide(state) {
      state.show = false;
    },
  },
});
const { reducer, actions } = toastSlice;
export const { setShow, setHide } = actions;
export const sort = initialState;
export default reducer;
