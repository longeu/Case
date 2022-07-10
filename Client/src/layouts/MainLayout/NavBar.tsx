import { RootState } from "app/store";
import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "reducers/userSlice";

interface NavbarProps {
  onShowSideBar: () => void;
}

function NavBar(props: NavbarProps) {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();
  const { user } = currentUser;
  const onClick = () => {
    try {
      const action = logout();
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    /* Navbar */
    <nav
      className="main-header navbar navbar-expand navbar-white navbar-light"
      style={{ zIndex: 100 }}
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => props.onShowSideBar()}
          >
            <i className="fa fa-bars"></i>
          </span>
        </li>
        <li className="nav-item d-none d-sm-inline-block"></li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <NavDropdown
          title={user.fullName}
          id="nav-dropdown"
          style={{ color: "black" }}
        >
          <NavDropdown.Item eventKey="4.1">
            <Link
              to={`/staff/${user.id}/detail`}
              style={{ display: "block", color: "black" }}
              className="text-center mt-3"
            >
              <i className="far fa-user mr-1"></i> Thông tin tài khoản
            </Link>
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="4.2"
            style={{ cursor: "pointer" }}
            onClick={onClick}
          >
            <i className="fas fa-sign-out-alt mr-1"></i> Đăng xuất
          </NavDropdown.Item>
        </NavDropdown>
      </ul>
    </nav>
    /* /.navbar */
  );
}

export default NavBar;
