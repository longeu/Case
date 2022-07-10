import { createSlice } from "@reduxjs/toolkit";
import { ProductRequest } from "pages/Product/types";

const initialState: ProductRequest = {
  id: 0,
  name: "",
  description: "",
  categoryName: "",
  categoryId: 0,
  image: "",
  status: 0,
  productDetails: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleChangeProduct(state, action) {
      console.log(action);
      return action.payload;
    },
    handleChangeProductDetails(state, action) {
      state.productDetails = action.payload;
    },
    resetInitialState() {
      return initialState;
    },
  },
});
const { reducer, actions } = productSlice;
export const {
  handleChangeProduct,
  handleChangeProductDetails,
  resetInitialState,
} = actions;
export const sort = initialState;
export default reducer;
