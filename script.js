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
        const player1 = document.querySelector(`.p1-score`)
        const player2 = document.querySelector(`.p2-score`)
        const tie = document.querySelector(".tie-score")
        player1.textContent = `Player 1 Score: ${players.player1.score}`
        player2.textContent = `Player 2 Score: ${players.player2.score}`
        tie.textContent = `Tie: ${players.tieScore}`
    }

    function displayRound() {
        const round = document.querySelector('.round')
        round.textContent = `Round: ${gameMechanics.gameInfo.round}`
    }
    return {displayTileMarks, displayScores, displayRound}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const gameMechanics = (() => {
    let gameInfo = {
        gameStatus: "ongoing",
        round: 1
    }
    const _restartButton = document.querySelector(".restart")
    const _rematchButton = document.querySelector(".rematch")

    gameBoard.tilesDisplay.forEach((tileDisplay, index) => {
    tileDisplay.onclick = () => {
        if (isTileFilled(index) === true || gameInfo.gameStatus === "finished") {return}

        gameBoard.tileMarks[index] = players.currentPlayer.mark
        displayController.displayTileMarks()
        checkForGameOver()
        console.log("player change!")
        players.changePlayerTurn()
        
        if (gameInfo.gameStatus === "finished") console.log("Game Over")
    }

    })

    _restartButton.onclick = restartGame
    _rematchButton.onclick = rematchGame

    function isTileFilled(index) {
        return gameBoard.tileMarks[index] !== ""
    }
    

    function checkForGameOver() {
        if (checkForWinner()) {
            console.log(`Player ${players.currentPlayer.playerNum} wins the game!`)
            increaseScore("win")
            toggleGame("stop")
            displayController.displayScores()
        }
        else if (checkForTie()) {
            console.log("It's a tie!")
            increaseScore("tie")
            toggleGame("stop")
            displayController.displayScores()
        }
    }

    function checkForWinner() {
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

    function checkForTie() {
        let isThereATie = gameBoard.tileMarks.every(tile => {return tile !== ""})
        return isThereATie
    }

    function increaseScore(result) {
        if (result === "win") players.currentPlayer.score += 1
        else if (result === "tie") players.tieScore += 1
    }

    function toggleGame(status) {
        if (status === "start") gameInfo.gameStatus = "ongoing" 
        else if (status === "stop")gameInfo.gameStatus = "finished"
    }

    function restartGame() {
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
        toggleGame("start")
    }  

    function rematchGame() {
        gameBoard.tileMarks = ["", "", "", "", "", "", "", "", ""]
        gameBoard.tilesDisplay.forEach((tile, index) => {
            tile.textContent = gameBoard.tileMarks[index]
        })
        gameInfo.round += 1
        displayController.displayRound()
        toggleGame("start")
    }

    return {gameInfo}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


function setPlace(place) {
    const body = document.querySelector("body")
    body.style.backgroundImage = `url("${place}.png")`
}