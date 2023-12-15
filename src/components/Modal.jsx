import React, {useRef} from 'react'
import {useSpring, animated } from 'react-spring'


const Modal = ({children, modalState, toggleModal}) => {

  const modalRef = useRef();

  const closeModal = (e) => {
    if(e.target === modalRef.current){ 
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
    modalState &&
    <div className="modal" ref={modalRef} onClick={(e) => closeModal(e)}>
      <animated.div style={modalAnimation} className="container">
        {children}
      </animated.div>
    </div>
  )
}

export default Modal