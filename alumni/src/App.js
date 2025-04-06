import {Route,BrowserRouter,Routes,Outlet,createBrowserRouter,RouterProvider,Router,} from "react-router-dom";
import React, { useState } from "react";
import Login from "./Admin/Pages/Auth/Login";
import Dashboard from "./Admin/Pages/Dashboard/Dashboard";
import Users from "./Admin/Pages/User/Users";
import Add_users from "./Admin/Pages/User/AddUser";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/adduser" element={<Add_users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
