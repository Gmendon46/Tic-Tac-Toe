import React, { useState } from 'react';
import Player from './Components/Player';
import GameBoard from './Components/GameBoard';
import Log from './Components/Log';
import { WINNING_COMBINATIONS } from './Wiinning';
import GameOver from './Components/GameOver';

export interface GameTurn {
  square: {
    row: number;
    col: number;
  };
  player: string;
}


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: GameTurn[]) {

  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {

  const [player, setPlayer] = useState({
    "X": "Player 1",
    "O": "Player 2",
  } as { [key: string]: string });
  // const[activePlayer, setActivePlayer] = useState('X')
  const[gameTurns, setGameTurns] = useState<GameTurn[]>([])

  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard: (null | string)[][] = [...initialGameBoard.map(array => [...array])]

  for(const turn of gameTurns){
      const { square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
     
  }

  let winner = null

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    
    if(firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
        winner = player[firstSquareSymbol]
      }
  }

const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex:number, colIndex:number){
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ square: {
        row:rowIndex,
        col:colIndex,
      }, player: currentPlayer},...prevTurns];

      return updatedTurns
    })
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol:string, newName:string){
    setPlayer(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol] : newName
      }
    })
  }
  return (
    <main>
      <div>
        <ol id='players' className='highlight-player'>
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} onChangeName = {handlePlayerNameChange} />
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
