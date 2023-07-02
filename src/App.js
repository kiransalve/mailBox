import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import MailBox from "./components/MailBox/MailBox";
import { useSelector } from "react-redux";

function App() {
  const userEmail = useSelector((state) => state.user.email);
  console.log(userEmail);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path="/signup" />

          <Route element={<Login />} path="*" />
          {userEmail ? (
            <Route element={<MailBox />} path="/mailbox" />
          ) : (
            <Route element={<Login />} path="/" />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
