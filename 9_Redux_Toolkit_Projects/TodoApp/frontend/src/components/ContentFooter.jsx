import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveFilter,
  clearCompleted,
  selectActiveFilter,
} from "../redux/todos/todosSlice";

function ContentFooter() {
  const items = useSelector((state) => state.todos.items);
  const itemsLeft = items.filter((item) => !item.completed).length;
  // const activeFilter = useSelector((state) => state.todos.activeFilter);
  const activeFilter = useSelector(selectActiveFilter);
  const dispatch = useDispatch();

  const handleChangeActiveFilter = (activeFilter) => {
    dispatch(changeActiveFilter(activeFilter));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item{itemsLeft > 1 && "s"} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => handleChangeActiveFilter("all")}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => handleChangeActiveFilter("active")}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => handleChangeActiveFilter("completed")}
          >
            Completed
          </a>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default ContentFooter;
