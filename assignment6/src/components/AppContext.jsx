import React, { createContext, useReducer } from "react";
import { initialValue, reducer } from "./AppReducer";

export const Context = createContext();

function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export default AppContext;
