import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import Kanban from './pages/Kanban.tsx'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './index.css'
import './App.css'
import NavBar from './components/NavBar.tsx';
import TaskPage from './pages/TaskPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/kanban" element={<Kanban/>}/>
      <Route path="/task/:id" element={<TaskPage/>}/>
    </Routes>
  </BrowserRouter>,
)
