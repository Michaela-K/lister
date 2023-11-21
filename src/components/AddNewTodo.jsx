import React from 'react'
import Modal from './Modal' 
import TodoForm from './TodoForm' 

const AddNewTodo = ({toggleTodoModal, todoModalState}) => {
  return (
    <div className='addnewtodo'>
      <div className="btn">
          <button onClick={() => toggleTodoModal()}>
              + New Todo
          </button>
      </div>
      <Modal modalState={todoModalState} toggleModal={toggleTodoModal}>
         <TodoForm toggleModal={toggleTodoModal}/>
      </Modal>
      
    </div>
  )
}

export default AddNewTodo