import { AddProject } from "./components/AddProject";
import ProjectsList from "./components/ProjectsList";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="app">
      <AddProject />
      <ProjectsList />
      <ToastContainer />
    </div>
  );
}

export default App;
