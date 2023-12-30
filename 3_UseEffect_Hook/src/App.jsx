import "./App.css";
import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isShow, setShow] = useState(false)

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = "";   
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const chars = "!@#$%^&*()_+~|}{[]:;?><,./-=";
    const allowed = letters + (numberAllowed ? numbers : "") + (charAllowed ? chars : "");

    for (let i = 0; i < length; i++) {
      pass += allowed.charAt(Math.floor(Math.random() * allowed.length));
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select()
      // passwordRef.current?.setSelectionRange(0,4) // İlk dört haneyi seçtiğini gösteriyor.
      setShow((prev) => !prev)
      setTimeout(() => {
        setShow((prev) => !prev)
      }, 2000)


      // Buradaki setShow(prev) => !prev) ile aslında ilk varsayılan olarak false verdiğimiz değer
      // 35. satırda !prev ile true oluyor ve sonra en son değer true olduğu için 
      // 37. satırda !prev değeri 2 saniye sonra tekrar false oluyor.
      //  Böylelikle en son değer (yani prev) false olarak kalıyor. Başka bir !prev ile değişmediği sürece. 
      // Bu sayede copy butonuna bastığımızda 2 saniye boyunca "Copied" yazısı gözüküyor.
      // Yani prev değeri en son hangi değer ise ona sahip oluyor ve onun üzerinden işlemlerini gerçekleştiriyor.
  }

  return (
    <div className="w-full max-w-screen-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-3xl font-bold my-3 mb-5 text-center">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-5">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Generate Password"
          readOnly
          ref={passwordRef}
        />
        <button 
        onClick={
          copyPasswordToClipboard
        }
        className="bg-orange-500s bg-green-900 hover:bg-orange-600 text-white py-1 px-3 outline-none shrink-0">
          {isShow && password ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
            />
            <label htmlFor="length" className="ml-3 mr-1">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
            type="checkbox"
            defaultChecked = {numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            name=""
            id=""
             />
             <label htmlFor="number" className="mr-1">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
            type="checkbox"
            defaultChecked = {charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            name=""
            id=""
             />
             <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
