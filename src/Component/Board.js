import React, { useEffect, useState } from "react";
import "../App.css";
import Square from "./Square";

const Board = () => {
  const [squares, setsquares] = useState(Array(9).fill(null));

  const [turnX, setTurnX] = useState(true);

  const [winner, setWinner] = useState("");

  const [status, setStatus] = useState("");

  const setSymbol = turnX ? "X" : "O";

  const winnerLogic = (squares) => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    setWinner(winnerLogic(squares));
    if (winner) {
      setStatus("winner:" + winner);
      setTimeout(() => {
        setsquares(Array(9).fill(null));
        setWinner("");
      }, 1000);
    } else if (isBoardFull(squares)) {
      setStatus("Draw!");
    } else {
      setStatus("Next player:" + setSymbol);
    }
  }, [winner, setSymbol]);

  // useEffect(()=>{
  //   console.log('status', status)
  // },[status])

  const isBoardFull = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        return false;
      }
    }
    return true;
  };

  const Resetbutton = () => {
    setsquares(Array(9).fill(null));
    setTurnX(true);
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        squareClick={() => {
          if (squares[i] !== "X" && squares[i] !== "O") {
            const copystate = [...squares];
            copystate[i] = setSymbol;
            setsquares(copystate);
            setTurnX(!turnX);
          } else if (winner && !squares[i]) {
            alert("winner is exist");
          } else {
            alert("Placed is already marked");
          }
        }}
      />
    );
  };

  return (
    <>
      <div className="container">
        <div className="game">
          <div className="game-board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>
          {status && <div className="gameStatus">{status}</div>}
          <button className="restart-button" onClick={Resetbutton}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Board;
