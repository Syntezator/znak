import React, { useState, useEffect } from 'react';
import arrowImage from './arrow.svg';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setPointer] = useState(false);

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const mouseOverHandler = (event) => {
      const pointerElementTypes = ['A', 'BUTTON', 'INPUT'];
      const isPointer = pointerElementTypes.some(
        (element) => event.target.nodeName.toUpperCase() === element
      );
      setPointer(isPointer);
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseover', mouseOverHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseover', mouseOverHandler);
    };
  }, []);

  const isLeftHalf = position.x < window.innerWidth / 2;
  const rotation = isLeftHalf ? 'rotate(180deg)' : 'rotate(0deg)';

  const cursorStyle = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    pointerEvents: 'none',
    transition: 'opacity 0.15s linear, width 0.15s linear, height 0.15s linear',
  };

  const regularCursorStyle = {
    ...cursorStyle,
    width: isPointer ? '60px' : '75px',
    height: isPointer ? '60px' : '75px',
    opacity: '1',
    borderRadius: '50%',
    border: '1px solid white',
    backgroundImage: isPointer ? 'none' : `url(${arrowImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    transform: `translate(-50%, -50%) ${rotation}`,
    backgroundSize: '35px',
    transition: cursorStyle.transition + ', transform 0.3s ease-in-out',
  };

  const pointerCursorStyle = {
    ...cursorStyle,
    width: isPointer ? '4px' : '0px',
    height: isPointer ? '4px' : '0px',
    borderRadius: '50%',
    opacity: isPointer ? 1 : 0,
    background: 'white',
  };

  return (
    <>
      <div style={regularCursorStyle} />
      <div style={pointerCursorStyle} />
    </>
  );
};

export default Cursor;