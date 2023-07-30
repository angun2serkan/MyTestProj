import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [apires, setApiRes] = useState("No Response!");
  const [registerData, setRegisterData] = useState({
    password: "",
    email: "",
    age: "",
    gender: "",
    name: "",
  });
  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });

  const checkApi = () => {
    fetch("http://localhost:8004", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setApiRes(data.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkApi();
  }, []);

  const handleRegister = () => {
    // console.log(registerData);
    fetch("http://localhost:8004/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    fetch("http://localhost:8004/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>{apires}</p>
      </header> */}
      <h1>Register Form</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setRegisterData({ ...registerData, name: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => {
          setRegisterData({ ...registerData, email: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => {
          setRegisterData({ ...registerData, password: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Age"
        onChange={(e) => {
          setRegisterData({ ...registerData, age: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Gender"
        onChange={(e) => {
          setRegisterData({ ...registerData, gender: e.target.value });
        }}
      />

      <button onClick={handleRegister}>Register</button>

      <br />
      <br />
      <br />

      <h1>Login Form</h1>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => {
          setLoginData({ ...loginData, email: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => {
          setLoginData({ ...loginData, password: e.target.value });
        }}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
