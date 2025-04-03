import {Route,BrowserRouter,Routes,Outlet,createBrowserRouter,RouterProvider,Router,} from "react-router-dom";
import React, { useState } from "react";
import Login from "./Admin/Pages/Auth/Login";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
