import { createSlice } from "@reduxjs/toolkit";

const initialTodosState = {
  items: [],
  activeFilter: "all",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodosState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    toggle: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      item.completed = !item.completed;
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
});

export const {
  addTodo,
  toggle,
  deleteTodo,
  changeActiveFilter,
  clearCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;

