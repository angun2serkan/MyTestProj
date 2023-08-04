import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // console.log(process.env.REACT_APP_API_URL);
  const api_url = process.env.REACT_APP_API_URL;

  const [todos, setTodos] = useState(null);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${api_url}/getalltodos`);
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const createTodo = async (e) => {
    if (newTodo.title === "") {
      alert("Title is required");
    }

    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/createtodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      const data = await response.json();
      alert(data.message);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${api_url}/deletetodo/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      alert(data.message);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const specificTodo = async () => {};
  return (
    <div className="App">
      <h1>Todo App</h1>
      {Array.isArray(todos) &&
        todos.map((todo) => {
          return (
            <div key={todo._id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>{todo.completed ? "Completed" : "Not Completed"}</p>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              <br></br>
              <br></br>
            </div>
          );
        })}

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Create Todo</h1>
      <form>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <br></br>
        <input
          type="text"
          placeholder="Description"
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <br></br>
        <button onClick={createTodo}>Create Task</button>
      </form>
    </div>
  );
}

export default App;
