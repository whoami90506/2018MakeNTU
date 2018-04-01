import React from 'react';
import chair from './chair.png';
import './Chair.css';

const Chair = (props) => {
   const {data} = props;
   const {FSR1, FSR2, BSR} = data;
   let per1, per2, del3;
   const S = 57000;
   del3 = Math.floor((BSR - S) / 1000);
   if(FSR1 === 0 && FSR2 === 0) {per1 = 50; per2 = 50;}
   else {per1 = Math.floor((FSR1 / (FSR1+FSR2))*100); per2 = Math.floor((FSR2 / (FSR1+FSR2))*100);}


   return  (
      <div className="chair-wrapper">
         <img src={chair} className="App-logo" alt="logo" />
         <div style={{backgroundColor: '#C1666B', opacity: per2 / 100 }} className="bottom left" />
         <div style={{backgroundColor: '#C1666B', opacity: per1 / 100 }} className="bottom right" />
         <div style={{backgroundColor: '#4F7CAC', opacity: BSR / 100000}} className="spine" />
         <div style={{fontSize: `${per1 / 100 * 3}em`}} className="line right"> {per1}% </div>
         <div style={{fontSize: `${per2 / 100 * 3}em`}} className="line left"> {per2}% </div>
         <div className="line right-spine"> {del3} </div>
      </div>
   )
};

export default Chair;