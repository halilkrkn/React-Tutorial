import React, { useState } from 'react'

// const [counter, setCounter] = useState(0); ile aslında counter bir variable, setCounter ise bir funtion'dır.
// Yani burada bir durum yönetimi yapıyoruz ki kodumuz UI da güncellensin ve en son değer hemen gözüksün.
function Counter() {
    
    const [counter, setCounter] = useState(0) 
    // Bu şekilde callback ile de kullanım mevcut.
    // Burada callback yaptığımız için counter aslında prevCounter olarak işlevine devam ediyor ve arttırım yapıyor.
    const AddValue = () => {
      setCounter((prevCounter) => prevCounter + 1);
    };
  
    // Bu şekilde counter değerini vererek de mevcut
    const RemoveValue = () => {
      setCounter(counter - 1);
    };
  
        // Eğer counter değeri -1 olursa eğer 0 değerine döndürüyoruz.
    // Burada counter değerini setCounter ile güncelleyebiliyoruz.
    if(counter == -1) {
      AddValue(0)
    }
  
    return (
      <>
        <h1>UseState</h1>
        <h2>Counter value: {counter} </h2>
        <button onClick={AddValue}>Add value</button>{" "}
        <button onClick={RemoveValue}>Remove value</button>
      </>
      );
}

export default Counter