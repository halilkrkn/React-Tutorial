import {createSlice, nanoid } from "@reduxjs/toolkit";
import { addTodoAsync, deleteTodoAsync, getTodosAsync, toggleTodoAsync } from "../../services/todoServices";


// Redux Thunk
// Api call(çağrım) işlemi yapmak için bir middleware katmanı olması gerek.
// Bu middleware katmanında istek ettiğimiz action'ı dispacth edebiliriz durdurabiliriz durduktan sonra tekrardan başlatabiliriz vs. işlemler yapılabilir.
// Yani aslında Action -> Middleware -> Reducer -> Store - View
// şeklinde bir yapı  ile aslında middleware actiondaki yapıları apiye iletiyor ve api'den gelen verileri de reducer'a iletiyor
// Yani bu middleware katmanını async yapılar için oluşturulur.
// Bunu da Redux Thunk yapısı ile gerçekleştiriyoruz.
// Böylelikle Asenkron (yani Api ile çalıştığımız veriler ekleyip gösterip sildiğimiz bir database üzerinden) State yönetimini Redux Thunk ile gerçekleştirmiş oluyoruz.
// Kısacası Redux Thunk ile asenkron verileride Global State Yönetiminde kullanmamıza olanak sağlıyor.
// createAsyncThunk ile asenkron işlemleri yönetiyoruz.

const initialTodosState = {
  items: [],
  isLoading: false,
  error: null,
  activeFilter: localStorage.getItem("activeFilter"),
  addNewTodo: {
    isLoading: false,
    error: null
  }
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialTodosState,
  // Burası aslında inMemory yaklaşımı yani verileri belleğe kaydediyoruz.
  // Ama ilgili yer her render edildiğinde yani çalıştırıldığında veriler siliyor.
  // Bu yüzden Redux Thunk ile asenkron işlemleri yönetiyoruz ve gerçek database'e verileri aktarıyoruz.
  reducers: {
    // addTodo: {
    //   // Buradaki reducer ile de normal state ve action olaylarımızı yönetiyoruz.
    //   reducer: (state, action) => {
    //     state.items.push(action.payload);
    //   },

    //   // Buradaki prapere yapısı ile aslında sabit değerleri prepare içerisine koyup aslında bu işlemleri tek bir yerden yönetmiş oluruz.
    //   // Böylelikle ilgili componentten sadece ilgili gereken değeri almamız yeterli olur.
    //   prepare: (title) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         completed: false,
    //       },
    //     };
    //   },
    // },

    // toggle: (state, action) => {
    //   const id = action.payload;
    //   const item = state.items.find((item) => item.id === id);

    //   item.completed = !item.completed;
    // },
    // deleteTodo: (state, action) => {
    //   const id = action.payload;
    //   const filtered = state.items.filter((item) => item.id !== id);
    //   state.items = filtered;
    // },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  // Api işlemlerini Redux içerisinde kullanabilmek için extraReducer içerisine yazıyoruz.
  // Burada ise Thunk sayesinde verileri database'e kaydediyoruz.
  extraReducers: (builder) => {
    builder
      // GET TODOS
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
      })

      // ADD TODOS
      .addCase(addTodoAsync.pending, (state) => {
        state.addNewTodo.isLoading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.addNewTodo.isLoading = false;
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.addNewTodo.isLoading = false;
        state.addNewTodo.error = action.error.message;
      })

      // TOGGLE TODOS
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })

    // DELETE TODOS
    // Burada ise Thunk sayesinde verileri database'den siliyoruz.
    // Yani ilgili todo'yu silmek için ilgili id'yi gönderiyoruz ve o id'ye sahip todo database'den siliniyor.
     .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        const filtered = state.items.filter((item) => item.id !== action.payload);
        state.items = filtered;
     })
  },
});

export const {
  // addTodo,
  // toggle,
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
