import React from 'react'
import { useState } from 'react';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    return (
        <div className="game">
        <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} />
        </div>
        <div className="game-info">
        </div>
        </div>
    );
}

function Board({ squares, onPlay, currentMove }) {
    const [origin, setOrigin] = useState({
        selected: false,
        originSquare: null
    });
    const [xIsNext, setxIsNext] = useState(true);

    function handleClick(i) {
        if (calculateWinner(squares)) return;
        const nextSquares = squares.slice();
        if (currentMove <= 5) {
            if (squares[i]) return;
            if (xIsNext) {
                nextSquares[i] = 'X';
            } else {
                nextSquares[i] = 'O';
            }
            setxIsNext(!xIsNext);
        }
        else {
            if (origin.selected === true) {
                if (nextSquares[i] === null && isAdjacent(origin.originSquare,i)){
                    if (xIsNext && squares[4] === 'X' || !xIsNext && squares[4] === 'O'){
                        let targetSquare = nextSquares[i]
                        let oldOrigin = nextSquares[origin.originSquare]
                        nextSquares[i] = (xIsNext ? 'X' : 'O');
                        nextSquares[origin.originSquare] = null;
                        if (calculateWinner(nextSquares) || origin.originSquare === 4) {
                            console.log("Moved ", (xIsNext ? 'X' : 'O'), " to square ", i)
                            setxIsNext(!xIsNext);
                        }
                        else {
                            console.log("You must move the center piece or win");
                            nextSquares[i] = targetSquare;
                            nextSquares[origin.originSquare] = oldOrigin;
                        }
                        setOrigin({ ...origin, selected: false});
                    }
                    else {
                        nextSquares[i] = (xIsNext ? 'X' : 'O');
                        nextSquares[origin.originSquare] = null;
                        setOrigin({ ...origin, selected: false});
                        console.log("Moved ", (xIsNext ? 'X' : 'O'), " to square ", i)
                        setxIsNext(!xIsNext);
                    }
                }
                else {
                    console.log("invalid square")
                    setOrigin({ ...origin, selected: false});
                }
            }
            else if (origin.selected === false) {
                if (xIsNext && nextSquares[i] === 'X' || !xIsNext && nextSquares[i] === 'O') {
                    setOrigin({ ...origin, selected: true, originSquare: i});
                    console.log(origin.originSquare)
                    console.log("Selected square ", i, " containing ", (xIsNext ? 'X' : 'O'), " to move to adjacent square.")
                }
            }
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner + " !";
    } 
    else if (currentMove > 5) {
        if (!origin.selected) status = 'Choose a piece to move: ' + (xIsNext ? 'X' : 'O');
        else status = 'Choose a adjacent space to move to: ' + (xIsNext ? 'X' : 'O')
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div>
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
        </div>
    );
}

function Square({ value, onSquareClick }) {

    return (
        <button className="square" onClick={onSquareClick}>
        {value}
        </button>
    );
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
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function isAdjacent(i, j) {
    if (i === 0)
        return j === 1 || j === 3 || j === 4;
    else if (i === 1)
        return j === 0 || j === 2 || j === 4 || j === 3 || j === 5;
    else if (i === 2)
        return j === 1 || j === 4 || j === 5;
    else if (i === 3)
        return j === 0 || j === 1 || j === 4 || j === 6 || j === 7;
    else if (i === 4) 
        return true;
    else if (i === 5)
        return j === 1 || j === 2 || j === 4 || j === 7 || j === 8;
    else if (i === 6)
        return j === 3 || j === 4 || j === 7;
    else if (i === 7)
        return j === 3 || j === 4 || j === 5 || j === 6 || j === 8;
    else if (i === 8)
        return j === 4 || j === 5 || j === 7;
}
