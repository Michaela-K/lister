import React, { useContext } from 'react';
import Todo from './Todo'
import Next7Days from './Next7Days'
import { TodoContext } from '../context';

const Todos = () => {
  const {user, todos, selectedProject} = useContext(TodoContext);

  return (
    <div className='todos'>
      {user? 
      <>
      <div className='selected-project'>
        {selectedProject}
      </div>
      <div className="to_dos">
        {
          selectedProject === "Next 7 Days" ?
          <Next7Days todos={todos} />
          :
          todos.map( todo => 
          <Todo todo={todo} key={todo.id} />    
          )
        }
      </div>
      </>
       :
       " Sign In to Continue "
      }
    </div>
  )
}

export default Todos