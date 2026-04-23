import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import { useState } from 'react';

const { Badge, Button, Card } = ReactBootstrap

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {

  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [movingSquare, setMovingSquare] = useState(null);

  let xCount = 0;
  let oCount = 0;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === 'X'){
      xCount++;
    }
    else if (squares[i] === 'O'){
      oCount++;
    }
  }

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    if (xCount === 3 && xIsNext){
      if (squares[i] === "X"){
        setMovingSquare(i);
        return;
      }
      if (movableSquare(squares, movingSquare, i, "X")){
        nextSquares[i] = squares[movingSquare];
        nextSquares[movingSquare] = squares[i];
        setMovingSquare(null);
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
      }
      return;
    }

    if (oCount === 3 && !xIsNext){
      if (squares[i] === "O"){
        setMovingSquare(i);
      }
      if (movableSquare(squares, movingSquare, i, "O")){
        nextSquares[i] = squares[movingSquare];
        nextSquares[movingSquare] = squares[i];
        setMovingSquare(null);
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
      }
      return;
    }

    if (squares[i] !== null){
      return;
    }

    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
    if ((xIsNext && xCount === 3) || (!xIsNext && oCount === 3)){
      status += " Selected Square: " + movingSquare;
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function movableSquare(squares, startSquare, endSquare, currPlayer){
  const movTable = [
    [1, 3, 4],
    [0, 2, 3, 4, 5],
    [1, 4, 5],
    [0, 1, 4, 6, 7],
    [0, 1, 2, 3, 5, 6, 7, 8],
    [1, 2, 4, 7, 8],
    [3, 4, 7],
    [3, 4, 5, 6, 8],
    [4, 5, 7]
  ]
  if (startSquare === null || endSquare === null || squares[endSquare]!== null){
    return false;
  }
  if (squares[4] === currPlayer && startSquare !== 4 && movTable[startSquare].includes(endSquare)){ 
    const nextSquares = squares.slice();
    nextSquares[startSquare] = squares[endSquare];
    nextSquares[endSquare] = squares[startSquare];
    return calculateWinner(nextSquares);
  }
  return movTable[startSquare].includes(endSquare);
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}