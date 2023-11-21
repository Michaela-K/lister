import React, {useContext, useState} from 'react'
import Project from "./Project";
import AddNewProject from "./AddNewProject";
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons';

const Projects = ({toggleNewProjectModal, newProjectModalState}) => {

  const [showMenu, setShowMenu] = useState(true);
  const [toggleEdit, setToggleEdit] = useState(false)
  const pencilColor = toggleEdit ? "#1EC94C" : "#000000"

  const projects =[
    {id: 1, name: "personal", numTodos: 0},
    {id: 2, name: "work", numTodos: 1},
    {id: 3, name: "other", numTodos: 2},
  ]
  
  return (
    <div>
      <div className="projects">
        <div className="header">
          <div className="title">
            <Palette size="18" />
            <p>Projects</p>
          </div>
          <div className="btns">
            {showMenu && projects.length > 0 && (
              <span className="edit" onClick={() => setToggleEdit((toggleEdit) => !toggleEdit)}>
                <PencilFill size="15" color={pencilColor} />
              </span>
            )}
            <AddNewProject  toggleNewProjectModal={toggleNewProjectModal} newProjectModalState={newProjectModalState}/>
            {/* <animated.span
              className="arrow"
              onClick={() => setShowMenu(!showMenu)}
              style={spin}
            > */}
            <span className='arrow'>
              <CaretUp size="20" />
            </span>
            {/* </animated.span> */}
          </div>
        </div>
        {/* <animated.div style={menuAnimation} className="items"> */}
        <div className="items">
          {projects.map((project) => (
            <Project id={project.id} name={project.name} numTodos={project.numTodos} key={project.id} toggleEdit={toggleEdit} />
          ))}
        </div>
        {/* </animated.div> */}
      </div>
      Projects List
      <Project toggleNewProjectModal={toggleNewProjectModal} newProjectModalState={newProjectModalState}/>
    </div>
  );
};

export default Projects;
