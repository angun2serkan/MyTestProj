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

  const [userData, setUserData] = useState(null);

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
        console.log(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
      })
      .catch((err) => console.log(err));
  };

  const getSavedToken = () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
  };

  const getUserData = () => {
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:8004/getmyprofile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.user);
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

      <br></br>
      <br></br>
      <br></br>
      <button onClick={getSavedToken}>Get Saved Token</button>

      <br></br>
      <br></br>
      <br></br>
      <h1>User Data</h1>
      <button onClick={getUserData}>Get userData</button>
      {userData && (
        <div>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
          <p>{userData.age}</p>
        </div>
      )}
    </div>
  );
}

export default App;
