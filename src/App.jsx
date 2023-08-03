import { useEffect, useState } from "react";

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_URL + "/todos").then((response) => {
      response.json().then((data) => {
        setTodos(data);
      });
    });

    setInterval(() => {
      fetch(import.meta.env.VITE_URL + "/todos").then((response) => {
        response.json().then((data) => {
          setTodos(data);
        });
      });
    }, 3600000);
  }, []);

  return todos;
}

function App() {
  const todos = useTodos();

  const handleDelete = (id) => {
    // You need to implement the logic to delete the todo with the given id.
    // For this example, let's assume you have an API endpoint to delete a todo:
    fetch(import.meta.env.VITE_URL + "/todos/" + `${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <span>{todo.title}</span>
            <span>{todo.description}</span>
            <button type="button" onClick={() => handleDelete(todo._id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
