import React, {useRef, useState} from 'react'
// import { useSpring, animated } from 'react-spring'
import TodoForm from './TodoForm';


// used whenever a modal is needed
const Modal = ({showModal, setShowModal}) => {

  const modalRef = useRef(); //to create a mutable object that has a property called "current" that will stick to the component
  //the value of current is whatever you pass into the useRef hook in brackets
  //if you put modalRef below inside ref -> ref={modalRef} -> then current will refer to the modal element

  const closeModal = (e) => {
    if(e.target === modalRef.current){ //if where we clicked is equal to the modal
        setShowModal(false)
    }
  }

  return (
    showModal && //if false, it wont show
    <div className="modal" ref={modalRef} onClick={closeModal}>
      <div className="container">
        {/* <button onClick={() => setShowModal(false)}>
          XYZ
        </button> */}
        <TodoForm setShowModal={setShowModal}/>
      </div>
    </div>
  )
}

export default Modal