import React, { useContext } from "react";
import { X } from "react-bootstrap-icons";
import { TodoContext } from "../context";

const LogInOutForm = ({ handleSubmit, heading = false, toggleModal = false, email, setEmail, password, setPassword }) => {
  // CONTEXT
  const { user } = useContext(TodoContext)
  
  return (
   <div>
      <div className="todoform">
        {" "}
        <form onSubmit={(e) => handleSubmit(e)}>
          { !user ?
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
                <button type="submit" > Log In </button>
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
