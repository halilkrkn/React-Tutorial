import { useState } from "react";
import "./App.css";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components/index";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("try");
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  const { isLoading, error } = useCurrencyInfo(from);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (from === to) {
      alert("You can't convert from and to the same currency!");
      return;
    }
    if (amount == null) {
      alert("Please enter a valid amount!");
      return;
    }
    convert();
  }

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };
  
  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  return (
    <div
      className="w-full h-screen flex flex-wrap
      justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
           
            <div className="w-full mb-1">
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
              className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 hover:bg-orange-400 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
              onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label= "to"
                currencyOptions={options}
                amount={convertedAmount}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisable={true}
                classNames="ml-4"
              />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-orange-400 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
