import ticTacToeModule from "./tictactoe";
import gameFlowControllerModule from './gameflowcontroller';

const DOMControllerModule = (() => {
    const win = document.querySelector('.win-message');
    const message = document.querySelector('.chance-message');

    //UI renderer
    const updateBoardDisplay = () => {
        const board = ticTacToeModule.GameBoard.showBoard();
        const squares = document.querySelectorAll('.square');

        squares.forEach((square, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            square.textContent = board[row][col];
        });
    }

    const handleSquareClick = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', () => {
                const row = square.getAttribute('row');
                const col = square.getAttribute('col');
                gameFlowControllerModule.handleCellClick(row, col);
                updateBoardDisplay();
            });
        });
    }

    const resetButton = document.querySelector('#resetButton');
    resetButton.addEventListener('click', () => {
        gameFlowControllerModule.resetGame();
        win.textContent = '';
        message.textContent = '';
    })

    return {
        handleSquareClick,
        updateBoardDisplay
    };
})();

DOMControllerModule.handleSquareClick();

export default DOMControllerModule;