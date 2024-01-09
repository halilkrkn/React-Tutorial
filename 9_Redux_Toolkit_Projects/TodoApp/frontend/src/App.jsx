import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <section className="todoapp">
        <Header />
        <Todo />
      </section>
      <Footer />
    </>
  );
}

export default App;
