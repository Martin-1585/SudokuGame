import { useState, useEffect } from "react";
import { SudokuSolver } from "./logic/sudokuLogic";

function App(){
  const [difficulty, setDifficulty] = useState('Easy');
  const [solvesudoku, setSolvesudoku] = useState([]);
  const [initialsudoku, setInitialsudoku] = useState([]);
  const [playerboard, setPlayerboard] = useState ([]);

  const NstartGame = (selectedDiffculty) => {
    const game = SudokuSolver.startGame(selectedDiffculty);

    setSolvesudoku(game.solvesudoku);
    setInitialsudoku(game.initialsudoku);
    setPlayerboard(game.playerboard);
    setDifficulty(selectedDiffculty);
  };

  useEffect(() => {
    NstartGame('Easy');
  },[]);
  
  const handlePlayer = (row, col, num) => {
    if (initialsudoku[row][col] !== 0){
      console.warn('Casilla con un numero ya insertado')
      return;
    }


    const newPlayer = SudokuSolver.cloneMatrix(playerboard);

    if (num === 0 || Number.isNaN(num)){
      newPlayer[row][col] = 0;
      setPlayerboard(newPlayer);
      return;
    }

    if (SudokuSolver.isValid(newPlayer, row, col, num)){
      newPlayer[row][col] = num;
      setPlayerboard(newPlayer);

      const boardFull = newPlayer.every(row => row.every(cell => cell != 0));

      if (boardFull){
        setTimeout(() => {
          alert('FELICITACIONES GANO EL JUEGO');
        }, 100);
      }
      return;
    } else {
      alert('NUMERO NO VALIDO');
    }
  };

  if (playerboard.length === 0){
    return
      <div>
      "Cargando Sudoku..."
      </div>
    ;
  }

  return (
    <div style = {{fontFamily: 'serif', textAlign: 'center', marginTop: '1.6rem'}}>
      <h1>
        SUDOKU EN REACT
      </h1>

      <div style = {{marginBottom: '20px'}}>
        <button onClick={() => NstartGame('Easy')} style = {{borderRadius: '20%', width: '55px', height: '25px', textAlign:'center', justifyContent: 'left', backgroundColor: '#4A9DAE', color: '#000000'}}>EASY</button>
        <button onClick={() => NstartGame('Medium')} style = {{borderRadius: '20%', width: '65px', height: '25px', textAlign: 'center', justifyContent: 'center',  backgroundColor: '#4A9DAE', color: '#000000',margin: '0 10px'}}>MEDIUM</button>
        <button onClick={() => NstartGame('Hard')}style = {{borderRadius: '20%', width: '55px', height: '25px', textAlign:'center', justifyContent: 'right', backgroundColor: '#4A9DAE', color: '#000000'}} >HARD</button>
      </div>

      <div
        style = {{
            display: 'grid',
            gridTemplateColumns: 'repeat(9, 40px)',
            gap: '2px',
            justifyContent: 'center',
            backgroundColor: '#F2F0EF',
            padding: '2px',
            width: 'fit-content',
            margin: '0 auto'
        }}
      >
        {playerboard.map((row, rowIndex) => (
          row.map((cellValue, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={cellValue === 0 ? '' : cellValue}
              readOnly={initialsudoku[rowIndex][colIndex] !== 0}
              onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  handlePlayer(rowIndex, colIndex, value);
              }}  

              style = {{
                width: '40px',
                height: '40px',
                backgroundColor: initialsudoku[rowIndex][colIndex] !==0 ? '#D3D3D3' : '#fff',
                textAlign: 'center',
                fontSize: '20px',
                color: '#000000',
                fontWeight: initialsudoku[rowIndex][colIndex] !==0 ? 'bold' : 'normal',
                border: '1px solid #ccc',
                outline: 'none',
                cursor: initialsudoku[rowIndex][colIndex] !==0 ? 'not-allowed' : 'text'
              }}
            />
          ))
        ))}
      </div>
    </div>
  );
}

export default App;