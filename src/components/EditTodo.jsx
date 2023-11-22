import React, { useState } from "react";
import TodoForm from "./TodoForm";

const EditTodo = ({todo}) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());

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
              projects={projects}
            />
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default EditTodo;
