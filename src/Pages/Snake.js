import React, { useState, useEffect } from "react";

const GRID_SIZE = 10;
const CELL_SIZE = 30;
const SPEED = 600; // Lower is faster

const getRandomPosition = (snake = []) => {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
  return position;
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [food, setFood] = useState(getRandomPosition());  // Initially no snake so passing an empty array
  const [direction, setDirection] = useState("RIGHT");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      moveSnake();
    }, SPEED);

    return () => clearInterval(interval);
  }, [snake, direction, isGameOver]);

  const moveSnake = () => {
    let newSnake = [...snake];
    let head = { ...newSnake[0] };

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
      default:
        break;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomPosition(newSnake));  // Pass snake to get a new food position
    } else {
      newSnake.pop(); // Remove tail if not eating food
    }

    if (checkCollision(head)) {
      setIsGameOver(true);
    } else {
      setSnake(newSnake);
    }
  };

  const checkCollision = (head) => {
    return (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= GRID_SIZE ||
      head.y >= GRID_SIZE ||
      snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowUp" && direction !== "DOWN") {
      setDirection("UP");
    } else if (e.key === "ArrowDown" && direction !== "UP") {
      setDirection("DOWN");
    } else if (e.key === "ArrowLeft" && direction !== "RIGHT") {
      setDirection("LEFT");
    } else if (e.key === "ArrowRight" && direction !== "LEFT") {
      setDirection("RIGHT");
    }
  };

  const resetGame = () => {
    setSnake([{ x: 5, y: 5 }]);
    setFood(getRandomPosition());  // Initially generate food with no snake
    setDirection("RIGHT");
    setIsGameOver(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
    gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
    gap: '1px',
    backgroundColor: '#ddd',
  };

  return (
    <div className="game-container">
      <h2>Snake Game</h2>
      {isGameOver && (
        <div className="game-over">
          <h1>Game Over!</h1>
          <p>Use Keyboard Buttons</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
      <div className="grid" style={gridStyle}>
        {Array.from({ length: GRID_SIZE }).map((_, row) =>
          Array.from({ length: GRID_SIZE }).map((_, col) => {
            const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
            const isFood = food.x === col && food.y === row;

            return (
              <div
                key={`${row}-${col}`}
                className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  backgroundColor: isSnake ? "green" : isFood ? "red" : "white",
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
