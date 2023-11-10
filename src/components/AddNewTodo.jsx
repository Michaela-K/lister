import React, { useState } from 'react'
import Modal from './Modal' 
import TodoForm from './TodoForm' 

const AddNewTodo = () => {
  
  const [showModal, setShowModal] = useState(false)
  

  return (
    <div className='addnewtodo'>
      <div className="btn">
          <button onClick={() => setShowModal(true)}>
              + New Todo
          </button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
         <TodoForm setShowModal={setShowModal}/>
      </Modal>
      
    </div>
  )
}

export default AddNewTodo