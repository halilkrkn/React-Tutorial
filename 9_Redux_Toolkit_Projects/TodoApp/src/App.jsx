import "./App.css";
import Header from "./components/Header";
import SubFooter from "./components/SubFooter";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <section className="todoapp">
        <Header />
        <Todo />
      </section>
      <SubFooter />
    </>
  );
}

export default App;
