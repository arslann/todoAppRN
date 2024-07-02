import { createSlice } from "@reduxjs/toolkit";
import {
  insertTodo,
  toggleTodoInDB,
  deleteTodoFromDB,
  getTodos,
} from "../../database/db";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
    addTodoSuccess: (state, action) => {
      state.push(action.payload);
    },
    toggleTodoSuccess: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },
    removeTodoSuccess: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  setTodos,
  addTodoSuccess,
  toggleTodoSuccess,
  removeTodoSuccess,
} = todoSlice.actions;

export const fetchTodos = () => (dispatch) => {
  getTodos((todos) => dispatch(setTodos(todos)));
};

export const addTodo = (text, category) => (dispatch) => {
  insertTodo(text, category, (result) => {
    const newTodo = { id: result.insertId, text, category, completed: false };
    dispatch(addTodoSuccess(newTodo));
  });
};

export const toggleTodo = (id) => (dispatch, getState) => {
  const todo = getState().todos.find((todo) => todo.id === id);
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
