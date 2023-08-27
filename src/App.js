import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import Cursor from "./components/Cursor";
import { Navbar } from './components/Navbar';

import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { Main } from './pages/Main';
import { Page2 } from './pages/Page2';
import { Page3 } from './pages/Page3';
import { Test } from './pages/test';
import { PageContext } from './components/PageContext';

function App() {
  
  return (
    
        <Router>
          <Navbar/>
          
          <Routes>
              <Route path="/" element={<Main/>}></Route>
              <Route path="/page2" element={<Page2/>}></Route>
              <Route path="/page3" element={<Page3/>}></Route>
          </Routes>
          <Cursor/>
        </Router>
    
      
   

  );
}

export default App;
