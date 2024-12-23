
import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [player1, setPlayer1] = useState({ x: 50, y: 200 });
  const [player2, setPlayer2] = useState({ x: 350, y: 200 });
  const [ball, setBall] = useState({ x: 200, y: 200 });
  const [ballMoving, setBallMoving] = useState(false);
  const [ballDirection, setBallDirection] = useState({ x: 0, y: 0 });

  const movePlayer1 = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setPlayer1((prev) => ({ ...prev, y: Math.max(prev.y - 5, 0) }));
        break;
      case 'ArrowDown':
        setPlayer1((prev) => ({ ...prev, y: Math.min(prev.y + 5, 380) }));
        break;
      case 'ArrowLeft':
        setPlayer1((prev) => ({ ...prev, x: Math.max(prev.x - 5, 0) }));
        break;
      case 'ArrowRight':
        setPlayer1((prev) => ({ ...prev, x: Math.min(prev.x + 5, 180) }));
        break;
      case ' ':
        shootBall(player1);
        break;
      default:
        break;
    }
  };

  const movePlayer2 = (e) => {
    switch (e.key) {
      case 'w':
        setPlayer2((prev) => ({ ...prev, y: Math.max(prev.y - 5, 0) }));
        break;
      case 's':
        setPlayer2((prev) => ({ ...prev, y: Math.min(prev.y + 5, 380) }));
        break;
      case 'a':
        setPlayer2((prev) => ({ ...prev, x: Math.max(prev.x - 5, 220) }));
        break;
      case 'd':
        setPlayer2((prev) => ({ ...prev, x: Math.min(prev.x + 5, 400) }));
        break;
      case 'q':
        shootBall(player2);
        break;
      default:
        break;
    }
  };




const shootBall = (player) => {
    if (!ballMoving) {
      const direction = {
        x: player === player1 ? 1 : -1,
        y: Math.random() > 0.5 ? -1 : 1,
      };
      setBallDirection(direction);
      setBallMoving(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      movePlayer1(e);
      movePlayer2(e);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (ballMoving) {
      interval = setInterval(() => {
        setBall((prev) => {
          const newX = prev.x + ballDirection.x * 5;
          const newY = prev.y + ballDirection.y * 5;

          // Check for collision with the walls
          if (newY <= 0 || newY >= 400) {
            setBallDirection((dir) => ({ ...dir, y: -dir.y }));
          }

          // Check for scoring
          if (newX <= 0 || newX >= 400) {
            alert(newX <= 0 ? 'Team 2 scores!' : 'Team 1 scores!');
            resetGame();
          }

          return { x: newX, y: newY };
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [ballMoving, ballDirection]);

  const resetGame = () => {
    setBall({ x: 200, y: 200 });
    setBallMoving(false);
    setBallDirection({ x: 0, y: 0 });
    setPlayer1({ x: 50, y: 200 });
    setPlayer2({ x: 350, y: 200 });
  };

  return (
    <div className="game-area">
      <div className="player" style={{ top: player1.y, left: player1.x }}></div>
      <div className="player" style={{ top: player2.y, left: player2.x }}></div>
      <div className="ball" style={{ top: ball.y, left: ball.x }}></div>
    </div>
  );

}

 export default App
