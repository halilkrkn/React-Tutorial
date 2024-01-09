import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  selectFilteredTodos,
  toggle,
} from "../redux/todos/todosSlice";


// Burada useSelector içerisindeki useSelector((state) => state.todos.items); tanımını todoSlice içerisinde tanımladık.
// Ki artık başka yerlerde de aynı kodu tekrar tekrar yazmamak için ve olaki bir değişiklikte tek bir yerden değiştirerek kod bütünlüğünü bozmamış olduk.
function TodoList() {
  // const items = useSelector((state) => state.todos.items);
  // const items = useSelector(selectTodos)
  // const activeFilter = useSelector((state) => state.todos.activeFilter);
  const filteredTodos = useSelector(selectFilteredTodos);
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggle(id));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteTodo(id));
    }
  };

  // let filtered = [];
  // filtered = items
  // if(activeFilter !== "all") {
  //   filtered = items.filter((item) =>
  //     activeFilter === "active"
  //       ? item.completed === false
  //       : item.completed === true
  //   );
  // }

  return (
    <ul className="todo-list">
      {filteredTodos.length === 0 ? (
        <div className="view">
          <input
            className="new-todos"
            disabled={true}
            placeholder="No Have A Messages Yet"
            autoFocus
          />
        </div>
      ) : (
        filteredTodos.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onChange={() => handleToggle(item.id)}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default TodoList;
