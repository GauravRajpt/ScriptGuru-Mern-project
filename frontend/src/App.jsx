
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import { Children } from 'react';
import { CreateNote } from './Components/CreateNote';
import AllNotes from './Components/AllNotes';

function App() {
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path:"",
        element:<AllNotes/>
      },
      {
        path: "create",
        element: <CreateNote />,
      },
      {
        path:"edit/:id",
        element: <CreateNote />,
      }
    ],
  },
]);

  return (
  <RouterProvider router={router}/>
  )
}

export default App
