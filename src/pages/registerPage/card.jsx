// Card.js
import React from 'react';
import index from './index.css';
import { FaArrowRight } from "react-icons/fa";


const Card = ({ title, imageSrc, onclick }) => {
  
  return (
    <div className="card-wrapper" onClick={onclick}>
      <div className="card">
        <div className="card_header flex justify-center">
          <img src={imageSrc} alt="users" className="img-fluid card_img" />
        </div>
        <span className="temp">{title}</span>
        <div className="temp-scale">
          <span><FaArrowRight /></span>
        </div>
      </div>
      
    </div>
  );
}

export default Card;
