import React from "react";

export const initialValue = {
  isLogin: false,
  isDelete: false,
  toDeleteId: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setLogin":
      return { ...state, isLogin: true };
    case "setLogout":
      return { ...state, isLogin: false };
    case "setDelete":
      return { ...state, isDelete: true };
    case "setNotDelete":
      return { ...state, isDelete: false };
    case "toDelete":
      return { ...state, toDeleteId: action.payload };

    default:
      return state;
  }
};
