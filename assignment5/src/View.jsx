import React, { useContext } from "react";
import { Context } from "./components/AppContext";
import Todo from "./components/Todo";
import Register from "./components/Register";
import Temp from "./components/Temp";

function View() {
  const { state, dispatch } = useContext(Context);
  const { currentPage } = state;

  const displayView = () => {
    if (currentPage === "todo") {
      return <Todo />;
    } else if (currentPage === "temp") {
      return <Temp />;
    } else if (currentPage === "register") {
      return <Register />;
    }
  };
  return (
    <div className="min-h-screen w-full m-auto bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
      {displayView()}
    </div>
  );
}

export default View;
