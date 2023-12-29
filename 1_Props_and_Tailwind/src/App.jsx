import './App.css'
import Card from './components/Card'


let myObj = {
  name: 'John Doe',
  age: 30,
  email: "john@doe.com",
  address: {
    street: '12345 Elm St',
    city: "London",
    country: "England"
  }
}

console.log("halilkrkn")

function App() {

  return (
    <>
      <h1 className='text-3xl bg-green-500 p-3 rounded-md'>Props and Vite with Tailwind</h1>
      <Card
        name="Halil İbrahim Karkın"
        title="Android and Java Full Stack Engineer, Apple"
        myObj = {myObj}
      />
    </>
  )
}

export default App

// Props Nedir?

