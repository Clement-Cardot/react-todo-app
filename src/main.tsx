import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import Kanban from './pages/Kanban.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import './App.css'
import NavBar from './components/NavBar.tsx';
import TaskPage from './pages/TaskPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/kanban",
    element: <Kanban />,
  },
  {
    path: "/task/:id",
    element: <TaskPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <NavBar/>
    <RouterProvider router={router} />
  </>,
)
