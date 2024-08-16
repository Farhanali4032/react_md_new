import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../actions/userActions";
// import { useLocation } from "react-router";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogoutAction());
  }, []);

  return <div>You are currently Logged Out.</div>;
};

export default Logout;
