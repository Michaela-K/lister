import './App.css';
import SideBar from './components/SideBar'
import Main from './components/Main'
import useModal from './hooks/useModal';

function App() {

  const {
    toggleTodoModal, 
    todoModalState, 
    toggleNewProjectModal, 
    newProjectModalState} = useModal()

  return (
    <div className="App">
      <SideBar toggleTodoModal={toggleTodoModal} todoModalState={todoModalState} toggleNewProjectModal={toggleNewProjectModal} newProjectModalState={newProjectModalState}/>
      <Main/>
    </div>
  );
}

export default App;
