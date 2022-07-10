import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  isShowImages: false,
};
const uploadImageSlice = createSlice({
  name: "uploadImage",
  initialState,
  reducers: {
    showUploadImage(state) {
      state.isShow = true;
    },
    hideUploadImage(state) {
      state.isShow = false;
    },
    showDetailImages(state) {
      state.isShowImages = true;
    },
    hideDetailImages(state) {
      state.isShowImages = false;
    },
  },
});
const { reducer, actions } = uploadImageSlice;
export const {
  showUploadImage,
  hideUploadImage,
  showDetailImages,
  hideDetailImages,
} = actions;
export default reducer;
