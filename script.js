// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const gameBoard = (() => {
    let tilesDisplay = document.querySelectorAll(".tile")
    let tileMarks = ["", "", "", "", "", "", "", "", ""]

    return {tileMarks, tilesDisplay}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const players = (() => {
    const player = (name, playerNum, mark) => {
        let score = 0
        
        return {name, playerNum, mark, score}
    }
    
    const player1 = player("Foo", 1, "x")
    const player2 = player("Bar", 2, "o")
    let currentPlayer = player1
    let tieScore = 0

    function changePlayerTurn() {
        this.currentPlayer === player1 ? this.currentPlayer = player2 : 
        this.currentPlayer = player1
    }

    return {player1, player2, currentPlayer, tieScore, changePlayerTurn}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const displayController = (() => {
    function displayTileMarks() {
        gameBoard.tilesDisplay.forEach((tile, index) => {
            tile.textContent = gameBoard.tileMarks[index]
        })
    }

    function displayScores() {
        const scoreBoard = document.querySelector(".score-board")
        scoreBoard.textContent = `${players.player1.score} 
        - ${players.tieScore} - ${players.player2.score} `
    }

    function displayRound() {
        const round = document.querySelector('.round')
        round.textContent = `Round ${gameMechanics.gameInfo.round}`
    }
    return {displayTileMarks, displayScores, displayRound}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const gameMechanics = (() => {
    let gameInfo = {
        gameStatus: "ongoing",
        round: 1
    }
    // const _restartButton = document.querySelector(".restart")
    // const _rematchButton = document.querySelector(".rematch")
    // _restartButton.onclick = _restartGame
    // _rematchButton.onclick = _rematchGame

    gameBoard.tilesDisplay.forEach((tileDisplay, index) => {
    tileDisplay.onclick = () => {
        if (isTileFilled(index) === true || gameInfo.gameStatus === "finished") {return}

        gameBoard.tileMarks[index] = players.currentPlayer.mark
        displayController.displayTileMarks()
        _checkForGameOver()
        console.log("player change!")
        players.changePlayerTurn()
        if (gameInfo.gameStatus === "finished") console.log("Game Over")
    }
    })

    function isTileFilled(index) {
        return gameBoard.tileMarks[index] !== ""
    }
    

    function _checkForGameOver() {
        if (_checkForWinner()) {
            console.log(`Player ${players.currentPlayer.playerNum} wins the game!`)
            _increaseScore("win")
            _toggleGame("stop")
            displayController.displayScores()
        }
        else if (_checkForTie()) {
            console.log("It's a tie!")
            _increaseScore("tie")
            _toggleGame("stop")
            displayController.displayScores()
        }
    }

    function _checkForWinner() {
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
        for (i = 0; i < winCombinations.length; i++) {
            let isAWinCombination = winCombinations[i].every((indexReference) => {
                return gameBoard.tileMarks[indexReference] === players.currentPlayer.mark
            })
            if (isAWinCombination === true) return true
        }
        return false
    }

    function _checkForTie() {
        let isThereATie = gameBoard.tileMarks.every(tile => {return tile !== ""})
        return isThereATie
    }

    function _increaseScore(result) {
        if (result === "win") players.currentPlayer.score += 1
        else if (result === "tie") players.tieScore += 1
    }

    function _toggleGame(status) {
        if (status === "start") gameInfo.gameStatus = "ongoing" 
        else if (status === "stop")gameInfo.gameStatus = "finished"
    }

    function _restartGame() {
        gameBoard.tileMarks = ["", "", "", "", "", "", "", "", ""]
        gameBoard.tilesDisplay.forEach((tile, index) => {
            tile.textContent = gameBoard.tileMarks[index]
        })
        players.currentPlayer = players.player1
        players.player1.score = 0
        players.player2.score = 0
        players.tieScore = 0
        gameInfo.round = 1
        displayController.displayScores()
        displayController.displayRound()
        _toggleGame("start")
    }  

    function _rematchGame() {
        gameBoard.tileMarks = ["", "", "", "", "", "", "", "", ""]
        gameBoard.tilesDisplay.forEach((tile, index) => {
            tile.textContent = gameBoard.tileMarks[index]
        })
        gameInfo.round += 1
        displayController.displayRound()
        _toggleGame("start")
    }

    return {gameInfo}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


function setPlace(place) {
    const body = document.querySelector("body")
    body.style.backgroundImage = `url("${place}.png")`
}