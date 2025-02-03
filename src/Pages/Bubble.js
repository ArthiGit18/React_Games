import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Face4Icon from '@mui/icons-material/Face4';
import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Face3Icon from '@mui/icons-material/Face3';
import Face6Icon from '@mui/icons-material/Face6';

// Helper function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Helper function to get a random icon
const getRandomIcon = () => {
  const icons = [
    <Face4Icon style={{ fontSize: 30 }} />,
    <FaceIcon style={{ fontSize: 30 }} />,
    <Face2Icon style={{ fontSize: 30 }} />,
    <Face3Icon style={{ fontSize: 30 }} />,
    <Face6Icon style={{ fontSize: 30 }} />,
  ];
  return icons[Math.floor(Math.random() * icons.length)];
};

// Helper function to get a random image (after 20 pops)
const getRandomImage = () => {
  const images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "11.png",
    "12.png",
    "13.png",
    "14.png",
    "15.png",
    "clown-fish.png",
    "cat.png"
  ];
  return images[Math.floor(Math.random() * images.length)];
};

// Function to play the sound effect
const playPopSound = () => {
  const audio = new Audio('assets/sounds/pop.mp3'); // Path to your sound file
  audio.play();
};

const ZenBubbleGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [popCount, setPopCount] = useState(0); // Track the number of bubbles popped

  useEffect(() => {
    const interval = setInterval(() => {
      if (bubbles.length < 10) {
        setBubbles((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 80,
            y: Math.random() * 80,
            color: getRandomColor(),
            icon: getRandomIcon(), // Random icon
            image: getRandomImage(), // Random image (after 20 pops)
          },
        ]);
      }
    }, 800); // Add new bubble every 2 seconds
    return () => clearInterval(interval);
  }, [bubbles]);

  const popBubble = (id) => {
    playPopSound(); // Play sound when bubble is popped
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
    setScore(score + 1);
    setPopCount(popCount + 1); // Increase the pop count
  };

  return (
    <section className="zen-game">
      <h2>🧘‍♂️ Zen Bubble Pop</h2>
      <p>Tap the bubbles to pop & relax!</p>
      <div className="bubble-container">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="bubble"
            style={{
              top: `${bubble.y}%`,
              left: `${bubble.x}%`,
              background: bubble.color,
            }}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              rotate: [0, 360, 0], // Rotate in both directions continuously
            }}
            exit={{ scale: 0 }}
            onClick={() => popBubble(bubble.id)}
            whileTap={{
              scale: 1.5,
              rotate: 360,
              backgroundColor: "#f39c12",
            }}
            transition={{
              scale: { type: "spring", stiffness: 300, damping: 10 },
              rotate: {
                repeat: Infinity, // Make the rotation repeat forever
                repeatType: "loop", // Loop the rotation
                duration: 4, // Adjust duration for continuous rotation speed
                ease: "linear", // Continuous smooth rotation
              },
              backgroundColor: { duration: 0.2 },
            }}
            whileHover={{
              scale: [1.2, 1.3, 1.2], // "Beat" effect
              backgroundColor: "red",
              transition: {
                scale: {
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.3,
                },
                backgroundColor: { duration: 0.5 },
              },
            }}
          >
            <div className="icon">
              {popCount < 10 ? (
                bubble.icon // Show icon before 20 pops
              ) : (
                <img 
                src={`/assets/icon/${bubble.image}`} 
                alt="Bubble" 
                style={{ width: "40px", height: "40px" }} 
              />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="score">Score: {score}</div>
    </section>
  );
};

export default ZenBubbleGame;
