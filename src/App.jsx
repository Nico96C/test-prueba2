import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"

import { Square } from './components/Square.jsx'
import { Turns } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null) //Lenta Lectura si esta en la lectura de todo el body!
    
    // Otra opcion con if()!
    //if(boardFromStorage) return JSON.parse(boardFromStorage)
    //return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? Turns.X //?? identifica si es null o undentify - el || verifica true o false.
  })

  const [winner, setWinner] = useState(null)
  //null no hay ganador, false es que hay empate!


  const updateBoard = (index) => {

    //No actualiza posicion si hay algo!
    if (board[index] || winner) return

    //Actualiza el tablero!
    const newBoard = [...board]
    newBoard[index] = turn // x u o
    setBoard(newBoard)

    //Cambia turno
    const newTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(newTurn)

    //Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //Vamos a hacer un check para ver si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    } //mirar si hay un ganador

  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='board'>
      <h1> tic - tac - toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {

            return (

              <Square key={index}
                index={index}
                updateBoard={updateBoard}>
                {square}
              </Square>

            )


          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === Turns.X}>
          {Turns.X}
        </Square>
        <Square isSelected={turn === Turns.O}>
          {Turns.O}
        </Square>
      </section>

        <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
