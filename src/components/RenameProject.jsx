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
import { TodoContext } from "../context";
import { db } from "../firebase";

const RenameProject = ({toggleEditProjectModal, project, selectedProject}) => {
  const [newProjectName, setNewProjectName] = useState(selectedProject);
  
  // CONTEXT
  const { setSelectedProject } = useContext(TodoContext);

  const renameProj = (project, newProjectName) => {
    const projectsRef = collection(db, "projects");
    const todosRef = collection(db, "todos");

    const { name: oldProjectName } = project; //Destructures the name property from the project object and assigns it to oldProjectName

    //check if a project with the new name already exists in the 'projects' collection.
    getDocs(query(projectsRef, where("name", "==", newProjectName))) //Executes the query and returns a promise that resolves to a querySnapshot.
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          //if true then a project with the same name does exist
          alert("Project with the same name already exists!");
        } else {
          const projectDocRef = doc(projectsRef, project.id); //If no existing project is found, it creates a reference to the specific project document to be updated using doc

          updateDoc(projectDocRef, {
            name: newProjectName,
          })
            .then(() => {
              getDocs(
                query(todosRef, where("projectName", "==", oldProjectName))
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
