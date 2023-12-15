import React, { useContext, useState } from "react";
import ProjectForm from "./ProjectForm";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import useModal from '../hooks/useModal'
import { TodoContext } from "../context";
import { db } from "../firebase";

const RenameProject = ({selectedProject, selectedProjectToEdit}) => {
  //STATE
  const [newProjectName, setNewProjectName] = useState(selectedProject);
  //MODAL
  const {toggleEditProjectModal} = useModal()
  // CONTEXT
  const { setSelectedProject, user } = useContext(TodoContext);
  const project = selectedProjectToEdit;

  const renameProj = (project, newProjectName) => {
    if(user.uid !== project.userId){
      console.error('Permission denied. The user is not the owner of this project.');
      return;
    }

    const projectsRef = collection(db, "projects");
    const todosRef = collection(db, "todos");

    const { name: oldProjectName } = project; 

    getDocs(query(projectsRef, where('userId', '==', user.uid), where("name", "==", newProjectName)))
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          alert("Project with the same name already exists!");
        } else {
          const projectDocRef = doc(projectsRef, project.id);
          updateDoc(projectDocRef, {
            name: newProjectName,
          })
            .then(() => {
              getDocs(
                query(todosRef, where('userId', '==', user.uid), where("projectName", "==", oldProjectName))
              )
                .then((querySnapshot) => {
                  const updatePromises = querySnapshot.docs.map(
                    (
                      doc 
                    ) =>
                      updateDoc(doc.ref, {
                        projectName: newProjectName,
                      })
                  );

                  return Promise.all(updatePromises);
                })
                .then(() => {
                  if (selectedProject === oldProjectName) {
                    setSelectedProject(newProjectName);
                  }
                });
            })
            .catch((error) => {
              console.error("Error updating project:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking existing project:", error);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    renameProj(project, newProjectName);
    toggleEditProjectModal(false);
  }

  return (
    <div>
      Rename Project
      <div className="renameProject">
        <ProjectForm
          handleSubmit={handleSubmit}
          heading="Edit project name!"
          value={newProjectName}
          setValue={setNewProjectName}
          toggleModal={toggleEditProjectModal}
          confirmButtonText="Confirm"
        />
      </div>
    </div>
  );
};

export default RenameProject;
