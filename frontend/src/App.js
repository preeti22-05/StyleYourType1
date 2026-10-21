import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/home';
import Login from './component/login';
import SignUp from './component/signup';
import Profile from './component/AuthTest';
import ForgotPassword from './component/ForgetPassword';
import ResetPassword from './component/ResetPassword';
import MeasurementForm from './component/MeasurementForm';
import EventSelection from './component/EventSelection';
import Recommendations from './component/Recommendations';
// import BodyType from './component/bodytype';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons
import 'primeflex/primeflex.css'; // Flexbox utilities


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/measurement-form" element={<MeasurementForm />} />
        <Route path="/event-selection" element={<EventSelection />} />
        <Route path="/recommendations" element={<Recommendations />} />
        {/* <Route 
          path="/body-type" 
          element={
            <PrivateRoute>
              <BodyType />
            </PrivateRoute>
          } 
        /> */}
        {/* Add more routes as needed */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;