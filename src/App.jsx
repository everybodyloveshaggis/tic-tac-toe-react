import { useState } from "react";
import "./App.css";

const BOARD_SIZES = [3, 4, 5, 6, 7, 8, 9];

const createBoard = (size) => Array.from({ length: size }, () => Array(size).fill(null));

const getWinner = (board) => {
  const size = board.length;
  const lines = [
    ...board,
    ...Array.from({ length: size }, (_, column) => board.map((row) => row[column])),
    Array.from({ length: size }, (_, index) => board[index][index]),
    Array.from({ length: size }, (_, index) => board[index][size - 1 - index]),
  ];

  return lines.find((line) => line[0] && line.every((cell) => cell === line[0]))?.[0] ?? null;
};

function App() {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(() => createBoard(3));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const startNewGame = (nextSize = size) => {
    setSize(nextSize);
    setBoard(createBoard(nextSize));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  };

  const handleSizeChange = (event) => startNewGame(Number(event.target.value));

  const handleCellClick = (rowIndex, columnIndex) => {
    if (winner || isDraw || board[rowIndex][columnIndex]) return;

    const nextBoard = board.map((row, index) =>
      index === rowIndex
        ? row.map((cell, cellIndex) => (cellIndex === columnIndex ? currentPlayer : cell))
        : row,
    );
    const nextWinner = getWinner(nextBoard);

    setBoard(nextBoard);
    if (nextWinner) {
      setWinner(nextWinner);
    } else if (nextBoard.flat().every(Boolean)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer((player) => (player === "X" ? "O" : "X"));
    }
  };

  const status = winner ? `${winner} wins!` : isDraw ? "It's a draw!" : `${currentPlayer}'s turn`;

  return (
    <main className="game-shell">
      <section className="game" aria-labelledby="game-title">
        <header className="game-header">
          <p className="eyebrow">Classic game</p>
          <h1 id="game-title">Tic-Tac-Toe</h1>
          <p className="subtitle">Get an entire row, column, or diagonal to win.</p>
        </header>

        <div className="game-controls">
          <label htmlFor="board-size">Board size</label>
          <select id="board-size" value={size} onChange={handleSizeChange}>
            {BOARD_SIZES.map((boardSize) => (
              <option key={boardSize} value={boardSize}>
                {boardSize} × {boardSize}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => startNewGame()}>
            New game
          </button>
        </div>

        <p className={`game-status${winner || isDraw ? " game-status--complete" : ""}`} role="status" aria-live="polite">
          {status}
        </p>

        <div
          className="board"
          style={{ "--board-size": size }}
          role="grid"
          aria-label={`${size} by ${size} Tic-Tac-Toe board`}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, columnIndex) => (
              <button
                className={`cell${cell ? ` cell--${cell.toLowerCase()}` : ""}`}
                type="button"
                key={`${rowIndex}-${columnIndex}`}
                role="gridcell"
                aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}${cell ? `: ${cell}` : ""}`}
                disabled={Boolean(cell) || Boolean(winner) || isDraw}
                onClick={() => handleCellClick(rowIndex, columnIndex)}
              >
                {cell}
              </button>
            )),
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
