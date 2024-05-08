import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti';
import { Square } from './Components/Square';
import{TURNS} from "./constantes"
import { checkWinner,checkEndGame } from './Logic/board.js';
import { WinnerModal } from './Components/WinnerModal';

//Componentes y propts

function App() {

  const [board,setBoard]=useState(()=>{
    const boardFromStorage =window.localStorage.getItem('board');

    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)})
    ;

  const [turn,setTurn]=useState(()=>{
    const turnFromStorage =window.localStorage.getItem('turn'); 
    return turnFromStorage ?? TURNS.X;
    });

  const[winner,setWinner]=useState(null); //null no hay ganador, false empate, true ganador

  const resetGame=()=>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  const updateBoard=(index)=>{
    const newBoard=[...board];

    if(board[index]||winner) return

    else{
      newBoard[index]=turn; //x u o 
      setBoard(newBoard);   const newTurn=turn===TURNS.X? TURNS.O : TURNS.X;
      setTurn(newTurn);
      window.localStorage.setItem('board',JSON.stringify(newBoard))
      window.localStorage.setItem('turn',newTurn)
    }


    const newWinner=checkWinner(newBoard);
    if(newWinner){
      confetti();
      setWinner(newWinner);//El cambio de estado es asincrono

    }
    else if(checkEndGame(newBoard)){
      setWinner(false)
    }
    //TO DO:check if game is over

    


  }
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square,index)=>{
            return(
          <Square key={index} index={index} updateBoard={updateBoard}>
  
           {square} 

          </Square>
          )

          })
        }

      </section>
      <section className='turn'>
        <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>

      </section>
        <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>

    </main>

  )
}

export default App
