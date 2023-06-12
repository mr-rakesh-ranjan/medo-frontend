import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from "reactstrap";

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";


import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Login from './components/login/Login';
import CustomerDashboard from './components/customers/CustomerDashboard';
import PrivateRoute from './auth/PrivateRoute';
import ProfileInfo from './components/customers/ProfileInfo';
import Abouts from './components/pages/Abouts';
import MyOrders from './components/customers/MyOrders';
import NavBar from './components/layout/NavBar';
import Signup from './components/login/Signup';

function App() {
  return (
    <Router>
      <Container className="App">
        <NavBar />
        <Routes>

        {/* public routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<Abouts />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />

          {/* private Route */}
          <Route path="/customer" element={<PrivateRoute />}>
            <Route path='dashboard' element={<CustomerDashboard />} />
            <Route path='profile-info' element={<ProfileInfo />} />
            <Route path='order' element={<MyOrders />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
