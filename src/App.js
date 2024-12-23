
import React, { useState, useEffect } from 'react';
import './App.css';

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
}

 export default App
