import React, { useContext } from "react";
import { Context } from "./components/AppContext";
import Todo from "./components/Todo";
import Login from "./components/Login";
import Temp from "./components/Temp";

function View() {
  const { state, dispatch } = useContext(Context);
  const { login, currentPage } = state;

  const displayView = () => {
    if (login || localStorage.getItem("react_app_login")) {
      if (currentPage === "todo") {
        return <Todo />;
      } else if (currentPage === "temp") {
        return <Temp />;
      }
    } else {
      return <Login />;
    }
  };
  return (
    <div className="min-h-screen w-full m-auto bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
      {displayView()}
    </div>
  );
}

export default View;
