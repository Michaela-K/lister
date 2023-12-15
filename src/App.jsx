import './App.css';
import SideBar from './components/SideBar'
import Main from './components/Main'
import useModal from './hooks/useModal';

function App() {


  return (
    <div className="App">
      <SideBar/>
      <Main/>
    </div>
  );
}

export default App;
