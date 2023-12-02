import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import {calendarItems} from '../constants'
import { db } from "../firebase";
import { addDoc, collection, query } from "firebase/firestore";
import moment from "moment";
import randomcolor from "randomcolor";

const AddNewTodo = ({ toggleTodoModal, todoModalState }) => {
  // CONTEXT
  const { projects, selectedProject } = useContext(TodoContext);

  // STATE
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject);

  function handleSubmit(e) {
    e.preventDefault();
    if (text && !calendarItems.includes(todoProject)) {
      console.log("adding todo")
      //if there is text and the project ! = next7days, today etc ....
      addDoc(collection(db, "todos"), {
        text: text,
        date: moment(day).format("MM/DD/YYYY"),
        day: moment(day).format("d"),
        time: moment(time).format("hh:mm A"),
        checked: false,
        color: randomcolor({ luminosity: "dark" }),
        projectName: todoProject,
      });
      //reset
      toggleTodoModal(false);
      setText("");
      setDay(new Date());
      setTime(new Date());
    }
  }

  //useEffect called after render is complete
  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className="addnewtodo">
      <div className="btn">
        <button onClick={() => toggleTodoModal()}>+ New Todo</button>
      </div>
      <Modal modalState={todoModalState} toggleModal={toggleTodoModal}>
        <TodoForm
          handleSubmit ={handleSubmit}
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
