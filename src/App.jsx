import './App.css';
import SideBar from './components/SideBar'
import Main from './components/Main'
import Todos from './components/Todos'
import EditTodo from './components/EditTodo'

function App() {
  return (
    <div className="App">
      <SideBar/>
      <Main/>
    </div>
  );
}

export default App;
