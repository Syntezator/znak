import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContext1 } from './NavigateContext';


export const PageContext = createContext();

export const PageContextProvider = ({ children }) => {
  const [translate, setTranslate] = useState(0);
  const [translate2, setTranslate2] = useState(-50);
  const [changePage, setChangePage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const pages = ['/', '/page2', '/page3'];
  const [translateNav, setTranslateNav] = useState(0);


  

  const handlePrevClick = () => {
    if (translate < 0) {
      setTranslate(translate + 100);
      setTranslateNav(translate + 100)
      setTranslate2(-50);
      setTimeout(() => {
        setChangePage('prev');
      }, 400); 
    }
  };

  const handleNextClick = () => {
    if (translate > -200) {
      setTranslate(translate - 100);
      setTranslateNav(translate - 100)
      setTranslate2(-50);
      setTimeout(() => {
        setChangePage('next');
      }, 400);
    }
  };

  useEffect(() => {
    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);



  const handleMouseUp = (event) => {
    if (!isDragging) {
      return;
    }

    const targetTagName = event.target.tagName.toLowerCase();
    const allowedTags = ['a', 'input', 'button'];

    if (allowedTags.includes(targetTagName)) {
      return;
    }

    const screenWidth = window.innerWidth;
    const cursorPosition = event.clientX;
    const halfScreenWidth = screenWidth / 2;

    if (cursorPosition < halfScreenWidth) {
   
      handlePrevClick();
    } else {
  
      handleNextClick();
    }
  };
  
  

  return (
    <PageContext.Provider value={{ 
      pages, 
      translate, 
      setTranslate, 
      translate2, 
      setTranslate2, 
      handleMouseUp, 
      translateNav, 
      setTranslateNav, 
      changePage, 
      setChangePage,
    }}>
      {children}
    </PageContext.Provider>
  );
}
