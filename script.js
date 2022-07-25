const gameBoard = (() => {
    let tilesDisplay = document.querySelectorAll(".tile")
    let tileMarks = []

    return {tileMarks, tilesDisplay}
})()





const players = (() => {
    const player = (name, playerNum) => {
        let mark;

        playerNum === 1 ? mark = "x":
        mark = "o"

        let score = 0
        const scoreDisplay = document.querySelector(`.p${playerNum}-score`)

        return {name, playerNum, mark, score, scoreDisplay}
    }
    
    const player1 = player("Foo", 1)
    const player2 = player("Bar", 2)
    let currentPlayer = player1

    function changePlayerTurn() {
        this.currentPlayer === player1 ? this.currentPlayer = player2 : 
        this.currentPlayer = player1
    }

    return {player1, player2, currentPlayer, changePlayerTurn}
})()





const gameplay = (() => {

    let _gameStatus = "ongoing"
    let _tieScore = 0
    const _tieScoreDisplay = document.querySelector(".tie-score")
    const _restartButton = document.querySelector(".restart")
    const _rematchButton = document.querySelector(".rematch")

    gameBoard.tilesDisplay.forEach((tileDisplay, index) => {
    tileDisplay.onclick = () => {
        
        if (isTileEmpty(index) === true && _gameStatus === "ongoing") {

            gameBoard.tileMarks[index] = players.currentPlayer.mark
            displayTileMarks()

            if (checkForWinner(players.currentPlayer.mark)) {
                console.log(`Player ${players.currentPlayer.playerNum} wins the game!`)
                increaseScore("win", players.currentPlayer)
                toggleGame("stop")

            }
            else if (checkForTie()) {
                console.log("It's a tie!")
                increaseScore("tie", _tieScore, _tieScoreDisplay)
                toggleGame("stop")
            }

            console.log("player change!")
            players.changePlayerTurn()

        }
    }

    })

    _restartButton.onclick = restartGame
    _rematchButton.onclick = rematchGame

    function isTileEmpty(index) {
        if (gameBoard.tileMarks[index] === undefined) return true
    }

    function displayTileMarks() {
        gameBoard.tilesDisplay.forEach((tile, index) => {
            tile.textContent = gameBoard.tileMarks[index]
        })
    }
    
    function checkForWinner(currentMark) {
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        let isThereAWinner;
        winCombinations.forEach((combination) => {
            let isAWinCombination = combination.every((indexReference) => {
                return gameBoard.tileMarks[indexReference] === currentMark
            })
            if (isAWinCombination === true) isThereAWinner = true
        })
        return isThereAWinner
    }

    function checkForTie() {
        let isThereATie;
        for (i = 0; i < 9; i++) {
            if (gameBoard.tileMarks[i] === undefined) {
                isThereATie = false
                break;
            }
            else isThereATie = true
        }
        return isThereATie
    }

    function increaseScore(result, whatToIncrease, tieDisplay) {
        if (result === "win") {
            whatToIncrease.score += 1
            whatToIncrease.scoreDisplay.textContent = 
            `Player ${whatToIncrease.playerNum} Score: ${whatToIncrease.score}`
        }
        else if (result === "tie") {
            whatToIncrease += 1
            tieDisplay.textContent = `Tie: ${whatToIncrease}`
        }
    }

    function toggleGame(status) {
        status === "start" ? _gameStatus = "ongoing" :
        _gameStatus = "finished"
    }

    function restartGame() {
        gameBoard.tileMarks = []
        gameBoard.tilesDisplay.forEach((tile, index) => {
            tile.textContent = gameBoard.tileMarks[index]
        })
        players.player1.score = 0
        players.player2.score = 0
        players.player1.scoreDisplay.textContent = "Player 1 Score: 0"
        players.player1.scoreDisplay.textContent = "Player 1 Score: 0"
        toggleGame("start")
    }  
    function rematchGame() {
        gameBoard.tileMarks = []
        gameBoard.tilesDisplay.forEach((tile, index) => {
            tile.textContent = gameBoard.tileMarks[index]
        })
        toggleGame("start")
    }

    return {_gameStatus, checkForWinner, restartGame, displayTileMarks, checkForTie}
})()