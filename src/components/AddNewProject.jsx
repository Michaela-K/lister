import React, { useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Modal from './Modal'
import ProjectForm from './ProjectForm'
import { db } from "../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

const AddNewProject = ({toggleNewProjectModal, newProjectModalState}) => {
  const [projectName, setProjectName] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    if (projectName) {
      const projectsRef = collection(db, 'projects');
      
      const projectQuery = query(projectsRef, where('name', '==', projectName));
      
      getDocs(projectQuery)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {   // if proj name doesn't exist
          console.log("adding project")
          addDoc(projectsRef, {
            name: projectName,
          });
        } else {
          alert('Project name already exists!');
        }
      })
      .catch((error) => {
        console.error('Error checking project existence:', error);
      });

    toggleNewProjectModal(false);
    setProjectName('');
    }
  }

  return (
  <div className='addNewProject'>
    <div className="add-button">
        <span onClick={() => toggleNewProjectModal()}>
            <Plus size="20" />
        </span>
    </div>
    <Modal modalState={newProjectModalState} toggleModal={toggleNewProjectModal}>
        <ProjectForm
            handleSubmit={handleSubmit}
            heading='New project!'
            value={projectName}
            setValue={setProjectName}
            toggleModal={toggleNewProjectModal}
            confirmButtonText='+ Add Project'
        />
    </Modal>
</div>
  )
}

export default AddNewProject 