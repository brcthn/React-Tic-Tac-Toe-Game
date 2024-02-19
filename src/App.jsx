import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./combination";
import GameOver from "./components/GameOver";
const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
const PLAYERS = {X:"Player 1",O: "Player 2"}

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";
  if(gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveWinner(players, gameBoard){
  let winner = undefined;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol =  gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) =>[...array])];
  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row,col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPLayers]= useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square:{row:rowIndex, col:colIndex}, player:currentPlayer}, ...prevTurns]
      return updatedTurns;
    })
  }

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(players, gameBoard);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestart(){
    setGameTurns([]);
  }
  function handleNameChanges(symbol,newName){
    setPLayers(prevPlayers => {
      return{
        ...prevPlayers, [symbol]:newName
      }
    })
  }
  return (
   <main>
    <div id="game-container">
      <ol id="players" className = "highlight-player">
        <Player initialName = {PLAYERS.X} symbol = "X" onChangeName = {handleNameChanges} isActive = {activePlayer === "X"}></Player>
        <Player initialName = {PLAYERS.O} symbol = "O" onChangeName = {handleNameChanges} isActive = {activePlayer === "O"}></Player>
      </ol>
      {(winner || hasDraw) && <GameOver winner = {winner} onRestart = {handleRestart}/>}
      <GameBoard onSelectSquare = {handleSelectSquare} board = {gameBoard}/>
    </div>
      <Log turns = {gameTurns}/>
   </main>
  )
}

export default App;
