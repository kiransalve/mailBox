import React from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EmailList from "./components/EmailList";
import Componse from "./components/Componse";
import EmailDetail from "./components/EmailDetail";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { Col, Row } from "react-bootstrap";

function App() {
  const isOpen = useSelector((state) => state.mail.isOpen);
  const user = useSelector((state) => state.user.email);

  return (
    <BrowserRouter>
      {user && <Header />}

      <Row>
        <Col sm={2}>{user && <Sidebar />}</Col>

          <Routes>
            {!user && <Route path="/" element={<Login />} />}
            {!user && <Route path="/signup" element={<Signup />} />}
            
        <Col sm={10}>

            {user && <Route path="/" element={<EmailList />} />}

            {user && <Route path="/mail" element={<EmailDetail />} />}

          {isOpen && <Componse />}
        </Col>
          </Routes>
      </Row>
    </BrowserRouter>
  );
}

export default App;