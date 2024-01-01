import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {setUser} = useContext(UserContext)

  const handleSubmit = (e) => {
    // Prevent the page from refreshing
    e.preventDefault();
    // Create a user object
    setUser({ username, password});
  };

  return (
    <div className="login text">
      <h2>Login</h2>
      <div>
        <input
          className="loginInput"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
      </div>
      <div>
        <input
          className="loginInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
      </div>
      <br />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;
