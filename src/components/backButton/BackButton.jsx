import React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button 
      className="flex items-center bg-[#11101d] text-white py-2 px-4 rounded-md hover:bg-gray-800 transform hover:scale-105 transition-all"
      onClick={handleBackClick}
    >
      <ArrowLeft className="mr-2" />
     
    </button>
  );
};

export default BackButton;
