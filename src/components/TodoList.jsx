import "./TodoList.css";
import Todo from "./Todo";

const TodoList = ({ todos, handleDelete }) => {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => {
        return <Todo key={index} todo={todo} handleDelete={handleDelete} />;
      })}
    </div>
  );
};

export default TodoList;
