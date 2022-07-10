import { createSlice } from "@reduxjs/toolkit";

import { userType } from "interfaces/userType.interface";

interface userState {
  user: userType;
  token?: string;
}
const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

const initialState: userState = {
  user: {
    id: currentUser.id || 0,
    username: currentUser.username || "",
    fullName: currentUser.fullName || "",
    scopes: currentUser.scopes || [],
    image: currentUser.image || "",
    phone: currentUser.phone || "",
  },
  token: currentUser.token || "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return {
        user: {
          id: action.payload.id,
          username: action.payload.username,
          phone: action.payload.phone,
          fullName: action.payload.fullName,
          scopes: action.payload.scopes,
          image: action.payload.image,
        },
        token: action.payload.token,
      };
    },
    logout(state) {
      localStorage.removeItem("currentUser");
      return {
        user: {
          id: 0,
          username: "",
          fullName: "",
          scopes: [],
          image: "",
          phone: "",
        },
        token: "",
      };
    },
  },
});
const { reducer, actions } = userSlice;
export const { login, logout } = actions;
export default reducer;
