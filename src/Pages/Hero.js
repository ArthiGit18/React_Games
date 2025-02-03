import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const [showGif, setShowGif] = useState(true); // Tracks whether the GIF is visible

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowGif(false); // Hide the GIF and show the Hero content
        }, 12000); // 2 minutes

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="hero-container">
            {showGif ? (
                <img 
                    src="/assets/video/3.gif" 
                    alt="Animation 2" 
                    className="gif fade-in-out" 
                />
            ) : (
                <div className="hero-content">
                    <h2>Hello Welcome Everyone to Game Station!</h2>
                    <p>Get ready for an exciting adventure of fun and challenges.</p>
                    <button onClick={() => navigate('/bubble')}>Zen Bubble Game</button>
                    <button onClick={() => navigate('/puzzle')}>Puzzle Game</button>
                    <button onClick={() => navigate('/snake')}>Snake and Dots Game</button>
                </div>
            )}
        </div>
    );
};

export default Hero;
