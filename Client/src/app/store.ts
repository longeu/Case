import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "reducers/userSlice";
import orderSlice from "reducers/orderSlice";
import sideBarSlice from "reducers/sideBarSlice";
import sortProductSlice from "reducers/sortProductSlice";
import productSlice from "reducers/productSlice";
import toastSlice from "reducers/toastSlice";
import uploadImageSlice from "reducers/uploadImage";
const rootReducer = {
  currentUser: userReducer,
  orderReducer: orderSlice,
  sideBarReducer: sideBarSlice,
  sortProductReducer: sortProductSlice,
  productReducer: productSlice,
  toastReducer: toastSlice,
  uploadReducer: uploadImageSlice,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
