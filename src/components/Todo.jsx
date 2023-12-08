import React, { useContext, useState } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";
import { TodoContext } from "../context";
import {
  collection,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { useSpring, useTransition, animated } from "react-spring";

const Todo = ({ todo }) => {
  const [hover, setHover] = useState(false);

  // CONTEXT
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  const deleteTodo = (todo) => {
    const deleteTodoDocRef = doc(collection(db, "todos"), todo.id);

    deleteDoc(deleteTodoDocRef)
      .then(() => {
        console.log("Todo deleted successfully");
        // Additional logic after successful deletion, if needed
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const checkTodo = (todo) => {
    const checkTodoDocRef = doc(collection(db, "todos"), todo.id);

    updateDoc(checkTodoDocRef, {
      checked: !todo.checked,
    })
      .then(() => {
        console.log("Todo updated successfully");
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const repeatNextDay = (todo) => {
    const nextDayDate = moment(todo.date, "MM/DD/YYYY").add(1, "days"); //pass string into JS date obj called moment and use the moment add method

    const repeatedTodo = {
      ...todo, //old todo info -> color, projectName, text, time
      //override the remaining data with new data
      date: nextDayDate.format("MM/DD/YYYY"),
      day: nextDayDate.format("d"),
      checked: false,
    };
    // console.log('1) Repeated Todo ID before delete: ', repeatedTodo.id);
    delete repeatedTodo.id;
    // console.log('1) Repeated Todo ID after delete: ', repeatedTodo.id);

    addDoc(collection(db, "todos"), repeatedTodo)
      .then((data) => {
        // console.log('2) Repeated to do added with new ID', data.id );
      })
      .catch((error) => {
        console.error("Error checking project existence:", error);
      });
  };

  const handleDelete = (todo) => {
    deleteTodo(todo);
    if (selectedTodo === todo) {
      setSelectedTodo(false);
    }
  };

  // ANIMATION
  const fadeIn = useSpring({
    from: { marginTop: "-12px", opacity: 0 },
    to: { marginTop: "0px", opacity: 1 },
  });

  const checkTransitions = useTransition(todo.checked, {
    from: { position: "absolute", transform: "scale(0)" },
    enter: { transform: "scale(1)" },
    leave: { transform: "scale(0)" },
  });

  return (
    <animated.div style={fadeIn} className="todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo" onClick={() => checkTodo(todo)}>
          {checkTransitions((props, checked) =>
            checked ? (
              <animated.span style={props} className="checked">
                <CheckCircleFill color="#bebebe" />
              </animated.span>
            ) : (
              <animated.span style={props} className="unchecked">
                <Circle color={todo.color} />
              </animated.span>
            )
          )}
        </div>
        <div className="text" onClick={() => setSelectedTodo(todo)}>
          <p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.text}
          </p>
          <span>
            {todo.time} - {todo.projectName}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>
        <div className="add-to-next-day" onClick={() => repeatNextDay(todo)}>
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>
        <div className="delete-todo" onClick={() => handleDelete(todo)}>
          {(hover || todo.checked) && (
            <span>
              <Trash />
            </span>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default Todo;
