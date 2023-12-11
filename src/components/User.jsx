import React, { useEffect, useState } from 'react'
import LogInForm from './LogInForm'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import useModal from '../hooks/useModal';
import Modal from './Modal';

const User = () => {
//STATE
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);

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
   // Call the loginUser function with email and password
   loginUser(email, password)
   .then((userCredential) => {
     // Handle successful user creation if needed
     console.log('UserCredential: ', userCredential);
    //  console.log('User successfully ......:', userCredential.user);
   })
   .catch((error) => {
     // Handle error
     console.error('Error creating user:', error.message);
   });
}

const handleLogOut = (e) =>{
  e.preventDefault()
   // Call the loginUser function with email and password
   signOutUser(auth)
   .then((userCredential) => {
     // Handle successful user creation if needed
     console.log('UserCredential: ', userCredential);
    //  console.log('User successfully ......:', userCredential.user);
   })
   .catch((error) => {
     // Handle error
     console.error('Error creating user:', error.message);
   });
}

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged in ", user);
      setIsLoggedIn(true);
      toggleLogInModal()
    } else {
      console.log("Logged out");
      setIsLoggedIn(false);
      setEmail("")
      toggleLogInModal()
    }
  });

  // Cleanup function to unsubscribe when the component is unmounted
  return () => unsubscribe();
}, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className='user'>
      <div className="logo">
        {/* <img alt="logo" /> */}
      </div>
      <div className='info'>
        <p>To Do</p>
      {`Hello ${email}`} <br/>
          <button href="#" onClick={() => toggleLogInModal()}>{ isLoggedIn ? "Sign Out" :" Sign In" } </button>
      </div>
      <Modal modalState={loginModalState} toggleModal={toggleLogInModal}>
        <LogInForm 
          heading={isLoggedIn ? "Are you sure you want to Log Out" : "Log In"} 
          handleSubmit={isLoggedIn ? handleLogOut : handleLogIn}
          toggleModal={isLoggedIn ? null : toggleLogInModal}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoggedIn = {isLoggedIn}
          >
        </LogInForm>
      </Modal>
    </div>
  )
}

export default User