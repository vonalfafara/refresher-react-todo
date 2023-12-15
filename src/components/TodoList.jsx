import "./TodoList.css";
import Todo from "./Todo";

const TodoList = ({
  todos,
  handleDelete,
  handleUpdateStatus,
  handleUpdateTodo,
}) => {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => {
        return (
          <Todo
            key={index}
            todo={todo}
            handleDelete={handleDelete}
            handleUpdateStatus={handleUpdateStatus}
            handleUpdateTodo={handleUpdateTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
