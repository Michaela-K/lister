import React from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TodoForm = ({
  handleSubmit,
  heading = false,
  text, setText,
  day, setDay,
  time, setTime,
  todoProject, setTodoProject,
  projects,
  showButtons = false,
  toggleModal = false,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div onSubmit={handleSubmit} className="todoform">
        <form>
          <div className="text">
            {heading && <h3>{heading}</h3>}
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="To do...."
              autoFocus
            />
          </div>
          <div className="remind">
            <Bell />
            <p>Remind Me!</p>
          </div>
        </form>

        <div className="pick-day">
          <div className="title">
            <CalendarDay />
            <p>Choose a day</p>
          </div>
          <DatePicker value={day} onChange={(day) => setDay(day)} />
        </div>

        <div className="pick-time">
          <div className="title">
            <Clock />
            <p>Choose a time</p>
          </div>
          <TimePicker value={time} onChange={(time) => setTime(time)} />
        </div>

        <div className="pick-project">
          <div className="title">
            <Palette />
            <p>Choose a project</p>
          </div>
          <div className="projects">
            {/* <div className="project active">
              personal
            </div>
            <div className="project">
              work
            </div> */}
            {
            projects.length > 0 ?
            projects.map((project) => (
              <div className={`project ${todoProject === project.name ? "active" : ''}`} 
              key={project.id}
              onClick={() => setTodoProject(project.name)}
              >
                {project.name}
              </div>
            ))
            :
            <div style={{color:'#ff0000'}}> Please add a project before proceeding...</div>
          }
          </div>
        </div>
        {showButtons && (
          <div>
            <div className="cancel" onClick={() => toggleModal()}>
              <X size="40" />
            </div>
            <div className="confirm">
              <button> + Add to do</button>
            </div>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default TodoForm;
