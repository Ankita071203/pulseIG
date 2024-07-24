import React from 'react';
import Articles from './components/Articles';
import AddArticles from './components/AddArticles';
import './App.css';
import Navbar from './components/Navbar'; // Import the new Navbar component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar /> {/* Place the Navbar component here */}
        <Routes>
          <Route
            path='/register'
            element={
             <Register/>
            }
          />
          <Route path='/signin' element={<Login/>}/>
          <Route
            path='/'
            element={
              <div>
                <div className="main-content">
                  <Articles />
                </div>
                <div className="bottom-form">
                  <AddArticles />
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

