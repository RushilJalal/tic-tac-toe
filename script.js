const ticTacToeModule = (() => {

    const createGameBoard = () => {
        const board = Array.from({ length: 3 }, () => Array(3).fill(''));
        return {
            getBoard: () => board,

            markCell: (row, col, player) => {
                if (board[row][col] === '') {
                    board[row][col] = player.symbol;
                    return true;
                }
                return false;
            },

            resetBoard: () => board.forEach(row => row.fill(''))
        };
    }

    const createPlayer = (name, symbol) => ({ name, symbol })

    const P1 = createPlayer('rushil', 'X');
    const P2 = createPlayer('arhaan', 'O');

    const GameBoard = createGameBoard();

    return { P1, P2, GameBoard };
})();

console.log(ticTacToeModule.P1);
ticTacToeModule.GameBoard.markCell(0, 0, ticTacToeModule.P1);
console.log(ticTacToeModule.GameBoard.getBoard());






