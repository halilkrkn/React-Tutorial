import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const GET_TODOS_ASYNC = "todos/getTodosAync";
const ADD_TODO_ASYNC = "todos/addTodosAync";
const TOGGLE_TODO_ASYNC = "todos/toggleTodosAync";
const DELETE_TODO_ASYNC = "todos/deleteTodosAync";

// BaseUrl
axios.defaults.baseURL = "http://localhost:7000/";
export const getTodosAsync = createAsyncThunk(
  GET_TODOS_ASYNC,
  async () => {
    const res = await axios.get("todos").then((res) => res.data);
    return res;
  }
  // async () => {
  //   const res = await fetch("http://localhost:7000/todos");
  //   return await res.json();
  // }
);

// Burada Thunk ile database'e veri eklemesi yapıyoruz.
// Yani eklediğimiz todo'lar database'e eklenecek ve arayüz her çalıştırıldığında göreceğiz.
export const addTodoAsync = createAsyncThunk(ADD_TODO_ASYNC, (data) => {
  const res = axios.post("todos", data).then((res) => res.data);
  return res;
});

export const toggleTodoAsync = createAsyncThunk(
  TOGGLE_TODO_ASYNC,
  ({ id, data }) => {
    const res = axios.patch(`todos/${id}`, data).then((res) => res.data);
    return res;
  }
);

export const deleteTodoAsync = createAsyncThunk(DELETE_TODO_ASYNC, (id) => {
  axios.delete(`todos/${id}`);
  return id;
});