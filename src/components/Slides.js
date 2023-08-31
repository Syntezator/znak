import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from './Form';

export function Slides({ slideStyle, handleMouseUp}) {

  return (
    
    <div className="slides" style={slideStyle} onMouseUp={handleMouseUp}> 
    
      <div id="slide-0" className="slide">
          <div className="container bg-transp">
            <div className="main-brand">
              <a className="logo" href="#">
                <img className="logo-img" src="./src/img/logo.svg" />
              </a>
              <div className="main-brand__title">
                <span className="ttl">ZNAK</span>
                <span className="sub_ttl">агентство полного цикла</span>
              </div>
            </div>
          </div>
      </div>
      <div id="slide-1" className="slide">     
        <div className="container bg-black">
          <ul className="main-links">
            <li>Разработка сайтов</li>
            <li>EMAIL рассылки</li>
            <li>Таргетированная реклама</li>
            <li>Брендинг</li>
            <li>Дизайн</li>
            <li>Контекстная реклама</li>
            <li>СЕО-оптимизация сайта</li>
            <li>Конкурентный анализ</li>
            <li>Техническая поддержка</li>
            <li>Telegram-бот</li>
          </ul>
        </div>
      </div>
      <div id="slide-2" className="slide">
    
      <div className="container bg-black">
        <div className="main-contacts">
          <a className="logo" href="#">
            <img className="logo-img" src="./src/img/logo.svg" />
          </a>
          <Form/>
          <div className="post_msg">
            <div className="post_msg__we">
              <span className="color_f">ZNAK</span> - команда опытных
              разработчиков в сфере web-технологий. Наши специалисты имеют
              большой опыт работы над крупными Российскими и международными
              проектами. За плечами команды сотрудничество с банками,
              федеральными каналами, музеями Москвы, производителями тв и
              киноиндустрии, диджитал агентствами и крупными маркетплейсами.
              Также мы помогаем выйти на цифровой рынок развивающимся
              компаниям малого и среднего бизнеса.
            </div>
            <div className="post_msg__telegram">
              <div className="pmt_inner">
                <a
                  href="https://telegram.im/@mi4boy"
                  target="_blank"
                  className="telegramim_button telegramim_shadow telegramim_pulse"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 50,
                    height: 50,
                    fontSize: 26,
                    background: "#27A5E7",
                    boxShadow: "1px 1px 5px #27A5E7",
                    color: "#FFFFFF",
                    borderRadius: "50%"
                  }}
                  title=""
                >
                  <i />
                </a>
                <span className="telegram__sub_ttl">связаться сейчас</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}