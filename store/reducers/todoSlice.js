import { createSlice } from "@reduxjs/toolkit";
import {
  insertTodo,
  toggleTodoInDB,
  deleteTodoFromDB,
  getTodos,
} from "../../database/db";

const initialState = {
  todos: [],
  filterCategory: "all",
  searchText: "",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodoSuccess: (state, action) => {
      state.todos = [action.payload, ...state.todos];
    },
    toggleTodoSuccess: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: action.payload.completed }
          : todo
      );
    },
    removeTodoSuccess: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodoSuccess,
  toggleTodoSuccess,
  removeTodoSuccess,
  setFilterCategory,
  setSearchText,
} = todoSlice.actions;

export const fetchTodos = () => (dispatch, getState) => {
  const { filterCategory, searchText } = getState().todos;
  getTodos(filterCategory, searchText, (todos) => dispatch(setTodos(todos)));
};

export const addTodo = (text, category) => (dispatch) => {
  insertTodo(text, category, (result) => {
    const newTodo = { id: result.insertId, text, category, completed: false };
    dispatch(addTodoSuccess(newTodo));
  });
};

export const toggleTodo = (id) => (dispatch, getState) => {
  const todo = getState().todos.todos.find((todo) => todo.id === id);
  if (todo) {
    toggleTodoInDB(id, !todo.completed, () => {
      dispatch(toggleTodoSuccess({ id, completed: !todo.completed }));
    });
  }
};

export const removeTodo = (id) => (dispatch) => {
  deleteTodoFromDB(id, () => {
    dispatch(removeTodoSuccess(id));
  });
};

export default todoSlice.reducer;
