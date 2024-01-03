import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  updateTodo,
  selectTodos,
} from "../features/todo/todoSlice";

// Verileri toplayıp store göndermek için useDispatch kullanıyordu.
// Bu gönderilen verilere erişmek/okumak için de useSelector kullanıyor.
// useSelector ile store'daki verilere erişebiliyoruz.
// useSelector içine yazdığımız fonksiyon sayesinde store'daki verilere erişebiliyoruz.
// useSelector içine yazdığımız fonksiyonun parametresi state'dir.
// state, store'daki tüm verileri içerir.
// state.todo, todoSlice içerisindeki initialState'dır.
// state.todo.todos, initialState içerisindeki todos array'idir.
function Todos() {
  // AddTodo component'inden verileri dispatch ile store gönderdik.
  // O verileri geri okumamız/erişebilmemiz için useSelector() redux yapısını kullanarak verilere erişimimizi sağlattık.
  // Burada useSelector(selectTodos) ile todoSlice.js içerisinde export const selectTodos yapımızı atadık ki verilere erişmimizi sağlattık.
  // Sonrada todos bir list olduğu için onu'da ilgili yerlerde map() fonksiyonu liste içerisindeki verilere eriştik ve kullanıcıya gösterdik.
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState("");
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [editedTodoId, setEditedTodoId] = useState(null);

  // Yukarıdaki yöntemle bu yöntem aynıdır.
  // Sadece yukarıdaki yöntemi todoSlice içerisinde export const selectTodos şeklinde kendimiz oluşturduk ve useSelector'a atadık.
  // const todoss = useSelector((state) => state.todos);

  // Listedeki todoyu id'sine göre silme işlemi
  const deleteTodoHandler = (todoId) => {
    dispatch(removeTodo(todoId));
  };

  // Listeye eklemiş olduğumuz todo'yu id'sine göre güncelleme/editleme işlemi.
  const updateTodoHandler = (todoId) => {
    dispatch(updateTodo({ id: todoId, text: newTodo }));
    setIsTodoEditable(false);
    setEditedTodoId(null);
  };

  return (
    <div
      className={`flex border border-r-emerald-300 border-black/10 rounded-lg shadow-sm shadow-white/75 duration-300  text-black`}
    >
      <ul className="w-full list-none">
      {todos.length === 0 ? (
        <li className="flex justify-center items-center bg-zinc-600 hover:bg-orange-400 text-2xl px-3 py-3 rounded">
          <p>Todo List Empty</p>
        </li>
      ) : (
        todos.map((todo) => (
          <li
            className="flex justify-between
             items-center bg-zinc-700 px-3 py-3 rounded
             "
            key={todo.id}
          >
            <input
              type="text"
              value={todo.id === editedTodoId ? newTodo : todo.text}
              onChange={(e) => {
                setNewTodo(e.target.value);
              }}
              readOnly={!isTodoEditable || todo.id !== editedTodoId}
              className={`flex border outline-none w-full bg-transparent text-center rounded-xl text-white ml-7 h-10 ${
                isTodoEditable && editedTodoId === todo.id
                  ? "border-orange-400 px-2 mr-9 flex"
                  : "border-transparent px-2 mr-9 flex"
              }`}
            />
            <button
              onClick={() => {
                if (isTodoEditable && editedTodoId === todo.id) {
                  updateTodoHandler(todo.id);
                } else {
                  setIsTodoEditable(true);
                  setEditedTodoId(todo.id);
                  setNewTodo(todo.text);
                }
              }}
              className={`${
                isTodoEditable && editedTodoId === todo.id
                  ? "mr-2 inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-blue-600 shrink-0 disabled:opacity-50"
                  : "mr-2 inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-800 shrink-0 disabled:opacity-50"
              }`}
            >
              {isTodoEditable && editedTodoId === todo.id ? "📁" : "✏️"}
            </button>
            <button
              onClick={() => deleteTodoHandler(todo.id)}
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-yellow-300 shrink-0"
            >
              ❌
            </button>
          </li>
         ))
         )}
      </ul>
    </div>
  );
}

export default Todos;
