// i am going to do a tic tac toe game
import { useState } from 'react'
import confetti from "canvas-confetti"

const TURNS = {
  X: "❎",
  O: '⭕',
}



//vamos a crear un componente que se llama square, luego de crearlo vamos a ponerle props llamdas chisldren, updateBoard, isSelected, index, estas props son las que vamos a usar en el componente square, 
// eslint-disable-next-line react/prop-types
const Square = ({children, updateBoard, isSelected,  index}) => {
  //luego se crea un consnt llamada className, en la cual tenemos una ternaria donde preguntamos si es esta seleccionado o no, despues se crea un handleClick en el cual ponemos una funcion llamada 
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () => {
    updateBoard(index)
  }
  return (
      <div className="square" onClick={handleClick}>
      <span className={className}>
        {children}
      </span>
    </div>
  )
}

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]




function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for(const combos of winnerCombos){
      const [a,b,c] = combos
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        
        ){
          return boardToCheck[a]
        }

  }
  return null
  
}
const resetGame =()=>{
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
}

const checkEndGame = (newBoard) => {
  return newBoard.every((item) => item !== null)

}
const updateBoard = (index) => {

    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()+

      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }


  }
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map(( _ ,index)=>{
            return (
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard} 
              >
                {board[index]}
                </Square>
            )
          })
        }

      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner !=  null && (
          <section className= "winner">
            <div className = "text">
              <h2>
                {
                  winner === false
                  ?'Empate'
                  : 'Gano'
                }
              </h2>
              
              <header className= "win">
                {
                  winner && <Square>
                    {winner}
                  </Square>
                }
              </header>

              <footer>
                <button onClick={resetGame} >
                  Empezar de nuevo
                </button>
              </footer>


            </div>
          </section>

        )
      }
    </main>
  )
}

export default App
