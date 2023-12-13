import http from "../../http/http";
import "./Todo.css";
import { useEffect, useState } from "react";
import TodoList from "../../components/TodoList";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [task, setTask] = useState("");
  useEffect(() => {
    getTodos();
    return () => {};
  }, []);

  async function getTodos() {
    try {
      const api = http({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      const { data } = await api.get("/todos");
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function createTodo(e) {
    e.preventDefault();
    console.log(image);

    try {
      let imageName = "";
      if (image) {
        let api = http({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/formdata",
        });
        const formData = new FormData();
        formData.append("image", image);
        const response = await api.post("/image", formData);
        imageName = response.data.path.split("/")[1];
      }

      let api = http({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      });

      await api.post("/todos", {
        title,
        task,
        image: imageName,
      });
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTodo(id) {
    try {
      const api = http({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      await api.delete(`/todos/${id}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="todos-container">
      <form onSubmit={createTodo}>
        <input
          type="text"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="Task"
          required
          onChange={(e) => setTask(e.target.value)}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <input type="submit" value="Create Todo" />
      </form>
      <TodoList todos={todos} handleDelete={deleteTodo} />
    </div>
  );
};

export default Todos;
