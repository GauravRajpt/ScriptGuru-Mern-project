
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import { Children, useEffect } from 'react';
import { CreateNote } from './Components/CreateNote';
import AllNotes from './Components/AllNotes';
import socket from './socket';

function App() {

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log('socket is connected:', socket.id )
    })
    socket.emit("updateNotes","hiiiiiiiiiii");
    socket.on("updateNotes",(msg)=>{
      console.log('working')
      console.log(msg)
    })
    socket.on("disconnect",()=>{
      console.log(`${socket.id} is disconnect`)
    })
    return ()=>{
      socket.off("connect");
      socket.off("updateNotes");
      socket.off("disconnect");
    }
  },[socket])
 
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
