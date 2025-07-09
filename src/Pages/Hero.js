import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const [showGif, setShowGif] = useState(true); // Tracks whether the GIF is visible

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowGif(false); // Hide the GIF and show the Hero content
        }, 1200); // 12 seconds

        return () => clearTimeout(timeout);
    }, []);

    const handleNavigation = (path) => { // Remove ": string"
        const audio = new Audio("/assets/sounds/button.mp3");
        audio.play();
    
        // Delay navigation by 1.5 seconds (1500ms) after playing the sound
        setTimeout(() => {
            navigate(path);
        }, 1500);
    };
    
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
                    <button onClick={() => handleNavigation('/bubble')}>Zen Bubble Game</button>
                    <button onClick={() => handleNavigation('/puzzle')}>Puzzle Game</button>
                    <button onClick={() => handleNavigation('/snake')}>Snake and Dots Game</button>
                    <button onClick={() => handleNavigation('/card-game')}>Card Game</button>
                    <button onClick={() => handleNavigation('/simon-game')}>Simon Game</button>
                </div>
            )}
        </div>
    );
};

export default Hero;
