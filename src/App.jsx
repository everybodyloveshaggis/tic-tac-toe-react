import { useState } from 'react';

let isComplete = false;

const generateBoard = (size) => {
  const newBoard = []
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)])
  }
  return newBoard
}

const checkHorizontal = (board) => {
  for (let row of board) {
    const rowSet = new Set(row)
    if (rowSet.size === 1 && !rowSet.has(undefined)) {
      return true
    }
  }
}

const rowsToColumns = (board) => {
  const newBoard = []
  let column = 0
  while (column < board.length) {
    const newRow = []
    for (let row = 0; row < board.length; row++) {
      newRow.push(board[row][column])
    }
    newBoard.push(newRow)
    column++
  }
  return newBoard
}

const diagonalToRow = (board) => {
  const newBoard = [[], []]
  let increment = 0
  let decrement = board.length - 1
  while (increment < board.length) {
    newBoard[0].push(board[increment][increment])
    newBoard[1].push(board[decrement][increment])
    increment++
    decrement--
  }
  return newBoard
}

const checkForWinner = (board) => {
  //horizontal
  if (checkHorizontal(board)) {
    return true
  }
  //vertical
  if (checkHorizontal(rowsToColumns(board))) {
    return true
  }
  //diagonal
  if (checkHorizontal(diagonalToRow(board))) {
    return true
  }
}

function App() {

  const [board, setBoard] = useState(generateBoard(3))
  const [currPlayer, setCurrPlayer] = useState('x')

  const handleClick = (row, col) => {
    if (!isComplete) {
      //Here I am checking to make sure that the user is 
      //clicking on a blank cell
      //otherwise the click is not registered until they do.
      if (!board[row][col]) {
        board[row][col] = currPlayer
        setBoard([...board])
        if (checkForWinner(board)) {
          isComplete = true;
          console.log("User " + currPlayer + " wins!")
        }
        setCurrPlayer(currPlayer === 'x' ? 'y' : 'x')
      }
    }
  }

  return (
    <>
      <div>
        {board.map((row, r) => {
          return (
            <div
              key={r}
              style={{
                display: 'flex',
                border: '1px red solid',
              }}
            >
              {row.map((cell, c) => {
                return (
                  <div
                    key={c}
                    onClick={() => handleClick(r, c)}
                    style={{
                      border: '1px red solid',
                      height: '50px',
                      width: '50px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {cell}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App;
