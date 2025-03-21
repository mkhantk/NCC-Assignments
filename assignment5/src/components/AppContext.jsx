import React, { act, createContext, useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "setDark":
      return { ...state, dark: true };
    case "setLight":
      return { ...state, dark: false };
    case "setLogin":
      return { ...state, login: !state.login };
    case "setFalseLogin":
      return { ...state, login: false };
    case "post_todo":
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: action.payload.id,
            text: action.payload.text,
          },
        ],
      };
    case "delete_todo":
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.id !== action.payload),
      };
    case "search_todo":
      return {
        ...state,
        searchTodo: action.payload,
      };
    case "displayFiltered":
      return {
        ...state,
        filteredList: state.todoList.filter((todo) =>
          todo.text.includes(action.payload)
        ),
      };
    case "changePage":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "changeCel":
      return {
        ...state,
        cel: action.payload,
      };
    case "changeFer":
      return {
        ...state,
        fer: action.payload,
      };
    case "setRadioChecked":
      return {
        ...state,
        radioChecked: action.payload,
      };
    default:
      return state;
  }
}

export const Context = createContext();

const initialState = {
  dark: false,
  login: false,
  radioChecked: "white",
  todoList: [],
  searchTodo: "",
  filteredList: [],
  currentPage: "todo",
  cel: "",
  fer: "",
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return (
    <Context.Provider value={value}>
      <div className={`min-h-screen  ${state.dark ? "dark" : ""}`}>
        {children}
      </div>
    </Context.Provider>
  );
};

export default AppContext;
