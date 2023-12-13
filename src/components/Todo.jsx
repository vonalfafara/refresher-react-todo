import "./Todo.css";
import http from "../http/http";
const origin = import.meta.env.VITE_API;

const Todo = ({ todo, handleDelete }) => {
  return (
    <div className="todo">
      {todo.image ? <img src={`${origin}/image/${todo.image}`} alt="" /> : null}
      <div className="overlay"></div>
      <h3>{todo.title}</h3>
      <p>{todo.task}</p>
      <p className="status">{todo.status}</p>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default Todo;
