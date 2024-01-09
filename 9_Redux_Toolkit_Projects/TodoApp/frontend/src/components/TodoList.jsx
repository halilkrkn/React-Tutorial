import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  selectFilteredTodos,
  toggle,
  getTodosAsync,
} from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

// Burada useSelector içerisindeki useSelector((state) => state.todos.items); tanımını todoSlice içerisinde tanımladık.
// Ki artık başka yerlerde de aynı kodu tekrar tekrar yazmamak için ve olaki bir değişiklikte tek bir yerden değiştirerek kod bütünlüğünü bozmamış olduk.
function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  const handleToggle = (id) => {
    dispatch(toggle(id));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteTodo(id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message = {error} />;
  }

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
