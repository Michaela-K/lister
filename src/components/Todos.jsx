import React, { useContext } from 'react';
import Todo from './Todo'
import Next7Days from './Next7Days'
import { TodoContext } from '../context';

const Todos = () => {
  const {selectedProject} = useContext(TodoContext);

  const todos = [
    {
      id: '654sd4',
      text: "Go for a run",
      time: "10:00 AM",
      date: "06/03/2023",
      day: "6",
      checked: false,
      color: "lightpink",
      project: "personal"
    },
    {
      id: '6g39v1',
      text: "Meeting",
      time: "09:00 AM",
      date: "11/19/2023",
      day: "1",
      checked: true,
      color: "lightcoral",
      project: "work"
    }
  ];

  return (
    <div className='todos'>
      <div className='selected-project'>
        {selectedProject}
      </div>
      <div className="to_dos">
        {
          selectedProject === "Next 7 days" ?
          <Next7Days todos={todos} />
          :
          todos.map( todo => 
          <Todo todo={todo} key={todo.id} />    
          )
        }
      </div>
    </div>
  )
}

export default Todos