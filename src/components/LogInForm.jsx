import React from "react";
import { X } from "react-bootstrap-icons";

const LogInOutForm = ({ handleSubmit, heading = false, toggleModal = false, email, setEmail, password, setPassword, isLoggedIn }) => {
  return (
   <div>
      <div className="todoform">
        {" "}
        <form onSubmit={(e) => handleSubmit(e)}>
          { !isLoggedIn ?
            (
            <>
              <div className="text">
              {heading && <h3>{heading}</h3>}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoFocus
                  />
            </div>
            <div className="text">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  autoFocus
                  />
            </div>
            <div>
              <div className="cancel" onClick={() => toggleModal()}>
                <X size="40" />
              </div>
              <div className="confirm">
                <button type="submit" > Add New User</button>
              </div>
            </div>
          </>
          )

          :

         ( 
          <>
          <div className="text">
              {heading && <h3>{heading}</h3>} 
            </div>
          
              <div className="cancel" onClick={() => toggleModal()}>
                <X size="40" />
              </div>
              <div className="confirm">
                <button type="submit" > Log Out</button>
              </div>
          </>
          )
        }
        </form>
      </div>
    </div>
  );
};

export default LogInOutForm;
