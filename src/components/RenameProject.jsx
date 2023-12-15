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
  const [newProjectName, setNewProjectName] = useState(selectedProject); //the default selectedProject is "today", it gets changed in Project.jsx when user clicks on edit button
  
  const {toggleEditProjectModal} = useModal()
  // CONTEXT
  const { setSelectedProject, user } = useContext(TodoContext);
  console.log("selectedProject :", selectedProject)
  console.log("selectedProjectToEdit :", selectedProjectToEdit)
  const project = selectedProjectToEdit;
  console.log("project", project)

  const renameProj = (project, newProjectName) => {
    if(user.uid !== project.userId){
      console.log(user.uid, project)
      console.error('Permission denied. The user is not the owner of this project.');
      return;
    }

    const projectsRef = collection(db, "projects");
    const todosRef = collection(db, "todos");

    const { name: oldProjectName } = project; //Destructures the name property from the project object and assigns it to oldProjectName

    console.log("newProjectName : ", newProjectName, "oldProjectName :", oldProjectName)

    //check if a project with the new name already exists in the 'projects' collection.
    getDocs(query(projectsRef, where('userId', '==', user.uid), where("name", "==", newProjectName))) //Executes the query and returns a promise that resolves to a querySnapshot.
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          //if true then a project with the same name does exist
          alert("Project with the same name already exists!");
        } else {
          const projectDocRef = doc(projectsRef, project.id); //If no existing project is found, it creates a reference to the specific project document to be updated using doc
          console.log("Project updated at this ID", project.id)
          updateDoc(projectDocRef, {
            name: newProjectName,
          })
            .then(() => {
              getDocs(
                query(todosRef, where('userId', '==', user.uid), where("projectName", "==", oldProjectName))
              ) //query to find todos associated with the old project name in the 'todos' collection. getDocs: Executes the query and returns a promise that resolves to a querySnapshot
                .then((querySnapshot) => {
                  const updatePromises = querySnapshot.docs.map(
                    (
                      doc //Map over the todos and creates an array of promises (updatePromises) to update each todo's 'projectName' field to the new name.
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
