import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  return <Drawer visible={true}>{JSON.stringify(cart.name)}</Drawer>;
};

export default SideDrawer;
