import "./Todo.css";
import http from "../http/http";
const origin = import.meta.env.VITE_API;

const Todo = ({ todo, handleDelete, handleUpdateStatus, handleUpdateTodo }) => {
  return (
    <div className="todo">
      {todo.image ? <img src={`${origin}/image/${todo.image}`} alt="" /> : null}
      <div className="overlay"></div>
      <h3>{todo.title}</h3>
      <p>{todo.task}</p>
      <p className="status">{todo.status}</p>
      <div className="button-group">
        {todo.status !== "Completed" ? (
          <button
            className="warning"
            onClick={() => handleUpdateStatus(todo, todo.id)}
          >
            {todo.status === "Not Started"
              ? "Change to Ongoing"
              : "Change to Completed"}
          </button>
        ) : null}
        <button className="info" onClick={() => handleUpdateTodo(todo)}>
          Update
        </button>
        <button className="danger" onClick={() => handleDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
