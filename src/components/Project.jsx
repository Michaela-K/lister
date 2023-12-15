import React, { useContext } from "react";
import RenameProject from "./RenameProject";
import Modal from "./Modal";
import { Pencil, XCircle } from "react-bootstrap-icons";
import useModal from '../hooks/useModal'
import { TodoContext } from '../context';
import { collection, deleteDoc, doc, getDocs, query, where } from "@firebase/firestore";
import { db } from "../firebase";
import { useTransition, useSpring, animated } from 'react-spring'

const Project = ({project, toggleEdit}) => {
  //MODAL
  const {toggleEditProjectModal, editProjectModalState} = useModal()
   //CONTEXT
   const {user, defaultProject, selectedProject, setSelectedProject, selectedProjectToEdit,setSelectedProjectToEdit} = useContext(TodoContext);

  const deleteProject = project => {
  if (user.uid !== project.userId) {
    console.error('Permission denied. The user is not the owner of this project.');
    return;
  }

  const projectDocRef = doc(collection(db, 'projects'), project.id); 

  deleteDoc(projectDocRef) 
    .then(() => {
      const todosCollectionRef = collection(db, 'todos');
      const todosQuery = query(todosCollectionRef, where('userId', '==', user.uid),where('projectName', '==', project.name));
      return getDocs(todosQuery);
    })
    .then((querySnapshot) => {
      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      return Promise.all(deletePromises);
    })
    .then(() => {
      if (selectedProject === project.name) {
        setSelectedProject(defaultProject); 
      }
    })
    .catch((error) => {
      console.error('Error deleting project:', error);
    });
  }

    // ANIMATION
    const fadeIn = useSpring({
      from : { marginTop : '-12px', opacity : -10 },
      to : { marginTop : '0px', opacity : 1}
    })
    const btnTransitions = useTransition(toggleEdit, {
        from : { opacity : 0, right : '-20px' },
        enter : { opacity : 1, right : '0px' },
        leave : { opacity : 0, right : '-20px' }
    })

  return (
      <animated.div style={fadeIn} className='project'>
        <div className="name"  onClick={() => setSelectedProject(project.name)}>
          {project.name}
        </div>
        <div className="btns">
          {/* if true, show the delete and edit buttons */}
            { btnTransitions((props, callback) =>  
            callback ?
              <animated.div style={props} className="edit-delete">
                <span className="edit" onClick={() => {setSelectedProject(project.name); setSelectedProjectToEdit(project); toggleEditProjectModal(); }}>
                  <Pencil size="13" />
                </span>
                <span className="delete" onClick={() => deleteProject(project)}>
                  <XCircle size="13" />
                </span>
              </animated.div>
             : 
             project.numOfTodos === 0 ?
               ""
             : 
              <animated.div style={props} className="total-todos">
                {project.numOfTodos}
              </animated.div>
            )
            }
        </div>
        <Modal modalState={editProjectModalState} toggleModal={toggleEditProjectModal}>
          <RenameProject selectedProject={selectedProject} selectedProjectToEdit={selectedProjectToEdit}/>
        </Modal>
      </animated.div>
  );
};

export default Project;





