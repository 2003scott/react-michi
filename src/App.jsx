import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNOS } from './constans'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNOS.X)
    const [winner, setWinner] = useState(null)

    const updateBoard = (index) => {

        /**
         *  Si ya hay un valor en el tablero, no se puede actualizar
         *  Si ya hay un ganador, no se puede actualizar
         */
        if (board[index] || winner ) return

        // Si no hay un valor, se actualiza el tablero
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        // Se actualiza el turno
        const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X
        setTurn(newTurn)

        // Se verifica si hay un ganador
        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        }else if ( checkEndGame(newBoard)) {
            setWinner(false)
        }

    }
    
    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNOS.X)
        setWinner(null)
    }

    console.log(board)

    return (
        <main className='board'>
            <h1>React Michi</h1>
            <button onClick={resetGame}>
                Empezar de nuevo
            </button>
            <section className='game'>
                {
                    board.map((square, index) => (
                        <Square 
                        key={index}
                        index={index}
                        updateBoard={updateBoard}>
                        {square}
                        </Square>
                    ))
                }
            </section>

            <section className='turn'>
                <Square isSelected={turn === TURNOS.X}>
                    {TURNOS.X}
                </Square>
                <Square isSelected={turn === TURNOS.O}>
                    {TURNOS.O}
                </Square>
            </section>
            
            <WinnerModal winner={winner} resetGame={resetGame}/>
        </main>
    )
}

export default App
