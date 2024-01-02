import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

// Verileri toplayıp store göndermek için useDispatch'ı kullanıyoruz.
// Aslında useDispatch ile AddTodo'dan alınan verileri başka bir component'e gönderebiliyoruz. 
// Tabi useDispatch ile ilk olarak store gönderiliyor sonra başka component'te store gönderilmiş veriyi store'dan useSelector yardımıyla alabiliyor.
// Böylece bir componentten başka bir componente veri göndermiş oluyoruz.
// Yani store veri gönderebilmemiz için useDispatch ve todoSlice'da oluşturduğumuz addTodo actions yapısını buraya çağırıp store'a veri gönderebiliyoruz.
function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  // input değerini alıp addTodo fonksiyonuna gönderiyoruz.
  const addTodoHandler = (e) => {
    e.preventDefault();

    if(input == "") {
      // alert("Lütfen bir todo giriniz:")
      return
    } else {
      // Burada dispacth yani useDispatch fonksiyonu ile içerisine todoSlice içerisindeki reducers'în içerisindeki addTodo fonksiyonunu atadık ve o fonksiyona input ile veriyi aktarmış olduk.
      // addTodo yu zaten actions olarak todoSlice içerisinde oluşturduğumuz için bu componente çağırdık. 
      dispatch(addTodo(input));
      setInput("");
    }

  };

  return (
    <div>
      <form onSubmit={addTodoHandler} className="flex pt-7">
        <input
          className="first-letter:w-full w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          placeholder="Enter ta Todo..."
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
