import React, { useContext, useState } from 'react'
import LogInForm from './LogInForm'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import useModal from '../hooks/useModal';
import Modal from './Modal';
import { TodoContext } from '../context';
import RegistrationForm from './RegistrationForm';
import logo from "../images/logo.png"

const User = () => {
// CONTEXT
const { user} = useContext(TodoContext)

//STATE
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const {loginModalState, toggleLogInModal, registerModalState, toggleRegisterModal} = useModal()

const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

const signOutUser = (auth) => {
  return signOut(auth);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const handleRegistration = (e) => {
  e.preventDefault();
  createUser(email, password)
    .then((userCredential) => {
      console.log('Registration successful:', userCredential.user);
      console.log('UserCredential: ', userCredential.user);
    })
    .catch((error) => {
      console.error('Error creating user:', error.message);
    });
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
  <div className="user">
    <div className="logo"><img alt="logo" src={logo} /></div>
    <div className="info">
    <p>To Do</p>
    <p> {user && user.email} </p>
        {user ? (
          <button onClick={handleLogOut}>Sign Out</button>
        ) : (
          <>
            <button onClick={toggleLogInModal}>Sign In</button>
            <button onClick={toggleRegisterModal}>Register</button>
          </>
        )}
    </div>
    <Modal modalState={loginModalState} toggleModal={toggleLogInModal}>
      <LogInForm
        heading={user ? 'Are you sure you want to Log Out' : 'Log In'}
        handleSubmit={handleLogIn}
        toggleModal={toggleLogInModal}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </Modal>
    <Modal modalState={registerModalState} toggleModal={toggleRegisterModal}>
      <RegistrationForm
        heading={'Register'}
        handleSubmit={handleRegistration}
        toggleModal={toggleRegisterModal}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </Modal>
  </div>
);
};

export default User