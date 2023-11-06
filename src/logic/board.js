import { Winner_Combos } from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {
    //Se revisa todas las combinaciones para ver si hay ganador!
    //si gana X u O
    for (const combo of Winner_Combos) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    //Si no hay ganador
    return null
  }

  export const checkEndGame = (newBoard) => {
    //se revisa si hay un empate si no hay
    //mas espacios vacios
    return newBoard.every((Square) => Square != null )// X u O
  }