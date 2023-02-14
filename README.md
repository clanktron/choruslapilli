# Tic-Tac-Toe 

Before starting the tutorial I ensured I had node.js installed by running `npm`. I then downloaded the zip file for the project template, and 
ran `npm install && npm start` to setup the demo. 

Note: This can also be achieved by running `npx create-react-app tic-tac-toe` and copying the code from the respective App.js and index.js files.

>Oddly enough the downloaded code wouldn't run without manually adding `import React from 'react'` to the top of the current `App.js` file.

I then followed the tutorial's instructions found [here](https://beta.reactjs.org/learn/tutorial-tic-tac-toe#overview) 
to get the code I will show shortly.

Installing the React Devtools browser extension was also useful in interacting with the React app.

The tutorial takes you through a general buildup of how components are handled with JS. It starts with showing you how to create a default function square,
and then how to abstract that into a sub-component that is called multiple times by the default component. This quickly snowballs into creating 
a tic-tac-toe grid out of individual squares with selectable values. You can even create functions within components that are only run 
when certain events occur (i.e. a user click). Basic react conventions are also convered. These ranged from familiarization with builtin functions 
to how React handles immutability.

App.js:

```javascript
    import React from 'react'
    import { useState } from 'react';
    
    function Square({ value, onSquareClick }) {
      return (
        <button className="square" onClick={onSquareClick}>
          {value}
        </button>
      );
    }
    
    function Board({ xIsNext, squares, onPlay }) {
      function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[i] = 'X';
        } else {
          nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
      }
    
      const winner = calculateWinner(squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
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
    
    export default function Game() {
      const [history, setHistory] = useState([Array(9).fill(null)]);
      const [currentMove, setCurrentMove] = useState(0);
      const xIsNext = currentMove % 2 === 0;
      const currentSquares = history[currentMove];
    
      function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
      }
    
      function jumpTo(nextMove) {
        setCurrentMove(nextMove);
      }
    
      const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      });
    
      return (
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
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

```


