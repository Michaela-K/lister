import React from 'react'
import Todos from './Todos'
import EditTodo from './EditTodo'

const Main = () => {
  return (
    <div className='main'>
      Main
      <Todos />
      <EditTodo />
    </div>
  )
}

export default Main