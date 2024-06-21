// Define the structure of a todo item
interface Todo {
  id: number;
  title: string;
}

// Use the Todo type for the component's props
interface TodoItemProps {
  todo: Todo;
}

import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

// Apply the TodoItemProps interface to the component function
const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <li key={todo.id} className="list-group-item">
      <button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"> Delete </button>
      <button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"> Edit </button>
      {todo.title}
    </li>
  );
}

export default TodoItem;
