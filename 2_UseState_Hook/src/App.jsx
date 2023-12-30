import "./App.css";
import BackgroundChanger from "./components/BackgroundChanger";
import Counter from "./components/counter";
import Greeting from "./components/Greeting";

function App() {
  return (
    <div>
      <div>
        <Counter />
        <Greeting />
        <BackgroundChanger />
      </div>
    </div>
  );
}

export default App;
