import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import TaskList from "./components/TaskList"



export const URL = import.meta.env.VITE_API_URL; // For Vite (use `REACT_APP_*` if using Create React App)


function App() {

  return (
    <>
    <div className="app">
      <div className="task-container">
        <TaskList/>
      </div>
      <ToastContainer />
    </div>
    </>
  )
}

export default App
