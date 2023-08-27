import React, { useState, useEffect, useRef, useContext, createContext}  from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Slides } from '../components/Slides';
import { PageContext } from '../components/PageContext';
import { PageContext1 } from '../components/NavigateContext';
import { Navbar } from '../components/Navbar';
import Cursor from '../components/Cursor';

export function Page2() {
  const { 
    translate, 
    setTranslate, 
    translate2, 
    translateNav, 
    setTranslateNav, 
    setTranslate2, 
    handleMouseUp, 
    changePage, 
    setChangePage, 
    pages
  } = useContext(PageContext);
  const [currentIndex, setCurrentIndex] = useState(1);
  const navigate = useNavigate();
  const prevTranslateRef = useRef(translateNav);
  
  useEffect(() => {
    if (translateNav !== prevTranslateRef.current) {
      setTranslate(translateNav);
      setTranslate2(-50);
      prevTranslateRef.current = translateNav;
    }
  }, [translateNav]);

  useEffect(() => {
    setTimeout(() => {
      setTranslate2(0);
    }, 200);
  }, []);

  useEffect(() => {   
    if (changePage === 'prev') {
      setChangePage('');    
      navigate(pages[(currentIndex - 1 + pages.length) % pages.length]);
    }
    if (changePage === 'next') {
      setChangePage('');
        navigate(pages[(currentIndex + 1) % pages.length]);
    }
  }, [changePage]);

  const slideStyle = {
    transform: `translateX(${translate}%) translateY(0px) translateZ(${translate2}px)`,
  }; 
  
  return (
    <div className="main">
  
    <div className="wrapper">
      <Helmet>
        <title>Second Page</title>
        <meta name="description" content="This is the main page" />
      </Helmet>
      <Slides slideStyle={slideStyle} handleMouseUp={handleMouseUp} />
      </div>
   
  </div>
  )
}