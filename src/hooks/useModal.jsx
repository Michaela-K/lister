//provide the actions to update the state, causing the component to render.
import React, {useReducer } from "react";

export const ACTIONS = {
  TOGGLE_TODO_MODAL: "TOGGLE_TODO_MODAL",
  TOGGLE_NEW_PROJECT_MODAL: "TOGGLE_NEW_PROJECT_MODAL",
  TOGGLE_EDIT_PROJECT_MODAL: "TOGGLE_EDIT_PROJECT_MODAL",
  TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
  TOGGLE_REGISTER_MODAL: "TOGGLE_REGISTER_MODAL",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TODO_MODAL":
      return {
        ...state,
        todoModalState: !state.todoModalState,
      };
    case "TOGGLE_NEW_PROJECT_MODAL":
      return {
        ...state,
        newProjectModalState: !state.newProjectModalState,
      };
    case "TOGGLE_EDIT_PROJECT_MODAL":
      return {
        ...state,
        editProjectModalState: !state.editProjectModalState,
      };
    case "TOGGLE_LOGIN_MODAL":
      return {
        ...state,
        loginModalState: !state.loginModalState,
     };
    case "TOGGLE_REGISTER_MODAL":
      return {
        ...state,
        registerModalState: !state.registerModalState,
    };
    default:
      return state;
  }
};

export default function useApplicationData() {
  const initialStates = {
    todoModalState: false,
    newProjectModalState: false,
    editProjectModalState: false,
    loginModalState: false,
    registerModalState: false,
  };
  const [state, dispatch] = useReducer(reducer, initialStates);

  const toggleTodoModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_TODO_MODAL });
  };
  const toggleNewProjectModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_NEW_PROJECT_MODAL });
  };
  const toggleEditProjectModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_EDIT_PROJECT_MODAL });
  };
  const toggleLogInModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_LOGIN_MODAL });
  };
  const toggleRegisterModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_REGISTER_MODAL });
  };
  

    
  return {
    toggleTodoModal,
    todoModalState: state.todoModalState,
    toggleNewProjectModal,
    newProjectModalState: state.newProjectModalState,
    toggleEditProjectModal,
    editProjectModalState: state.editProjectModalState,
    toggleLogInModal,
    loginModalState: state.loginModalState,
    toggleRegisterModal,
    registerModalState: state.registerModalState,
  };
}