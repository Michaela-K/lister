import React, { useState, useContext, useEffect } from "react";
import TodoForm from "./TodoForm";
import { TodoContext } from '../context'
import { collection, doc, updateDoc} from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";

const EditTodo = () => {
  // CONTEXT
  const {selectedProject, selectedTodo :todo, projects } = useContext(TodoContext)
  //STATE
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject)

  useEffect(() => {
    if(todo){
      setText(todo.text)
      setDay(moment(todo.date, 'MM/DD/YYYY').toDate());
      setTime(moment(todo.time, 'hh:mm A').toDate());
      setTodoProject(todo.projectName)
    }
  }, [todo])

  useEffect( () => {
    if(todo){
      const docToUpdate = doc(collection(db, "todos"), todo.id)
        updateDoc(docToUpdate,{
          text,
          date : moment(day).format('MM/DD/YYYY'),
          day : moment(day).format('d'),
          time : moment(time).format('hh:mm A'),
          projectName : todoProject
    })
  }
  }, [text, day, time, todoProject])


  function handleSubmit(e) {}

  return (
    <div>
      {todo && (
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
      )}
    </div>
  );
};

export default EditTodo;
