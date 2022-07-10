import React from "react";

import Footer from "./Footer";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { ComponentProps } from "../../types";
import GenerateRoute from "../../components/GenerateRoute/GenerateRoute";
import { RootState } from "app/store";
import { useDispatch, useSelector } from "react-redux";
import { showSideBar } from "reducers/sideBarSlice";
import { Toast, ToastContainer } from "react-bootstrap";
import { setHide } from "reducers/toastSlice";

function MainLayout(props: ComponentProps) {
  const { isShowSideBar } = useSelector(
    (state: RootState) => state.sideBarReducer
  );
  const toast = useSelector((state: RootState) => state.toastReducer);
  const dispatch = useDispatch();
  const onShowSideBar = () => {
    const action = showSideBar();
    dispatch(action);
  };
  const onCloseToast = () => {
    const action = setHide();
    dispatch(action);
  };
  return (
    <div
      className={
        isShowSideBar ? "wrapper" : "wrapper sidebar-mini sidebar-collapse"
      }
    >
      <ToastContainer
        position={"top-center"}
        className="position-fixed"
        style={{
          marginTop: 10,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Toast onClose={onCloseToast} show={toast.show} delay={3000} autohide>
          <Toast.Body style={toast.style} className="text-center">
            {toast.content}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <NavBar onShowSideBar={() => onShowSideBar()} />
      <SideBar route={props.route} />
      <GenerateRoute route={props.route} />
    </div>
  );
}

export default MainLayout;
