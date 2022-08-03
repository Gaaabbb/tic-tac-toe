// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// const gameBoard = (() => {
//     let tilesDisplay = document.querySelectorAll(".tile")
//     let tileMarks = ["", "", "", "", "", "", "", "", ""]

//     return {tileMarks, tilesDisplay}
// })()


// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// const players = (() => {
//     const player = (name, playerNum, mark) => {
//         let score = 0
        
//         return {name, playerNum, mark, score}
//     }
    
//     const player1 = player("Foo", 1, "x")
//     const player2 = player("Bar", 2, "o")
//     let currentPlayer = player1
//     let tieScore = 0

//     function changePlayerTurn() {
//         this.currentPlayer === player1 ? this.currentPlayer = player2 : 
//         this.currentPlayer = player1
//     }

//     return {player1, player2, currentPlayer, tieScore, changePlayerTurn}
// })()


// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// const displayController = (() => {
//     function displayTileMarks() {
//         gameBoard.tilesDisplay.forEach((tile, index) => {
//             tile.textContent = gameBoard.tileMarks[index]
//         })
//     }

//     function displayScores() {
//         const scoreBoard = document.querySelector(".score-board")
//         scoreBoard.textContent = `${players.player1.score} 
//         - ${players.tieScore} - ${players.player2.score} `
//     }

//     function displayRound() {
//         const round = document.querySelector('.round')
//         round.textContent = `Round ${gameMechanics.gameInfo.round}`
//     }
//     return {displayTileMarks, displayScores, displayRound}
// })()


// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// const gameMechanics = (() => {
//     let gameInfo = {
//         gameStatus: "ongoing",
//         round: 1
//     }
//     // const _restartButton = document.querySelector(".restart")
//     // const _rematchButton = document.querySelector(".rematch")
//     // _restartButton.onclick = _restartGame
//     // _rematchButton.onclick = _rematchGame

//     gameBoard.tilesDisplay.forEach((tileDisplay, index) => {
//     tileDisplay.onclick = () => {
//         if (isTileFilled(index) === true || gameInfo.gameStatus === "finished") {return}

//         gameBoard.tileMarks[index] = players.currentPlayer.mark
//         displayController.displayTileMarks()
//         _checkForGameOver()
//         console.log("player change!")
//         players.changePlayerTurn()
//         if (gameInfo.gameStatus === "finished") console.log("Game Over")
//     }
//     })

//     function isTileFilled(index) {
//         return gameBoard.tileMarks[index] !== ""
//     }
    

//     function _checkForGameOver() {
//         if (_checkForWinner()) {
//             console.log(`Player ${players.currentPlayer.playerNum} wins the game!`)
//             _increaseScore("win")
//             _toggleGame("stop")
//             displayController.displayScores()
//         }
//         else if (_checkForTie()) {
//             console.log("It's a tie!")
//             _increaseScore("tie")
//             _toggleGame("stop")
//             displayController.displayScores()
//         }
//     }

//     function _checkForWinner() {
//         const winCombinations = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6]
//         ]
//         for (i = 0; i < winCombinations.length; i++) {
//             let isAWinCombination = winCombinations[i].every((indexReference) => {
//                 return gameBoard.tileMarks[indexReference] === players.currentPlayer.mark
//             })
//             if (isAWinCombination === true) return true
//         }
//         return false
//     }

//     function _checkForTie() {
//         let isThereATie = gameBoard.tileMarks.every(tile => {return tile !== ""})
//         return isThereATie
//     }

//     function _increaseScore(result) {
//         if (result === "win") players.currentPlayer.score += 1
//         else if (result === "tie") players.tieScore += 1
//     }

//     function _toggleGame(status) {
//         if (status === "start") gameInfo.gameStatus = "ongoing" 
//         else if (status === "stop")gameInfo.gameStatus = "finished"
//     }

//     function _restartGame() {
//         gameBoard.tileMarks = ["", "", "", "", "", "", "", "", ""]
//         gameBoard.tilesDisplay.forEach((tile, index) => {
//             tile.textContent = gameBoard.tileMarks[index]
//         })
//         players.currentPlayer = players.player1
//         players.player1.score = 0
//         players.player2.score = 0
//         players.tieScore = 0
//         gameInfo.round = 1
//         displayController.displayScores()
//         displayController.displayRound()
//         _toggleGame("start")
//     }  

//     function _rematchGame() {
//         gameBoard.tileMarks = ["", "", "", "", "", "", "", "", ""]
//         gameBoard.tilesDisplay.forEach((tile, index) => {
//             tile.textContent = gameBoard.tileMarks[index]
//         })
//         gameInfo.round += 1
//         displayController.displayRound()
//         _toggleGame("start")
//     }

//     return {gameInfo}
// })()


// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// function setPlace(place) {
//     const body = document.querySelector("body")
//     body.style.backgroundImage = `url("${place}.png")`
// }


// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// const screen = (() => {
//     const nextButtons = document.querySelectorAll(".next")
//     const backButtons = document.querySelectorAll(".back")
//     const homeButton = document.querySelector(".home-button")
//     const screens = document.querySelectorAll(".screen")
//     let activeScreenNum = 0

//     nextButtons.forEach(nextButton => {
//         nextButton.onclick = changeScreen.bind(null, "next")
//     })
//     backButtons.forEach(backButton => {
//         backButton.onclick = changeScreen.bind(null, "back")
//     })
//     homeButton.onclick = changeScreen.bind(null, "home")

