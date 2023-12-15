import React, { useContext, useEffect, useRef } from 'react'
import User from './User'
import AddNewTodo from './AddNewTodo'
import Calendar from './Calendar'
import Projects from './Projects'
import { TodoContext } from '../context'

const SideBar = () => {
   // REF
   const sidebarRef = useRef()

   // CONTEXT
   const { user, setSelectedTodo } = useContext(TodoContext)

   // DOCUMENT CLICK LISTENER
   useEffect(() => {
       document.addEventListener('click', handleClick)
       
       return () => document.removeEventListener('click', handleClick)  //removes the listener to cleanup after it unmounts
   }, [])
   
   // HANDLE CLICK
   const handleClick = e => {
       if( e.target === sidebarRef.current || sidebarRef.current.contains(e.target)){
        //contains - checks to see if an element is a decendent of another element
           setSelectedTodo(false)
       }
   }

  return (
    <div className='sidebar' ref={sidebarRef}>
      <User />
      {user && (
        <>
          <AddNewTodo />
          <Calendar />
          <Projects />
        </>
      )}
      </div>
  )
}

export default SideBar;