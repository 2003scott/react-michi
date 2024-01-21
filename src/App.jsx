import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNOS } from './constans'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {

    const [board, setBoard] = useState(() => {
        console.log('inicializar estado del board')
        const boardFromStorage = window.localStorage.getItem('board')
        if (boardFromStorage) return JSON.parse(boardFromStorage)
        return Array(9).fill(null)
    })

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? TURNOS.X
    })
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
        // Guardamos el nuevo turno en el local storage
        window.localStorage.setItem('board', JSON.stringify(newBoard))
        window.localStorage.setItem('turn', newTurn)

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

        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
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
