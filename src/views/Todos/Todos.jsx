import http from "../../http/http";
import "./Todo.css";
import { useEffect, useState } from "react";
import TodoList from "../../components/TodoList";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [task, setTask] = useState("");
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [taskToUpdateImage, setTaskToUpdateImage] = useState("");
  const [taskToUpdateStatus, setTaskToUpdateStatus] = useState("");
  const [editMode, setEditMode] = useState(false);

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
      setTitle("");
      setTask("");
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateTodoStatus(task, id) {
    try {
      const api = http({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      if (task.status === "Not Started") task.status = "Ongoing";
      else if (task.status === "Ongoing") task.status = "Completed";
      await api.put(`/todos/${id}`, task);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }
  function updateTodo(task) {
    setEditMode(true);
    setTaskToUpdate(task.id);
    setTitle(task.title);
    setTask(task.task);
    setTaskToUpdateImage(task.image);
    setTaskToUpdateStatus(task.status);
  }
  async function handleUpdateTodo(e) {
    e.preventDefault();
    try {
      let imageName = taskToUpdateImage;
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
      console.log({
        title,
        task,
        status: taskToUpdateStatus,
        image: imageName,
      });
      let api = http({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      });

      await api.put(`/todos/${taskToUpdate}`, {
        title,
        task,
        status: taskToUpdateStatus,
        image: imageName,
      });
      setEditMode(false);
      setTitle("");
      setTask("");
      setImage(null);
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
      {editMode ? (
        <form onSubmit={handleUpdateTodo}>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Task"
            required
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input type="submit" value="Update Todo" />
        </form>
      ) : (
        <form onSubmit={createTodo}>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Task"
            required
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input type="submit" value="Create Todo" />
        </form>
      )}

      <TodoList
        todos={todos}
        handleDelete={deleteTodo}
        handleUpdateStatus={updateTodoStatus}
        handleUpdateTodo={updateTodo}
      />
    </div>
  );
};

export default Todos;
