import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {

  UsbOutlined,
  UserAddOutlined,

  SettingOutlined,

  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";
//import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.gif";

const { SubMenu, Item } = Menu; //Menu.SubMenu

const Header = () => {
  const [current, setCurrent] = useState("home");

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {
    //console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGGOUT",
      payload: null,
    });
    history.push("/login");
    // navigate("/login");
  };

  return (
    <>
      <div className="row">
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          // defaultSelectedKeys={["1"]}
          // style={{ lineHeight: "64px" }}
        >
          <Item key="home" style={{ marginBottom: "7px", float: "left" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logo} style={{ height: "40px" }} alt="logo" />
            </Link>
          </Item>
          <Item
            key="shop"
            icon={<ShoppingOutlined />}
            style={{ marginright: "auto", float: "left" }}
          >
            <Link to="/shop">Shop </Link>
          </Item>
          <Item
            key="cart"
            icon={<ShoppingCartOutlined />}
            style={{ marginRight: "auto" }}
          >
            <Link to="/cart">
              <Badge count={cart.length} offset={[9, 0]}>
                Cart
              </Badge>
            </Link>
          </Item>

          {!user && (
            <Item
              key="register"
              icon={<UserAddOutlined />}
              className="float-right"
              style={{ float: "right" }}
            >
              <Link to="/register">Register</Link>
            </Item>
          )}
          {!user && (
            <Item
              key="login"
              icon={<UsbOutlined />}
              className="float-right"
              style={{ float: "right" }}
            >
              <Link to="/login">Login</Link>
            </Item>
          )}
          {user && (
            <SubMenu
              icon={<SettingOutlined />}
              title={user.email && user.email.split("@")[0]}
              className="float-right"
              style={{ float: "right" }}
            >
              {user && user.role === "subscriber" && (
                <Item>
                  <Link to="/user/history">Dashboard</Link>
                </Item>
              )}

              {user && user.role === "admin" && (
                <Item>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Item>
              )}

              <Item icon={<LogoutOutlined />} onClick={logout}>
                Logout
              </Item>
            </SubMenu>
          )}
        </Menu>
        <div className="float-right">
          <span style={{ marginleft: "auto", float: "right" }}>
            <Search />
          </span>
        </div>
      </div>
    </>
  );
};
export default Header;

{
  /* <Item key="home" style={{ marginBottom: "7px" }}>
<Link to="/" style={{ textDecoration: "none" }}>
  <img src={logo} style={{ height: "40px" }} alt="logo" />
</Link>
</Item> */
}