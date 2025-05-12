import React, { useContext } from "react";
import { Context } from "./AppContext";

const useAppContext = () => useContext(Context);

export default useAppContext;
