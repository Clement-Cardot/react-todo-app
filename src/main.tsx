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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/kanban",
    element: <Kanban />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <NavBar/>
    <RouterProvider router={router} />
  </>,
)
