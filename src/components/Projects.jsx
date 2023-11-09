import React from 'react'
import Project from './Project'
import AddNewProject from './AddNewProject'
import RenameProject from './RenameProject'

const Projects = () => {
  return (
    <div>
      Projects
      <Project/>
      <AddNewProject/>
      <RenameProject/>
    </div>
  )
}

export default Projects