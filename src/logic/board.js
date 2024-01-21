import { WINNER_COMBOS } from '../constans'

export const checkWinner = (boardToCheck) => {
    // Se recorren las combinaciones ganadoras
    for (const combo of WINNER_COMBOS){
        const [a,b,c] = combo
        if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
            return boardToCheck[a]
        }
    }
    // Si no hay ganador, se retorna null
    return null
}

export const checkEndGame = (newBoard) => {
    // Si no hay ganador y no hay espacios vacios, se termina el juego
    return newBoard.every((square) => square !== null)
}