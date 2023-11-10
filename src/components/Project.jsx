import React, { useState } from "react";
import RenameProject from "./RenameProject";
import Modal from "./Modal";
import { Pencil, XCircle } from "react-bootstrap-icons";

const Project = ({ id, name, numTodos, toggleEdit }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <div className="project">
        <div className="name">
          {name}
        </div>
        <div className="btns">
          {/* if true, show the delete and edit buttons */}
            { toggleEdit ?
              <div className="edit-delete">
                <span className="edit" onClick={() => setShowModal(true)}>
                  <Pencil size="13" />
                </span>
                <span className="delete" >
                  <XCircle size="13" />
                </span>
              </div>
             : 
             numTodos === 0 ?  // Show the number of To do's only if its not zero. If zero return false/empty string else show
               ""
             : 
              <div className="total-todos">
                {numTodos}
              </div>
            }
        </div>
      </div>
    </div>
  );
};

export default Project;
