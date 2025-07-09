import React, { useState, useEffect } from 'react';
import '../CardGame.scss'

const initialImages = Array.from({ length: 15 }, (_, i) => `/assets/img/${i + 1}.jpg`);

function shuffleArray(array) {
    const newArr = [...array, ...array]; // make pairs
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr.map((img, index) => ({ id: index, img, matched: false }));
}

export default function CardGame() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matchedIds, setMatchedIds] = useState([]);

    useEffect(() => {
        setCards(shuffleArray(initialImages));
    }, []);

    const handleFlip = (card) => {
        if (flipped.length === 2 || flipped.find(f => f.id === card.id)) return;
        setFlipped(prev => [...prev, card]);
    };

    useEffect(() => {
        if (flipped.length === 2) {
            const [first, second] = flipped;
            if (first.img === second.img) {
                setMatchedIds(prev => [...prev, first.img]);
            }
            setTimeout(() => setFlipped([]), 1000);
        }
    }, [flipped]);

    return (
        <div className="card-game">
            <h1>Memory Match</h1>
            <div className="grid">
                {cards.map(card => {
                    const isFlipped = flipped.find(f => f.id === card.id) || matchedIds.includes(card.img);
                    return (
                        <div
                            key={card.id}
                            className={`card ${isFlipped ? 'flipped' : ''}`}
                            onClick={() => handleFlip(card)}
                        >
                            <div className="inner">
                                <div className="front">
                                    <img src={card.img} alt="card" />
                                </div>
                                <div className="back">?</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
