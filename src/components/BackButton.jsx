import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; 
import ButtonWithIcon from './ButtonWithIcon'; 

const BackButton = ({ title = 'Voltar', variant = 'secondary', onClick }) => {
  const navigate = useNavigate();

  const handleBack = onClick || (() => navigate(-1));

  return (
    <ButtonWithIcon
      icon={<ArrowLeft size={18} />} 
      onClick={handleBack}
      variant={variant}
    >
      {title} {/* Passando o texto como children para o ButtonWithIcon */}
    </ButtonWithIcon>
  );
};

export default BackButton;