import { createSlice } from "@reduxjs/toolkit";
import { SortState } from "pages/Product/types";

const initialState: SortState = {
  sort: "createdAt",
  order: "desc",
};
const sortProductSlice = createSlice({
  name: "sortProduct",
  initialState,
  reducers: {
    changeSort(state, action) {
      console.log(action);
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
  },
});
const { reducer, actions } = sortProductSlice;
export const { changeSort } = actions;
export const sort = initialState;
export default reducer;
