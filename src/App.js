import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase_config";
import firebase from "firebase";
import TodoListItem from "./Todo";
import background from "./bg.jpg";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch

  /**
   * Fetch data
   */
  function getTodos() {
    //real-time database update
    db.collection("todos").onSnapshot(function (querySnapshot) {
      const todos = querySnapshot.docs.map((doc) => ({
        id: doc.id, //for deletion
        todo: doc.data().todo,
        inProgress: doc.data().inProgress,
      }));
      todos.sort((a, b) => {
        if (a.inProgress) return -1;
        return 1;
      });
      setTodos(todos);
    });
  }

  // update database
  const addTodo = (e) => {
    // not allow reload the page
    e.preventDefault();
    db.collection("todos").add({
      inProgress: true,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });
    setTodoInput("");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            padding: "0px 20px 20px 20px",
            marginTop: "20px",
          }}
        >
          <h1>Animal Crossing Todos App</h1>
          <form>
            <TextField
              id="standard-basic"
              label="Write a Todo"
              // write something on panel and store it
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              fullWidth
              style={{ alignItems: "center" }}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={addTodo}
              style={{ display: "none" }}
            >
              Default
            </Button>
          </form>
          {todos.map((todo) => (
            // we don't need the whole map
            <TodoListItem
              todo={todo.todo}
              inProgress={todo.inProgress}
              id={todo.id}
              key={todo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
