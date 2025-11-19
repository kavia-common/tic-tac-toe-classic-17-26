import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * Utility: Determine winner from the current squares array.
 * Returns "X", "O", or null if no winner yet.
 */
function calculateWinner(squares) {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Square button for the Tic Tac Toe board.
 * Props:
 *  - value: "X" | "O" | null
 *  - onClick: () => void
 *  - disabled: boolean to prevent click when game is over or square filled
 */
function Square({ value, onClick, disabled }) {
  /** This is a public function component for rendering a single square in the board. */
  const content = value ?? '';
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      disabled={disabled}
      aria-label={content ? `Square with ${content}` : 'Empty square'}
    >
      {content}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Main App component rendering the Tic Tac Toe game.
 * Renders:
 *  - Title and description
 *  - Status ("Next player", "Winner", or "Draw")
 *  - 3x3 grid of squares
 *  - Restart button
 */
function App() {
  /** This is a public function for the main application component. */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = useMemo(() => squares.every(Boolean) && !winner, [squares, winner]);
  const nextPlayer = xIsNext ? 'X' : 'O';

  const status = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return 'Draw';
    return `Next player: ${nextPlayer}`;
  }, [winner, isDraw, nextPlayer]);

  const gameOver = Boolean(winner) || isDraw;

  const handleClick = (index) => {
    if (squares[index] || gameOver) return;
    const next = squares.slice();
    next[index] = nextPlayer;
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="ttt-app">
      <main className="ttt-container" role="main">
        <header className="ttt-header">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <p className="ttt-subtitle">A simple two‑player game. Take turns to get three in a row.</p>
        </header>

        <section className="ttt-status" aria-live="polite">
          <span className={`ttt-badge ${winner ? 'badge-winner' : isDraw ? 'badge-draw' : 'badge-next'}`}>
            {status}
          </span>
        </section>

        <section className={`ttt-board ${gameOver ? 'ttt-board-finished' : ''}`}>
          {squares.map((val, idx) => (
            <Square
              key={idx}
              value={val}
              onClick={() => handleClick(idx)}
              disabled={Boolean(val) || gameOver}
            />
          ))}
        </section>

        <footer className="ttt-actions">
          <button
            className="ttt-restart"
            onClick={handleRestart}
            aria-label="Restart game"
          >
            Restart
          </button>
        </footer>
      </main>
    </div>
  );
}

export default App;
