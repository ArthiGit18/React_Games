import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Hero</h1>
      <button onClick={() => navigate('/bubble')}>Zen Bubble Game</button>
      <button onClick={() => navigate('/puzzle')}>Puzzle Game</button>
    </div>
  );
};

export default Hero;
