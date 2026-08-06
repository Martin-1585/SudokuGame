export class SudokuSolver {
    static isValid(board, row, col, num){
        for (let i = 0; i < 9; i++){
            if (board[row][i] === num){
                return false;
            }
            if (board[i][col] === num){
                return false;
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if(board[startRow + i][startCol + j] === num){
                    return false;
                }
            }
        }

        return true;
    }

    static createMatrix(){
        return Array.from({ length:9 }, () => Array(9).fill(0));
    }

    static cloneMatrix(board){
        return board.map(row => [...row]);
    }

    static randomValues(board){
        for (let i = board.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [board[i], board[j]] = [board[j], board[i]];
        }
        return board;
    }

    static sudokuGeneratorTemplate() {
        const board = this.createMatrix();

        const fillboard =  (board) => {
            for (let row = 0; row < 9; row++){
                for (let col = 0; col < 9; col++){
                    if (board[row][col] === 0){
                        const number = this.randomValues([1,2,3,4,5,6,7,8,9]);

                        for (let num of number){
                            if (SudokuSolver.isValid(board, row, col, num)){
                                board[row][col] = num;
    
                                if (fillboard(board)){
                                    return true;
                                }
    
                                board[row][col] = 0;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        };

        fillboard(board);
        return board;

    }

    static initialSudoku(generateSudoku, cellsRemoved){
        const initialGame = this.cloneMatrix(generateSudoku);
        let removed = 0;
        while (removed < cellsRemoved){
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);            

            if (initialGame[row][col] !== 0){
                initialGame[row][col] = 0;
                removed++;
            }
        }

        return initialGame;
    }   

    static startGame(difficulty = 'Easy'){
        let cellsRemoved;

        switch (difficulty){
            case 'Easy': cellsRemoved = 30; break;
            case 'Medium' : cellsRemoved = 45; break;
            case 'Hard' : cellsRemoved = 50; break;
            default: cellsRemoved = 30;
        }

        const solutionTemplate = this.sudokuGeneratorTemplate();

        const initialTemplate =  this.initialSudoku(solutionTemplate, cellsRemoved);

        const platerTemplate = this.cloneMatrix(initialTemplate);

        return {
            solvesudoku: solutionTemplate,
            initialsudoku: initialTemplate,
            playerboard: platerTemplate
        };
    }
}
