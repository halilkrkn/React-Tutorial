import {configureStore} from "@reduxjs/toolkit"
import todoReducer from "../features/todo/todoSlice"


// Store'u configureStore ile oluşturuyoruz.
// Burada reducer'larımızı configureStore'a gönderiyoruz.
// Bu sayede reducer'larımızı bir arada toplamış oluyoruz.
// Yani todoReducer'ı configureStore'a gönderiyoruz.
// Bu sayede configureStore, todoReducer'ı store'a ekliyor.
// Bu sayede store, todoReducer'ı takip ediyor.

export const store = configureStore({
    reducer: todoReducer
})