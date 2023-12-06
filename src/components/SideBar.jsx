import React from 'react'
import User from './User'
import AddNewTodo from './AddNewTodo'
import Calendar from './Calendar'
import Projects from './Projects'

const SideBar = ({toggleTodoModal, todoModalState, toggleNewProjectModal, newProjectModalState, toggleEditProjectModal, editProjectModalState}) => {
  return (
    <div className='sidebar'>
      <User />
      <AddNewTodo toggleTodoModal={toggleTodoModal} todoModalState={todoModalState}/>
      <Calendar />
      <Projects toggleNewProjectModal={toggleNewProjectModal} newProjectModalState={newProjectModalState} toggleEditProjectModal={toggleEditProjectModal} editProjectModalState={editProjectModalState}/>
    </div>
  )
}

export default SideBar;