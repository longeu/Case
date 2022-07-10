import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MyRoute } from "../../types";
import SideBarItem from "./SideBarItem";
interface SideBarProps {
  route: MyRoute;
}

function SideBar(props: SideBarProps) {
  const { user } = useSelector((state: RootState) => state.currentUser);
  const { isShowSideBar } = useSelector(
    (state: RootState) => state.sideBarReducer
  );

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4 "
      style={{ height: "100%" }}
    >
      {isShowSideBar && (
        <Link
          to="/dashboard"
          style={{ display: "block" }}
          className="text-center mt-3"
        >
          <img
            style={{ width: 140 }}
            src="	https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg?v=202111190919"
            alt="AdminLTE Logo"
          />
        </Link>
      )}

      <div className="sidebar">
        <div
          className="user-panel mt-3 pb-3 mb-3 d-flex"
          style={{ borderBottom: "none" }}
        >
          <div className="image">
            <img
              src={
                user.image ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
              }
              className="img-circle elevation-2"
              alt="user2-160x160"
            />
          </div>
          <div className="info">
            <a href={`/staff/${user.id}/detail`} className="d-block">
              {user.fullName}
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {props.route.routes?.map((route, index) => {
              return <SideBarItem key={index} route={route} />;
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default SideBar;
