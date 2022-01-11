import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UsbOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LaptopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";

const { SubMenu, Item } = Menu; //Menu.SubMenu

const Header = () => {
  const [current, setCurrent] = useState("home");

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

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
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home </Link>
      </Item>
      {user && (
        <SubMenu
          key="username"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          <Item key="option1">Option 1</Item>
          <Item key="option2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<UsbOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}
    </Menu>
  );
};
export default Header;
