import React, { useContext, useEffect, useState } from 'react'
import LogInForm from './LogInForm'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import useModal from '../hooks/useModal';
import Modal from './Modal';
import { TodoContext, TodoContextProvider } from '../context';

const User = () => {
// CONTEXT
const { user} = useContext(TodoContext)

//STATE
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const {loginModalState, toggleLogInModal} = useModal()

const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

const signOutUser = (auth) => {
  return signOut(auth);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const handleLogIn = (e) =>{
  e.preventDefault()
   loginUser(email, password)
   .then((userCredential) => {
    //  console.log('UserCredential: ', userCredential.user);
     console.log("handleLogin : ", userCredential.user)
   })
   .catch((error) => {
     console.error('Error creating user:', error.message);
   });
}

const handleLogOut = (e) =>{
  e.preventDefault()
   signOutUser(auth)
   .then((userCredential) => {
     console.log('UserCredential: ', userCredential);
   })
   .catch((error) => {
     console.error('Error creating user:', error.message);
   });
}

 return (
    <div className='user'>
      <div className="logo">
        {/* <img alt="logo" /> */}
      </div>
      <div className='info'>
        <p>To Do</p>
      {`Hello ${user.email}`} <br/>
          <button href="#" onClick={() => toggleLogInModal()}>{ user ? "Sign Out" :" Sign In" } </button>
      </div>
      <Modal modalState={loginModalState} toggleModal={toggleLogInModal}>
        <TodoContextProvider user={user}>
          <LogInForm 
            heading={user ? "Are you sure you want to Log Out" : "Log In"} 
            handleSubmit={user ? handleLogOut : handleLogIn}
            toggleModal={toggleLogInModal}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            >
          </LogInForm>
        </TodoContextProvider>
      </Modal>
    </div>
  )
}

export default User