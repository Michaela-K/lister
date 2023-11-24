import React, { useState, useContext } from "react";
import TodoForm from "./TodoForm";
import { TodoContext } from '../context'

const EditTodo = ({todo}) => {
  // CONTEXT
  const { selectedProject } = useContext(TodoContext)

  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject)

  const projects = [
    { id: 1, name: "personal", numTodos: 0 },
    { id: 2, name: "work", numTodos: 1 },
    { id: 3, name: "other", numTodos: 2 },
  ];

  function handleSubmit(e) {}

  return (
    <div>
      {/* {todo && ( */}
        <div className="editTodo">
          <div className="header">Edit Todo</div>
          <div className="container">
            <TodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              day={day}
              setDay={setDay}
              time={time}
              setTime={setTime}
              todoProject={todoProject}
              setTodoProject={setTodoProject}
              projects={projects}
            />
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default EditTodo;
