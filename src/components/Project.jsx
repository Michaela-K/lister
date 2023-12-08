import React, { useContext } from "react";
import RenameProject from "./RenameProject";
import Modal from "./Modal";
import { Pencil, XCircle } from "react-bootstrap-icons";
import { TodoContext } from '../context';
import { collection, deleteDoc, doc, getDocs, query, where } from "@firebase/firestore";
import { db } from "../firebase";
import { useTransition, useSpring, animated } from 'react-spring'

const Project = ({project, toggleEdit, toggleEditProjectModal, editProjectModalState}) => {
   //CONTEXT
   const {defaultProject, selectedProject, setSelectedProject} = useContext(TodoContext);

  const deleteProject = project => {
    //Create a reference to the specific project document to be deleted
    const projectDocRef = doc(collection(db, 'projects'), project.id); 

    // This line calls the deleteDoc function to delete the project. It returns a promise
    deleteDoc(projectDocRef) 
      .then(() => {
        //create reference to the 'todos' collection
        const todosCollectionRef = collection(db, 'todos');
        //a query that filters todos based on the projectName field matching the name of the project being deleted.
        const todosQuery = query(todosCollectionRef, where('projectName', '==', project.name));
        return getDocs(todosQuery);
      }) //getDocs asynchronously retrieves docs that match the query.
      //The then block is used to handle the success case and receives a querySnapshot containing the documents.
      .then((querySnapshot) => {
        //This section creates an array of promises (deletePromises) by mapping over the documents in the querySnapshot and applying the deleteDoc function to each document's reference (doc.ref). 
        //The array of promises is then passed to Promise.all to wait for all deletions to complete.
        //MORE NOTES BELOW
        const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
        return Promise.all(deletePromises);
      })
      .then(() => {
        // Check and update selectedProject
        if (selectedProject === project.name) {
          setSelectedProject(defaultProject);  //switch back to "Today"
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
    // <div>
      <animated.div style={fadeIn} className='project'>
        <div className="name" onClick={() => setSelectedProject(project.name)}>
          {project.name}
        </div>
        <div className="btns">
          {/* if true, show the delete and edit buttons */}
            { btnTransitions((props, callback) =>  
            callback ?
              <animated.div style={props} className="edit-delete">
                <span className="edit" onClick={() => {toggleEditProjectModal(); setSelectedProject(project.name); console.log("Project name and ",project.name, selectedProject);}}>
                  <Pencil size="13" />
                </span>
                <span className="delete" onClick={() => deleteProject(project)}>
                  <XCircle size="13" />
                </span>
              </animated.div>
             : 
             project.numOfTodos === 0 ?  // Show the number of To do's only if its not zero. If zero return false/empty string else show
               ""
             : 
              <animated.div style={props} className="total-todos">
                {project.numOfTodos}
              </animated.div>
            )
            }
        </div>
        <Modal modalState={editProjectModalState} toggleModal={toggleEditProjectModal}>
          <RenameProject toggleEditProjectModal={toggleEditProjectModal} project={project} selectedProject={selectedProject} />
        </Modal>
      </animated.div>
    // </div>
  );
};

export default Project;




// The reason for creating an array of promises and then using Promise.all is to ensure that all the deletions are performed concurrently. 

// 1. Concurrency and Parallelism:
// JavaScript executes code in a single-threaded event loop. However, when you're dealing with asynchronous operations like deleting multiple documents, you can take advantage of concurrency by initiating those operations simultaneously.
// Mapping over the documents and using deleteDoc(doc.ref) returns an array of promises. Without Promise.all, each promise would be resolved sequentially, meaning that the second deletion would only start once the first one is completed.

// 2.Efficiency:
// By using Promise.all, you're allowing the JavaScript runtime to initiate all the delete operations at once, and they can proceed concurrently in the background. This can be significantly more efficient, especially when dealing with a larger number of documents.

// 3. Faster Execution:
// If you use return querySnapshot.docs.map((doc) => deleteDoc(doc.ref)); directly, it would return an array of promises, but they wouldn't start executing until the previous one is resolved. This could result in a longer overall execution time.

// 4. Concurrency Control:
// If you're dealing with many documents, initiating them concurrently helps in better control over the execution flow. If one deletion fails (for example, due to network issues or permissions), the other deletions can still proceed, and you can handle the failure appropriately.
// Here's a slightly more detailed breakdown of the Promise.all approach:

// SUMMARY
// querySnapshot.docs.map((doc) => deleteDoc(doc.ref)) creates an array of promises where each promise represents the deletion of an individual document.
// Promise.all(deletePromises) waits for all promises in the array to either resolve (all deletions are successful) or reject (at least one deletion fails). The overall promise returned by Promise.all resolves when all individual promises are resolved or rejects if any of them reject.
// In summary, using Promise.all is a powerful and efficient way to handle concurrency when dealing with multiple asynchronous operations like document deletions.





