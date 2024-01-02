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

  const [input, setInput] = useState(todos);
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  // Yukarıdaki yöntemle bu yöntem aynıdır.
  // Sadece yukarıdaki yöntemi todoSlice içerisinde export const selectTodos şeklinde kendimiz oluşturduk ve useSelector'a atadık.
  // const todoss = useSelector((state) => state.todos);

  const updateTodoHandler = () => {
    // dispatch(
    //   updateTodo({
    //     todoId: todoId,
    //     newText: input,
    //   })
    // );
    // setInput(text);
    setIsTodoEditable(false);
  };

  const editTodoHandler = () => {
    setIsTodoEditable((prev) => !prev);
  };

  return (
    <div
      className={`flex border border-r-emerald-300 border-black/10 rounded-lg shadow-sm shadow-white/75 duration-300  text-black`}
    >
      <ul className="w-full list-none">
       {todos.map((todo) => (
          <li
            className="flex justify-between
             items-center bg-zinc-700 px-3 py-3 rounded
             "
            key={todo.id}
          >
            <input
              type="text"
              value={todo.text}
              onChange={(e) => setInput(e.target.value)}
              readOnly={!isTodoEditable}
              className={`flex border outline-none w-full bg-transparent text-center rounded-xl text-white ml-7 h-10 ${
                isTodoEditable ? "border-white/50 px-2 mr-9 flex" : "border-transparent flex"
              }`}
            />
            <button
              onClick={() => {
                if (isTodoEditable) {
                  updateTodoHandler();
                } else {
                  editTodoHandler()
                }
              }}
              className="mr-2 inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            >
              {isTodoEditable ? "📁" : "✏️"}
            </button>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            >
              ❌
            </button>
          </li>
          ))}
      </ul>
    </div>
  );
}

export default Todos;

/*

    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between
             items-center bg-zinc-800 px-4 py-2 rounded
             "
            key={todo.id}
          >
            <div className="text-white">{todo.text}</div>

            <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50">
              {isTodoEditable ? "📁" : "✏️"}
            </button>

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 
               focus: outline-none hover:bg-red-600 rounded text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>


*/
