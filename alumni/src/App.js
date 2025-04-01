import {
  Route,
  BrowserRouter,
  Routes,
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Router,
} from "react-router-dom";
import React, { useState } from "react";
import Login from "./Admin/Pages/Auth/Login";

function App() {
  const [auth, setAuth] = useState(sessionStorage.getItem("admin"));
  return (
    <>
      <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}/>
     </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;