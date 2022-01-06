import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UsbOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
const { SubMenu, Item } = Menu; //Menu.SubMenu

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    //console.log(e.key);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <SubMenu key="username" icon={<SettingOutlined />} title="Username">
        <Item key="option1">Option 1</Item>
        <Item key="option2">Option 2</Item>
      </SubMenu>

      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
      </Item>
      <Item key="login" icon={<UsbOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Item>
    </Menu>
  );
};
export default Header;
