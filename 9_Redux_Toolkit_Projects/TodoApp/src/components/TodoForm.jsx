import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {nanoid} from '@reduxjs/toolkit';
import { addTodo } from "../redux/todos/todosSlice";
function TodoForm() {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if(!title) return
    e.preventDefault(); // İlgili sayfa her event'te sayfayı yenilememesi için.
    dispatch(addTodo({ id: nanoid(), title: title, completed: false }))
    setTitle('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;
