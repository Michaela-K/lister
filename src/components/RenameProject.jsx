import React, { useState } from 'react'
import ProjectForm from './ProjectForm'

const RenameProject = ({id, name, numTodos, setShowModal}) => {
  const [newProjectName, setNewProjectName] = useState(name)
  
  function handleSubmit(e){
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <div>
      Rename Project
      <div className='renameProject'>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading='Edit project name!'
          value={newProjectName}
          setValue={setNewProjectName}
          setShowModal={setShowModal}
          confirmButtonText='Confirm'
        />
      </div>
    </div>
  )
}

export default RenameProject