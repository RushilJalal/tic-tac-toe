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


const gameFlowControllerModule = (() => {
    let currentPlayer = ticTacToeModule.P1;
    let gameActive = true;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === ticTacToeModule.P1) ? ticTacToeModule.P2 : ticTacToeModule.P1;
    }

    const handleCellClick = (row, col) => {
        const win = document.querySelector('.win-message');
        const message = document.querySelector('.chance-message');
        if (!gameActive) {
            console.log("Game over!");
            message.textContent = 'Game over!';
            return;
        }

        const marked = ticTacToeModule.GameBoard.markCell(row, col, currentPlayer);

        if (marked) {
            console.log(`${currentPlayer.name} marked cell (${row}, ${col}) with ${currentPlayer.symbol}`);
            message.textContent = `${currentPlayer.name} marked cell (${row}, ${col}) with ${currentPlayer.symbol}`;
            ticTacToeModule.GameBoard.showBoard();

            if (checkForWinner()) {
                console.log(`${currentPlayer.name} wins!!`);
                win.textContent = `${currentPlayer.name} wins!!`;
                gameActive = false;
            }

            else if (isBoardFull()) {
                console.log('Board is full. Its a tie!');
                win.textContent = 'Board is full. Its a tie!';
                gameActive = false;
            }

            else
                switchPlayer();
        }
        console.log(ticTacToeModule.GameBoard.showBoard());
    }

    const isBoardFull = () => {
        const board = ticTacToeModule.GameBoard.showBoard();

        for (const row of board) {
            for (const cell of row) {
                if (cell === '')
                    return false;
            }
        }
        return true;
    }

    const checkForWinner = () => {
        const board = ticTacToeModule.GameBoard.showBoard();
        //check for horizontal win
        for (let i = 0; i < board.length; i++) {
            if (checkRow(i))
                return true;
        }

        //check for vertical win
        for (let i = 0; i < board.length; i++) {
            if (checkCol(i))
                return true;
        }

        //check for diagonal/antidiagonal win
        if (checkDiagonal() || checkAntiDiagonal())
            return true;
    }


    const checkRow = (row) => {
        const board = ticTacToeModule.GameBoard.showBoard();
        return (board[row][0] !== '' && board[row][0] === board[row][1] && board[row][1] === board[row][2]);
    }

    const checkCol = (col) => {
        const board = ticTacToeModule.GameBoard.showBoard();
        return (board[0][col] !== '' && board[0][col] === board[1][col] && board[1][col] === board[2][col]);
    }

    const checkDiagonal = () => {
        const board = ticTacToeModule.GameBoard.showBoard();
        return (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]);
    }

    const checkAntiDiagonal = () => {
        const board = ticTacToeModule.GameBoard.showBoard();
        return (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]);
    }

    return {
        handleCellClick,
        resetGame: () => {
            ticTacToeModule.GameBoard.resetBoard();
            gameActive = true;
            currentPlayer = ticTacToeModule.P1;
            console.log("Game restarts. Its P1's chance!");
        }
    }
})();

const DOMControllerModule = (() => {
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

    return {
        handleSquareClick,
        updateBoardDisplay
    };
})();

DOMControllerModule.handleSquareClick();







