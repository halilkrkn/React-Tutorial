import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialTodosState = {
  items: [],
  activeFilter: "all",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodosState,
  reducers: {
    addTodo: {
      // Buradaki reducer ile de normal state ve action olaylarımızı yönetiyoruz.
      reducer: (state, action) => {
        state.items.push(action.payload);
      },

      // Buradaki prapere yapısı ile aslında sabit değerleri prepare içerisine koyup aslında bu işlemleri tek bir yerden yönetmiş oluruz.
      // Böylelikle ilgili componentten sadece ilgili gereken değeri almamız yeterli olur.
      prepare: (title) => {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        };
      },
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

// Burada ilgili her component içinde selector içerisine yazdığımız useSelector((state) => state.todos.items); yapısını sadece tek bir yerden yönetmek
// ve kullanılabilirliğini arttırmak için ve olası bir değişiklikte tek bir yerden o değişikliği sağlatmak için
// selector içerisine yazdığımız yapıları burada tanımlıyoruz.
// Sonra ilgili componentte sadece useSelector() fonksiyonuna bunu useSelector(selecTodos), useSelector(selectFilteredTodos) vs. gibi şeklinde tanımlayarak useSelect işlemini yapbiliyoruz.
// Bu işlemlerin geneline selectors deniyor.
// Yani selectorslar ile herhangi bir state altındaki herhangi elemanı seçip sonrasın o ilgili seçimi ilgili componentte useSelector() fonksiyonu içerisinde tnaımlayabiliriz/kullanabiliriz.
export const selectTodos = (state) => state.todos.items;
export const selectActiveFilter = (state) => state.todos.activeFilter;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }

  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};
