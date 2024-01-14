import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";
import { addTodoAsync } from "../services/todoServices";

// Bu yapıları kullanmıyoruz
// Çünkü Redux Thunk ile artık verileri database'e ekliyoruz.
// BU yüzden bunların yerine addTodoAsync'i kullanıyoruz.
// import { nanoid } from "@reduxjs/toolkit";
// import { addTodo } from "../redux/todos/todosSlice";

function TodoForm() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
  const error = useSelector((state) => state.todos.addNewTodo.error);

  const handleSubmit = (e) => {
    if (!title) return;

    e.preventDefault(); // İlgili sayfa her event'te sayfayı yenilememesi için.

    dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isLoading && <Loading />}
      {error && <Error message={error} />}
    </form>
  );
}

export default TodoForm;
