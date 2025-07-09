import React, { useState, useEffect } from 'react';

const colors = ['red', 'green', 'blue', 'yellow'];

export default function SimonGame() {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [message, setMessage] = useState('Click Start to Begin');
    const [flashing, setFlashing] = useState(null);

    useEffect(() => {
        if (userSequence.length && isPlaying) {
            const currentIndex = userSequence.length - 1;
            if (userSequence[currentIndex] !== sequence[currentIndex]) {
                setMessage('Wrong! Game Over 😢');
                setIsPlaying(false);
            } else if (userSequence.length === sequence.length) {
                setTimeout(() => nextRound(), 1000);
            }
        }
    }, [userSequence]);

    const startGame = () => {
        setSequence([]);
        setUserSequence([]);
        setMessage('Watch the pattern...');
        setIsPlaying(true);
        nextRound([]);
    };

    const nextRound = (currentSeq = sequence) => {
        const nextColor = colors[Math.floor(Math.random() * 4)];
        const newSeq = [...currentSeq, nextColor];
        setSequence(newSeq);
        setUserSequence([]);
        showSequence(newSeq);
    };

    const showSequence = async (seq) => {
        for (let color of seq) {
            setFlashing(color);
            await new Promise(r => setTimeout(r, 600));
            setFlashing(null);
            await new Promise(r => setTimeout(r, 200));
        }
        setMessage('Now it\'s your turn!');
    };

    const handleClick = (color) => {
        if (!isPlaying) return;
        setUserSequence(prev => [...prev, color]);
    };

    return (
        <div className="simon-game">
            <h2>Simon Says</h2>
            <p>{message}</p>
            <div className="board">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`btn ${color} ${flashing === color ? 'flash' : ''}`}
                        onClick={() => handleClick(color)}
                    />
                ))}
            </div>
            {!isPlaying && <button className="start-btn" onClick={startGame}>Start</button>}
        </div>
    );
}
