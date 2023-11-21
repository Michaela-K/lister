//provide the actions to update the state, causing the component to render.
import React, {useReducer } from "react";

export const ACTIONS = {
  TOGGLE_TODO_MODAL: "TOGGLE_TODO_MODAL",
  TOGGLE_NEW_PROJECT_MODAL: "TOGGLE_NEW_PROJECT_MODAL",
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
    default:
      return state;
  }
};

export default function useApplicationData() {
  const initialStates = {
    todoModalState: false,
    newProjectModalState: false
  };
  const [state, dispatch] = useReducer(reducer, initialStates);

  const toggleTodoModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_TODO_MODAL });
  };
  const toggleNewProjectModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_NEW_PROJECT_MODAL });
  };

    
  return {
    toggleTodoModal,
    todoModalState: state.todoModalState,
    toggleNewProjectModal,
    newProjectModalState: state.newProjectModalState
  };
}