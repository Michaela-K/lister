import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";

import { TodoContext } from '../context'

const AddNewTodo = ({ toggleTodoModal, todoModalState }) => {
   // CONTEXT
   const { selectedProject } = useContext(TodoContext)
    
   // STATE
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject)

  //useEffect called after render is complete
  useEffect( () => {
    setTodoProject(selectedProject)
}, [selectedProject])

  const projects = [
    { id: 1, name: "personal", numTodos: 0 },
    { id: 2, name: "work", numTodos: 1 },
    { id: 3, name: "other", numTodos: 2 },
  ];

  function handleSubmit(e) {}

  return (
    <div className="addnewtodo">
      <div className="btn">
        <button onClick={() => toggleTodoModal()}>+ New Todo</button>
      </div>
      <Modal modalState={todoModalState} toggleModal={toggleTodoModal}>
        <TodoForm
          toggleModal={toggleTodoModal}
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          heading={"Add new To Do !"}
          projects={projects}
          showButtons={true}
        />
      </Modal>
    </div>
  );
};

export default AddNewTodo;
