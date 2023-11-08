import React from 'react'
import User from './User'
import AddNewTodo from './AddNewTodo'
import Calendar from './Calendar'
import AddNewProject from './AddNewProject'
import Projects from './Projects'

const SideBar = () => {
  return (
    <div className='sidebar'>
      SideBar
      <User />
      <AddNewTodo />
      <Calendar />
      <AddNewProject/>
      <Projects />
    </div>
  )
}

export default SideBar