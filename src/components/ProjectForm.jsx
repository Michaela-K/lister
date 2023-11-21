import React from "react";

const ProjectForm = ({handleSubmit, heading, value, setValue, toggleNewProjectModal, confirmButtonText}) => {
  return (
    <form onSubmit={handleSubmit} className="projectForm">
      <h3>{heading}</h3>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="project name..."
        autoFocus
      />
      <button
        className="cancel"
        role="button" // this stops the button from submitting
        onClick={() => toggleNewProjectModal()}
      >
        cancel
      </button>
      <button className="confirm">{confirmButtonText}</button>
    </form>
  );
};

export default ProjectForm;
