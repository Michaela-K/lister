import React, { useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Modal from './Modal'
import ProjectForm from './ProjectForm'

const AddNewProject = ({toggleNewProjectModal, newProjectModalState}) => {
  const [projectName, setProjectName] = useState('')

  function handleSubmit(e){
    e.preventDefault()
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
            toggleNewProjectModal={toggleNewProjectModal}
            confirmButtonText='+ Add Project'
        />
    </Modal>
</div>
  )
}

export default AddNewProject 