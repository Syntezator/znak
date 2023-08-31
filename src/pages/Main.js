import React, { useState, useEffect, useRef, useContext, createContext}  from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Slides } from '../components/Slides';
import { PageContext } from '../components/PageContext';
import { PageContext1 } from '../components/NavigateContext';
import { Navbar } from '../components/Navbar';
import Cursor from '../components/Cursor';

export const Main = () => {
  const pageState = useContext(PageContext);

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevTranslateRef = useRef(pageState.translateNav);
  
  useEffect(() => {
    if (pageState.translateNav !== prevTranslateRef.current) {
      pageState.setTranslate(pageState.translateNav);
      pageState.setTranslate2(-50);
      prevTranslateRef.current = pageState.translateNav;
    }
  }, [pageState.translateNav]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      pageState.setTranslate2(0);
    }, 200);
    return () => clearTimeout(timerId);
  }, []);
  
  useEffect(() => {
    if (pageState.changePage === 'prev') {
      pageState.setChangePage('');
      setCurrentIndex((prevIndex) => (prevIndex - 1 + pageState.pages.length) % pageState.pages.length);
      navigate(pageState.pages[(currentIndex - 1 + pageState.pages.length) % pageState.pages.length]);
    }
    if (pageState.changePage === 'next') {
      pageState.setChangePage('');
      setCurrentIndex((prevIndex) => (prevIndex - 1 + pageState.pages.length) % pageState.pages.length);
        navigate(pageState.pages[(currentIndex + 1) % pageState.pages.length]);
    }
  }, [pageState.changePage]);

  const slideStyle = {
    transform: `translateX(${pageState.translate}%) translateY(0px) translateZ(${pageState.translate2}px)`,
  }; 

  return (
    
      <div className="wrapper">
        <Helmet>
          <title>Main Page</title>
          <meta name="description" content="This is the main page" />
        </Helmet>
        <Slides slideStyle={slideStyle} handleMouseUp={pageState.handleMouseUp} />
        </div>
   
  )
}