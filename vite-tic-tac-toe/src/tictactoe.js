const ticTacToeModule = (() => {

    const createGameBoard = () => {
        const board = Array.from({ length: 3 }, () => Array(3).fill(''));
        return {
            showBoard: () => board,

            markCell: (row, col, player) => {
                let currentCell = board[row][col];
                if (currentCell === '') {
                    currentCell = player.symbol;
                    board[row][col] = currentCell;
                    return true;
                }
                else {
                    console.log(`${currentCell} is already placed on (${row}, ${col})`);
                    return false;
                }
            },
            resetBoard: () => board.forEach(row => row.fill(''))
        };
    }

    const createPlayer = (name, symbol) => ({ name, symbol })

    const P1 = createPlayer('P1', 'X');
    const P2 = createPlayer('P2', 'O');

    const GameBoard = createGameBoard();

    return { P1, P2, GameBoard };
})();

export default ticTacToeModule;
