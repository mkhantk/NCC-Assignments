import React, { useContext } from "react";
import { Context } from "./AppContext";
import del from "../assets/delete.svg";

const Todo = () => {
  const user = JSON.parse(localStorage.getItem("react_app_login"));
  // console.log(user.name);

  const { state, dispatch } = useContext(Context);
  const { todoList, searchTodo, filteredList } = state;

  const getNextId = () => {
    const ids = todoList.map((todo) => todo.id).splice(-1);

    if (todoList.length === 0) return 1;
    return +ids + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    if (e.target[0].value) {
      const nextId = getNextId();

      dispatch({
        type: "post_todo",
        payload: { id: nextId, text: e.target[0].value },
      });
    }
    e.target[0].value = "";
  };
  // console.log(todoList);

  const handleDelete = (e) => {
    e.preventDefault();
    const id = Number(e.currentTarget.id);
    // console.log(typeof id);

    dispatch({ type: "delete_todo", payload: id });
    // console.log(todoList);
  };

  return (
    <div className="min-h-screen m-auto pt-32 flex flex-col justify-start items-center gap-5 w-[300px] md:w-1/2 md:max-w-2xl md:text-xl">
      <h2 className="text-blue-500 font-bold text-3xl md:text-4xl">
        {user.name.split(" ")[0]}'s To Do List
      </h2>
      <form
        className="flex justify-center items-center gap-5 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Enter todo"
          className="px-3 py-2 outline outline-gray-900 rounded-sm w-full dark:outline-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
        >
          Add
        </button>
      </form>
      <input
        type="text"
        placeholder="Filter"
        className="px-3 py-2 outline outline-gray-900 rounded-sm w-full dark:outline-blue-500"
        onInput={(e) => {
          dispatch({ type: "search_todo", payload: e.target.value });
          // console.log(e.target.value);
          // console.log(filteredList);
          dispatch({ type: "displayFiltered", payload: e.target.value });
        }}
      />

      <div className="flex flex-col justify-center items-center w-full divide-y divide-blue-500">
        {todoList.length >= 1 && searchTodo.length >= 1
          ? filteredList.map((todo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center w-full px-5 py-2"
              >
                <p className="">{todo.text}</p>

                <button id={todo.id} onClick={(e) => handleDelete(e)}>
                  <img src={del} alt="" className="w-5" />
                </button>
              </div>
            ))
          : todoList.map((todo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center w-full px-5 py-2"
              >
                <p className="">{todo.text}</p>

                <button id={todo.id} onClick={(e) => handleDelete(e)}>
                  <img src={del} alt="" className="w-5" />
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Todo;
