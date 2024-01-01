import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import UserContextProvider from "./context/UserContextProvider";


// Burada Context Api ile kendi context provider'ımızı oluşturduk.
// Bu context provider'ımızı App componenti içerisinde kullanarak context api ile state yönetimini sağlamış olduk.
// Bu sayede Login ve Profile componentlerindeki state yönetimini context api ile sağlamış olduk.
// Context Api aslında farklı farklı belirlediğimiz yapılar için kullanılabilir.
// Örneğin: UserContext, ThemeContext, CartContext, ProductContext gibi.
// Bu yapıları oluşturup, componentlerimizde kullanabiliriz.
// Bu sayede componentlerimizdeki state yönetimini context api ile sağlamış oluruz.
// Context Api ile aslında bir componentten/sayfadan başka bir componente/sayfaya veri aktarımı yapmak için kullanıyoruz.
// Bu sayede ilgili sayfadan girilen/gönderilen veriyi başka bir sayfa da yakalıyıp kullanabiliyoruz/görüntüleyebiliyoruz.
// Bu sayede componentlerimiz arasında veri aktarımı sağlamış oluyoruz.
// Context Api ile state yönetimini sağlamak için önce context provider oluşturuyoruz.
// Daha sonra context provider'ımızı App componenti içerisinde kullanıyoruz.
// Bu sayede state yönetimini context api ile sağlamış oluyoruz. 

function App() {

  return (
    <UserContextProvider>
      <h1 className="loginText">React Context API</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  );
}

export default App;
