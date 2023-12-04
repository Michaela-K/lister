import React, { useContext, useState } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";
import { TodoContext } from "../context";
import { collection, deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";

const Todo = ({ todo }) => {
  const [hover, setHover] = useState(false)

   // CONTEXT
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext)

  const deleteTodo = todo => {
    const deleteTodoDocRef = doc(collection(db, 'todos'), todo.id);

    deleteDoc(deleteTodoDocRef)
      .then(() => {
        console.log('Todo deleted successfully');
        // Additional logic after successful deletion, if needed
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
          
  }

  const handleDelete = (todo) => {
    deleteTodo(todo)
    if(selectedTodo === todo){ 
        setSelectedTodo(false)
    }
  }

  return (
    <div className="todo">
      <div className="todo-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
        <div className="check-todo">
          {todo.checked ? (
            <span className="checked">
              <CheckCircleFill color="#bebebe" />
            </span>
          ) : (
            <span className="unchecked">
              <Circle color={todo.color} />
            </span>
          )}
        </div>
        <div className="text">
          <p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.text}
          </p>
          <span>
            {todo.time} - {todo.projectName}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>
        <div className="add-to-next-day">
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>
        <div className="delete-todo" onClick={ () => handleDelete(todo)}>
          {(hover || todo.checked) && (
            <span>
              <Trash />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
