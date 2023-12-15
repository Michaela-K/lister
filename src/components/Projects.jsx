import React, {useContext, useState} from 'react'
import Project from "./Project";
import AddNewProject from "./AddNewProject";
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons';
import { TodoContext } from '../context';
import { useSpring, animated } from 'react-spring'

const Projects = () => {

  const [showMenu, setShowMenu] = useState(true);
  const [toggleEdit, setToggleEdit] = useState(false)
  const pencilColor = toggleEdit ? "#1EC94C" : "#000000"

  const {projects} = useContext(TodoContext)


   // ANIMATION
  const spin = useSpring({
    transform : showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
    config : { friction : 30 }
  })

  const menuAnimation = useSpring({
      display : showMenu ? 'block' : 'none',
      lineHeight : showMenu ? 1.2 : 0
  })
  
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
            <AddNewProject />
            <animated.span
              className="arrow"
              onClick={() => setShowMenu(!showMenu)}
              style={spin}
            >
            <span className='arrow'>
              <CaretUp size="20" />
            </span>
            </animated.span>
          </div>
        </div>
        <animated.div style={menuAnimation} className="items">
        <div className="items">
          {projects.map((project) => {
            return (
              <Project key={project.id} toggleEdit={toggleEdit} project={project} />
            );
          })}
        </div>
        </animated.div>
      </div>
    </div>
  );
};

export default Projects;
