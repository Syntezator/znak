import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Main } from './Main';
import { Page2 } from './Page2';
import { Page3 } from './Page3';

export const Test = () => {
  const [translate, setTranslate] = useState(0);
  const [translate2, setTranslate2] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const pages = ['/', '/page2', '/page3'];

  const saveSlideStyleState = () => {
    const slideStyleState = { translate, translate2 };
    localStorage.setItem('slideStyleState', JSON.stringify(slideStyleState));
  };

  const loadSlideStyleState = () => {
    const slideStyleState = localStorage.getItem('slideStyleState');
    if (slideStyleState) {
      const { translate, translate2 } = JSON.parse(slideStyleState);
      setTranslate(translate);
      setTranslate2(translate2);
    }
  };

  const handlePrevClick = () => {
    if (translate < 0) {
      setTranslate(translate + 100);
      setTranslate2(translate2 - 50);
      setTimeout(() => {
        setTranslate2(0);
      }, 400);

      setCurrentIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
      navigate(pages[(currentIndex - 1 + pages.length) % pages.length]);
    }
  };

  const handleNextClick = () => {
    if (translate > -200) {
      setTranslate(translate - 100);
      setTranslate2(translate2 - 50);
      setTimeout(() => {
        setTranslate2(0);
      }, 400);

      setCurrentIndex((prevIndex) => (prevIndex + 1) % pages.length);
      navigate(pages[(currentIndex + 1) % pages.length]);
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

  useEffect(() => {
    loadSlideStyleState();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveSlideStyleState();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [translate, translate2]);

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

  const slideStyle = {
    transform: `translate3d(${translate}%, 0px, ${translate2}px)`,
  };

  return (
    <div className="slides" style={slideStyle} onMouseUp={handleMouseUp}>
      <Main />
      <Page2 />
      <Page3 />
    </div>
  );
};