import React from 'react'
import { X } from "react-bootstrap-icons";

const RegistrationForm = ({ heading, handleSubmit, toggleModal, email, setEmail, password, setPassword }) => {
  return (
    <div className="todoform">
      <div className="text">
        <h3>{heading}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Add registration form fields here */}
        <div className="text">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </div>
        <div className="text">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <div>
          <div className="cancel" onClick={() => toggleModal()}>
            <X size="40" />
          </div>
          <div className="confirm"> 
            <button type="submit" > Register </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm