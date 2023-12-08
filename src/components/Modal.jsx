import React, {useRef, useState} from 'react'
import { useTransition, useSpring, animated } from 'react-spring'


// used whenever a modal is needed
const Modal = ({children, modalState, toggleModal}) => {

  const modalRef = useRef(); //to create a mutable object that has a property called "current" that will stick to the component
  //its something like querySelector but for React
  //the value of current is whatever you pass into the useRef hook in brackets
  //if you put modalRef below, inside ref -> eg. ref={modalRef} -> then current will refer to the modal element

  const closeModal = (e) => {
    if(e.target === modalRef.current){ //if where you clicked is equal to the modal(the darkened area around the white part of the modal)
      // console.log(e)
      // console.log(modalRef.current)
      toggleModal()
    }
  }

   // ANIMATION
   const modalAnimation = useSpring({
    opacity : modalState ? 1 : 0,
    top : modalState ? '35%' : '0%',
    config : { friction : 15 }
  })

  return (
    modalState && //if false, it wont show
    <div className="modal" ref={modalRef} onClick={(e) => closeModal(e)}>
      <animated.div style={modalAnimation} className="container">
        {children} {/* Putting "children" here makes it display the children you assigned inside of Modal component on another component file eg. AddNewTodo  */}
      </animated.div>
    </div>
  )
}

export default Modal