import React from "react";

const ProjectForm = ({handleSubmit, heading, value, setValue, toggleModal, confirmButtonText}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="projectForm">
      <h3>{heading}</h3>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="project name..."
        autoFocus
      />
      <button className="cancel" type="button"
        onClick={() => toggleModal()} >
        Cancel
      </button>
      <button type="submit" className="confirm" >{confirmButtonText}</button>
    </form>
  );
};

export default ProjectForm;
