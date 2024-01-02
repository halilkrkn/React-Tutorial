import { createSlice, nanoid } from "@reduxjs/toolkit";

// todoSlice, tüm reducer'ların burada toplandığı yer diyebiliriz.
// Yani kısaca todoSlice, reducer'larımızı tanımladığımız yerdir.
// CreateSlice ile tanımlama işlemlerini oluşturuyoruz.
// Nanoid, uuid ile aynıdır.
// Reducer'lar ile de ekleme, silme, güncelleme vb. işlemleri gerçekleştirmek reducer'lar sayesinde olur.
// Yani todoSlice'lar Store'un başlangıç durumunu takip eder.

// Başlangıç durumu
const initialState = {
  todos: [], // Buraya database için gereken yapı da yazılabilir.
};

// todoSlice, reducer'larımızı tanımladığımız yer.
// Yani burada reducers'ın içerisine ilgili yapı için add ve remove işlemlerini yerine getirmek için gereken yapıları belirttik.
// Burada reducer'larımızı tanımlarken, action'larımızı da belirtiyoruz.
// Action'lar, reducer'lar ile birlikte çalışır.
// Burada oluşturduğumuz reducer'larımızı aslında createSlice'da belirttiğimiz initialState'de verileri aktarmasını sağlatıyoruz.
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action) => {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },

    updateTodo: (state, action) => {
        const todoId = action.payload.id;
        const newText = action.payload.text;
        const todoToUpdate = state.todos.find((todo) => todo.id === todoId);
        if (todoToUpdate) {
          todoToUpdate.text = newText;
        }
        state.todos.push(todoToUpdate)
      }
  },
});

// Action'larımızı burada export ediyoruz.
// Bu sayede store'a erişim sağlanır ve dispatch ile birlikte kullanılabilir
// Dispatch'lar ilgili componentten aldığı veriyi store'a gönderir.
// Mesela burada todoSlice.actions ile oluşturduğumuz todoSlice'ın içerisindeki addTodo, removeTodo, vs. verilere actions kazandırdık.

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

// Reducer'larımızı burada export ediyoruz.
// Bu sayede store'a erişim sağlanır ve dispatch ile birlikte kullanılabilir
export default todoSlice.reducer;

// Selector'larımızı burada export ediyoruz.
// Selector'lar, store'dan veri çekmek için kullanılır.
// Burada state parametresi alır.
// State parametresi, store'daki tüm state'leri alır.
// Yani burada state parametresi, todoSlice'ın tüm state'lerini alır.
export const selectTodos = (state) => state.todos;

// Mesela diyelim ki benim productSlice şeklinde sadece product yapımı uygun bir yapı oluşturmam gerekebilir o zamanda ona göre slice işlemleri yapmam gerekir
// Yani todoSlice şeklinde değil de productSlice şeklinde yapmam gerekir.
// Aşağıdaki gibi yapabiliriz.

// **************** EXAMPLE: *****************
/* 
 
 import { createSlice, nanoid } from "@reduxjs/toolkit";
 
 const initialState = {
   products: [{
     id: 1,
     text: "product1",
   }],
 };
 
 export const productSlice = createSlice({
   name: "product",
   initialState,
   reducers: {
     addProduct: (state, action) => {
       const newProduct = {
         id: nanoid(),
         text: action.payload,
       };
       state.products.push(newProduct);
     },
     removeProduct: (state, action) => {
       const productId = action.payload;
       state.products = state.products.filter((product) => product.id !== productId);
     },
   },
 });
 
 export const { addProduct, removeProduct } = productSlice.actions;
 
 export const selectProducts = (state) => state.products;
 
 export default productSlice.reducer;

 */