//     function changeScreen(action) {
//         if (action === "next") activeScreenNum += 1
//         else if (action === "back") activeScreenNum -= 1
//         else activeScreenNum = 0

//         screens.forEach(screen => {
//             screen.classList.add("hide")
//         })
//         screens[activeScreenNum].classList.remove("hide")
//     }
// })()



// function toggleModal() {
//     document.querySelector(".modal-container").classList.toggle("modal-hide")
//     document.querySelector(".modal").classList.toggle("modal-close")
//     document.querySelector(".overlay").classList.toggle("overlay-close")

// }













// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const gameBoard = (() => {
    let location = {
        index: 0,
        name: "Dojo"
    }
    let tilesDisplay = document.querySelectorAll(".tile")
    let tileMarks = ["", "", "", "", "", "", "", "", ""]

    return {tileMarks, tilesDisplay, location}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const players = (() => {
    
    const player = (playerNum, mark) => {
        let character = {
            index: 0,
            name: "Shadow"
        }
        let playerName;
        let score = 0
        
        return {playerNum, mark, score, character, playerName}
    }
    
    let player1 = player(1, "x")
    let player2 = player(2, "o")
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
    const carets = document.querySelectorAll(".fa-caret-left, .fa-caret-right")
    carets.forEach(caret => {
    caret.onclick = (e) => {
        ancestor = e.target.parentElement
        if (ancestor.className.includes("1")) {
            selectionData.changeCharacter(e, 1)
            _updateCharSelDisplay(ancestor, 1)
        }
        else if (ancestor.className.includes("2")) {
            selectionData.changeCharacter(e, 2)
            _updateCharSelDisplay(ancestor, 2)
        }
        else {
            selectionData.changeLocation(e)
            _updateLocSelDisplay(ancestor)
        }
        }
    })

    document.querySelector(".start-button").onclick = () => {
        _setPlayerCharacter()
        _setGameLocation()
    }

    function _updateCharSelDisplay(ancestor, playerNum) {
        const playerCharacter = players[`player${playerNum}`].character.name
        const characterPic = ancestor.querySelector(".avatar");
        const characterName = ancestor.querySelector("input");
        characterPic.src = `images/avatars/${playerCharacter}.png`
        characterName.placeholder = playerCharacter
     }
    
    function _updateLocSelDisplay(ancestor) {
        const locationPic = ancestor.querySelector(".location-picture")
        const locationName = ancestor.querySelector(".location-name")
        const location = gameBoard.location.name
    
        locationPic.src = `images/locations/${location}.png`
        locationName.textContent = location
     }

    function _setPlayerCharacter() {
        for (i = 1; i < 3; i++) {
        const playerName = document.querySelector(`.player-${i}-select input`).value
        players[`player${i}`].playerName = playerName
        const playerCharacter = players[`player${i}`].character.name
        const avatar = document.querySelector(`.player-${i} .avatar`)
        const name = document.querySelector(`.player-${i} .name`)
        name.textContent = playerName || playerCharacter
        avatar.src = `images/avatars/${playerCharacter}.png`
        }       
     }
    function _setGameLocation() {
        const gameContainer = document.querySelector(".game-container")
        const location = gameBoard.location.name
        gameContainer.style.backgroundImage = `url(images/locations/${location}.png)`
    }

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


const screen = (() => {
    const next = document.querySelectorAll(".next")
    const back = document.querySelectorAll(".back")
    const home = document.querySelector(".home-button")
    const screens = document.querySelectorAll(".screen")
    let activeScreenNum = 0

    next.forEach(button => {
        button.addEventListener("click", changeScreen.bind(null, "next"))
    })
    back.forEach(button => {
        button.addEventListener("click", changeScreen.bind(null, "back"))
    })
    home.onclick = changeScreen.bind(null, "home")

    function changeScreen(action) {
        if (action === "next") activeScreenNum += 1
        else if (action === "back") activeScreenNum -= 1
        else activeScreenNum = 0

        screens.forEach(screen => {
            screen.classList.add("hide")
        })
        screens[activeScreenNum].classList.remove("hide")
        console.log(activeScreenNum)
    }
    return {activeScreenNum}
})()

function toggleModal() {
    document.querySelector(".modal-container").classList.toggle("modal-hide")
    document.querySelector(".modal").classList.toggle("modal-close")
    document.querySelector(".overlay").classList.toggle("overlay-close")

}

const selectionData = (() => {
    const characters = ["Shadow", "Lynx", "Hermit", "Butcher", 
    "Wasp", "Widow", "Shogun", "Titan"]
    const locations = ["Dojo", "Moon", "Chess-Yard", "Village", 
    "Ships", "Fuji", "Burning-Town", "Neural-Network"]

    function changeCharacter(e, playerNum) {
        let playerCharacter = players[`player${playerNum}`].character
        if (e.target.className.includes("left")) {
            playerCharacter.index === 0 ? playerCharacter.index = 7 
            : playerCharacter.index -= 1
        }
        else if (e.target.className.includes("right")) {
            playerCharacter.index === 7 ? playerCharacter.index = 0 
            : playerCharacter.index += 1
        }
        playerCharacter.name = characters[playerCharacter.index]
    }
    function changeLocation(e) {
        let location = gameBoard.location;
        if (e.target.className.includes("left")) {
            location.index === 0 ? location.index = 7 : location.index -= 1
        }
        else if (e.target.className.includes("right")) {
            location.index === 7 ? location.index = 0 : location.index += 1
        }
        location.name = locations[location.index]
    }
    return {characters, locations, changeCharacter, changeLocation}
 })()
