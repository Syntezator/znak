import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageContext } from './PageContext';

export function Navbar() {
  const {translateNav, setTranslateNav} = useContext(PageContext)
  const location = useLocation();
  const navigate = useNavigate();
  


  const handleLinkClick = (path, translate) => {
    setTranslateNav(translate);
    setTimeout(() => {    
      navigate(path);
    }, 800);
  };

  return (
    <nav className="steps">
      <a
        className={`steps__btn ${location.pathname === '/' ? 'active' : ''}`}
        href="/"
        role="button"
        data-target={0}
        onClick={(e) => {
          e.preventDefault();
          handleLinkClick('/', 0);
        }}
      >
        1
      </a>
      <a
        className={`steps__btn ${location.pathname === '/page2' ? 'active' : ''}`}
        href="/page2"
        role="button"
        data-target={1}
        onClick={(e) => {
          e.preventDefault();
          handleLinkClick('/page2',-100);
        }}
      >
        2
      </a>
      <a
        className={`steps__btn ${location.pathname === '/page3' ? 'active' : ''}`}
        href="/page3"
        role="button"
        data-target={2}
        onClick={(e) => {
          e.preventDefault();
          handleLinkClick('/page3',-200);
        }}
      >
        3
      </a>
    </nav>
  );
}