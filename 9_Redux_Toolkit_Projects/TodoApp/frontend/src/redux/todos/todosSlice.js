import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// Redux Thunk
// Api call(çağrım) işlemi yapmak için bir middleware katmanı olması gerek.
// Bu middleware katmanında istek ettiğimiz action'ı dispacth edebiliriz durdurabiliriz durduktan sonra tekrardan başlatabiliriz vs. işlemler yapılabilir.
// Yani aslında Action -> Middleware -> Reducer -> Store - View
// şeklinde bir yapı  ile aslında middleware actiondaki yapıları apiye iletiyor ve api'den gelen verileri de reducer'a iletiyor
// Yani bu middleware katmanını async yapılar için oluşturulur.
// Bunu da Redux Thunk yapısı ile gerçekleştiriyoruz.
// Böylelikle Asenkron (yani Api ile çalıştığımız veriler ekleyip gösterip sildiğimiz bir database üzerinden) State yönetimini Redux Thunk ile gerçekleştirmiş oluyoruz.
// Kısacası Redux Thunk ile asenkron verileride Global State Yönetiminde kullanmamıza olanak sağlıyor.

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  () => {
    const res = axios
      .get("http://localhost:7000/todos")
      .then((res) => res.data);
    return res;
  }
  // async () => {
  //   const res = await fetch("http://localhost:7000/todos");
  //   return await res.json();
  // }
);

const initialTodosState = {
  items: [],
  isLoading: false,
  error: null,
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
  // Api işlemlerini Redux içerisinde kullanabilmek için extraReducer içerisine yazıyoruz.
  extraReducers: (builder) => {
    builder
      // pending: işlem yüklenirken. Yani işlem beklemedeyse.
      .addCase(getTodosAsync.pending, (state) => {
        state.isLoading = true;
      })
      // fulfilled: işlem başarılıysa.
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      // rejected: işlem başarısızsa.
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
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