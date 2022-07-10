import { RootState } from "app/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { MyRoute } from "../../types";

import "./style.css";
export interface SideBarItemProps {
  key: number;
  route: MyRoute;
}

function SideBarItem(props: SideBarItemProps) {
  const [show, setShow] = React.useState(false);
  const sideBarSlice = useSelector((state: RootState) => state.sideBarReducer);
  const { route } = props;
  const location = useLocation() as any;
  useEffect(() => {
    setShow(false);
  }, [sideBarSlice.isShowSideBar]);
  return (
    <li
      onMouseLeave={() => {
        if (!sideBarSlice.isShowSideBar) {
          setShow(false);
        }
      }}
      className={
        show ? "nav-item has-treeview menu-open" : "nav-item has-treeview"
      }
      style={{ cursor: "pointer" }}
    >
      {route.routes && !route.notShowChildren ? (
        <div
          className={
            location.pathname === route.path ? "nav-link active " : "nav-link"
          }
          onClick={() => {
            setShow(!show);
          }}
          style={{ color: "#c2c7d0" }}
        >
          <i className={route.icon}></i>
          <p>
            {route.title}
            <i className="right fa fa-angle-left"></i>
          </p>
        </div>
      ) : (
        <Link
          to={route.path}
          className={
            location.pathname === route.path ||
            location.pathname === route.redirect
              ? "nav-link active "
              : "nav-link"
          }
        >
          <i className={route.icon}></i>
          <p>{route.title}</p>
        </Link>
      )}

      <ul className="nav nav-treeview text-left">
        {route.routes?.map((route, index) => {
          return (
            <li
              className="nav-item"
              style={{ marginLeft: 30 }}
              key={index}
              onClick={() => {
                setShow(true);
              }}
            >
              <Link
                to={route.path}
                className={
                  location.pathname === route.path ||
                  location.pathname === route.redirect
                    ? "nav-link sidebar-bg-active"
                    : "nav-link"
                }
              >
                <p>{route.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default SideBarItem;
