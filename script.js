// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// const gameBoard = (() => {
//     let location = {
//         index: 0,
//         name: "Dojo"
//     }
    // let tilesDisplay = document.querySelectorAll(".tile")
//     let tileMarks = ["", "", "", "", "", "", "", "", ""]
//     return {tileMarks, tilesDisplay, location}
// })()


// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// const players = (() => {
//     const player = (playerNum, mark) => {
//         let character = {
//             index: 0,
//             name: "Shadow"
//         }
//         let playerName;
//         let score = 0
//         return {playerNum, mark, score, character, playerName}
//     }
//     let player1 = player(1, "x")
//     let player2 = player(2, "o")
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
//     document.querySelector(".start-button").onclick = () => {
//         _setPlayerCharacter()
//         _setGameLocation()
//     }
//     const _selectionDisplay = (() => {
//         const carets = document.querySelectorAll(".fa-caret-left, .fa-caret-right")
//         carets.forEach(caret => {
//             caret.onclick = (e) => {
//                 ancestor = e.target.parentElement
//                 if (ancestor.className.includes("1")) {
//                     selectionData.changeCharacter(e, 1)
//                     _updateCharSelDisplay(ancestor, 1)
//                 }
//                 else if (ancestor.className.includes("2")) {
//                     selectionData.changeCharacter(e, 2)
//                     _updateCharSelDisplay(ancestor, 2)
//                 }
//                 else {
//                     selectionData.changeLocation(e)
//                     _updateLocSelDisplay(ancestor)
//                 }
//                 }
//         })
//         function _updateCharSelDisplay(ancestor, playerNum) {
//             const playerCharacter = players[`player${playerNum}`].character.name
//             const characterPic = ancestor.querySelector(".avatar");
//             const characterName = ancestor.querySelector("input");
//             characterPic.src = `images/avatars/${playerCharacter}.png`
//             characterName.placeholder = playerCharacter
//          }  
//         function _updateLocSelDisplay(ancestor) {
//             const locationPic = ancestor.querySelector(".location-picture")
//             const locationName = ancestor.querySelector(".location-title")
//             const location = gameBoard.location.name
//             locationPic.src = `images/locations/${location}.png`
//             locationName.textContent = location
//          }
//     })()
//     const selectionData = (() => {
//         const characters = ["Shadow", "Lynx", "Hermit", "Butcher", 
//         "Wasp", "Widow", "Shogun", "Titan"]
//         const locations = ["Dojo", "Moon", "Chess-Yard", "Village", 
//         "Ships", "Fuji", "Burning-Town", "Neural-Network"]
    
//         function changeCharacter(e, playerNum) {
//             let playerCharacter = players[`player${playerNum}`].character
//             if (e.target.className.includes("left")) {
//                 playerCharacter.index === 0 ? playerCharacter.index = 7 
//                 : playerCharacter.index -= 1
//             }
//             else if (e.target.className.includes("right")) {
//                 playerCharacter.index === 7 ? playerCharacter.index = 0 
//                 : playerCharacter.index += 1
//             }
//             playerCharacter.name = characters[playerCharacter.index]
//         }
//         function changeLocation(e) {
//             let location = gameBoard.location;
//             if (e.target.className.includes("left")) {
//                 location.index === 0 ? location.index = 7 : location.index -= 1
//             }
//             else if (e.target.className.includes("right")) {
//                 location.index === 7 ? location.index = 0 : location.index += 1
//             }
//             location.name = locations[location.index]
//         }
//         return {characters, locations, changeCharacter, changeLocation}
//      })()

//     function _setPlayerCharacter() {
//         for (i = 1; i < 3; i++) {
//         const playerName = document.querySelector(`.player-${i}-select input`).value
//         players[`player${i}`].playerName = playerName
//         const playerCharacter = players[`player${i}`].character.name
//         const avatar = document.querySelector(`.player-${i} .avatar`)
//         const name = document.querySelector(`.player-${i} .name`)
//         name.textContent = playerName || playerCharacter
//         avatar.src = `images/avatars/${playerCharacter}.png`
//         }       
//      }
//     function _setGameLocation() {
//         const gameContainer = document.querySelector(".game-container")
//         const location = gameBoard.location.name
//         gameContainer.style.backgroundImage = `url(images/locations/${location}.png)`
//     }
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
//     document.querySelector(".restart-button").onclick = () => {
//         modals.toggleModal(modals.restartModal, "restart")
//         document.querySelector("#restart .yes").onclick = _restartGame
//     }

//     gameBoard.tilesDisplay.forEach((tileDisplay, index) => {
//     tileDisplay.onclick = () => {
//         if (isTileFilled(index) === true || gameInfo.gameStatus === "finished") {return}
//         gameBoard.tileMarks[index] = players.currentPlayer.mark
//         displayController.displayTileMarks()
//         _checkForGameOver()
//         players.changePlayerTurn()
//     }
//     })

//     function isTileFilled(index) {
//         return gameBoard.tileMarks[index] !== ""
//     }
    
//     function _checkForGameOver() {
//         if (_checkForWinner()) {
//             _increaseScore("win")   
//             _setWinTitle()
//             modals.toggleModal(modals.gameOverModal, "rematch", "win")
//         }
//         else if (_checkForTie()) {
//             _increaseScore("tie")
//             modals.toggleModal(modals.gameOverModal, "rematch", "tie")
//         }
//         if (_checkForWinner() || _checkForTie()) {
//             _toggleGame("stop")
//             displayController.displayScores()
//             document.querySelector("#rematch .yes").onclick = _rematchGame
//             document.querySelector("#rematch .no").onclick = () => {
//                 screen.changeScreen()
//                 _restartGame()
//             }
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
//     function _setWinTitle()  {
//         modals.gameOverModal.winTitle = `${players.currentPlayer.playerName 
//         || players.currentPlayer.character.name} Wins!`
//     }

//     return {gameInfo}
// })()



// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// const screen = (() => {
//     const next = document.querySelectorAll(".next")
//     const back = document.querySelectorAll(".back")
//     const home = document.querySelector(".home-button")
//     const screens = document.querySelectorAll(".screen")
//     let activeScreenNum = 0

//     next.forEach(button => {
//         button.addEventListener("click", changeScreen.bind(null, "next"))
//     })
//     back.forEach(button => {
//         button.addEventListener("click", changeScreen.bind(null, "back"))
//     })
//     home.onclick = () => {
//         modals.toggleModal(modals.quitModal, "quit")
//         document.querySelector("#quit .yes").onclick = changeScreen
//     }
//     function changeScreen(action) {
//         if (action === "next") activeScreenNum += 1
//         else if (action === "back") activeScreenNum -= 1
//         else activeScreenNum = 0

//         screens.forEach(screen => {
//             screen.classList.add("hide")
//         })
//         screens[activeScreenNum].classList.remove("hide")
//         console.log(activeScreenNum)
//     }
//     return {activeScreenNum, changeScreen}
// })()

// const modals = (() => {
//     let quitModal = {
//         title: "Do you want to quit?",
//         no: "Cancel",
//         yes: "Quit"
//     }
//     let restartModal = {
//         title: "Do you want to restart the whole game?",
//         no: "Cancel",
//         yes: "Restart"
//     }
//     let gameOverModal = {
//         winTitle: "",
//         tieTitle: "It's a tie!",
//         no: "Quit",
//         yes: "Rematch"
//     }
//     let modal = document.querySelector(".modal")
//     modal.querySelector(".no").addEventListener ("click", toggleModal.bind("", ""))
//     modal.querySelector(".yes").addEventListener("click", toggleModal.bind("", ""))
//     function toggleModal(modalType, name, gameResult) { 
//         document.querySelector(".modal-container").classList.toggle("modal-hide")
//         document.querySelector(".overlay").classList.toggle("overlay-close")
//         modal.classList.toggle("modal-close")
//         modal.id = name
//         if (gameResult === "win") modal.querySelector(".title").textContent = modalType.winTitle
//         else if (gameResult === "tie") modal.querySelector(".title").textContent = modalType.tieTitle
//         else modal.querySelector(".title").textContent = modalType.title
//         modal.querySelector(".no").textContent = modalType.no
//         modal.querySelector(".yes").textContent = modalType.yes
//     }
//     return {quitModal, restartModal, gameOverModal, toggleModal}
// })()






// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const gameData = (() => {
    
    const gameBoard = (() => {
        locationName = "Dojo"
        let tiles = ["", "", "", "", "", "", "", "", ""]
        return {tiles, locationName}
    })()

    const players = (() => {
        const player = (playerNum, mark) => {
            let name;
            let avatarName = "Shadow"
            let score = 0
            return {playerNum, mark, score, name, avatarName}
        }
        let player1 = player(1, "x-mark")
        let player2 = player(2, "o-mark")
        let tieScore = 0
        return {player1, player2, tieScore}
    })()

    const selection = (() => {
        let player1Index = 0
        let player2Index = 0
        let locationIndex = 0
        const characters = ["Shadow", "Lynx", "Hermit", "Butcher", 
        "Wasp", "Widow", "Shogun", "Titan"]
        const locations = ["Dojo", "Moon", "Chess-Yard", "Village", 
        "Ships", "Fuji", "Burning-Town", "Neural-Network"]
        return {characters, locations, player1Index, player2Index, locationIndex}
     })()

     const gameInfo = {
        gameOngoing: true,
        round: 1,
        turn: players.player1
    }

    const modals = (() => {
        let quitModal = {
            title: "Do you want to quit?",
            no: "Cancel",
            yes: "Quit"
        }
        let restartModal = {
            title: "Do you want to restart the whole game?",
            no: "Cancel",
            yes: "Restart"
        }
        let gameOverModal = {
            winTitle: "",
            tieTitle: "It's a tie!",
            no: "Quit",
            yes: "Rematch"
        }
        return {quitModal, restartModal, gameOverModal}
    })()

    return {selection, gameBoard, gameInfo, players, modals}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const gameMechanics = (() => {
     function changeAvatar(e, playerNum) {
        const selection = gameData.selection
        const index = `player${playerNum}Index`
        if (e.target.className.includes("left")) {
            selection[index] === 0 ?  selection[index] = 7 
            :  selection[index] -= 1
        }
        else if (e.target.className.includes("right")) {
            selection[index] === 7 ?  selection[index] = 0 
            :  selection[index] += 1
        }
        gameData.players[`player${playerNum}`].avatarName = 
        gameData.selection.characters[selection[index]]
    }
    function changeLocation(e) {
        const selection = gameData.selection
        const index = "locationIndex"
        if (e.target.className.includes("left")) {
            selection[index] === 0 ? selection[index] = 7 : selection[index] -= 1
        }
        else if (e.target.className.includes("right")) {
            selection[index] === 7 ? selection[index] = 0 : selection[index] += 1
        }
        gameData.gameBoard.locationName = 
        gameData.selection.locations[selection[index]]
    }
    function resetSelection() {
        let selection = gameData.selection
        selection.locationIndex = 0
        gameData.gameBoard.locationName = 
        gameData.selection.locations[selection.locationIndex]
        for (i = 1; i < 3; i++) {
            const avatarIndex = `player${i}Index`
            selection[avatarIndex] = 0
            gameData.players[`player${i}`].avatarName = 
            gameData.selection.characters[selection[avatarIndex]]         
        }
        displayController.updateAvatarSelection()
        displayController.updateLocationSelection()
    }

//gameboard
    function setTile(index) {
        gameData.gameBoard.tiles[index] = gameData.gameInfo.turn.mark
    }
    function changePlayerTurn() {
        gameData.gameInfo.turn === gameData.players.player1 ? gameData.gameInfo.turn = gameData.players.player2 : 
        gameData.gameInfo.turn = gameData.players.player1
        displayController.displayPlayerTurn()
    }
    function isTileFilled(index) {
        return gameData.gameBoard.tiles[index] !== ""
    }
    function checkForGameOver() {
        if (_checkForWinner()) {
            _increaseScore("win")  
            _setWinTitle()
            displayController.toggleModal(gameData.modals.gameOverModal, "rematch", "win")
        }
        else if (_checkForTie()) {
            _increaseScore("tie")
            displayController.toggleModal(gameData.modals.gameOverModal, "rematch", "tie")
        }
        if (_checkForWinner() || _checkForTie()) {
            _toggleGame("stop")
            displayController.displayScores()
            document.querySelector("#rematch .yes").onclick = rematchGame
            document.querySelector("#rematch .no").onclick = () => {
                displayController.toggleModal("")
                displayController.changeScreen("home")
                resetSelection()
                restartGame()
            }
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
            let isAWinCombination = winCombinations[i].every(index => {
                return gameData.gameBoard.tiles[index] === gameData.gameInfo.turn.mark
            })
            if (isAWinCombination === true) return true
        }
    }
    function _checkForTie() {
        return gameData.gameBoard.tiles.every(tile => {return tile !== ""}) 
    }
    function _increaseScore(result) {
        if (result === "win") gameData.gameInfo.turn.score += 1
        else if (result === "tie") gameData.players.tieScore += 1
    }
    function _setWinTitle()  {
        gameData.modals.gameOverModal.winTitle = `${gameData.gameInfo.turn.name 
        || gameData.gameInfo.turn.avatarName} Wins!`
    }
    function _toggleGame(action) {
        if (action === "start") gameData.gameInfo.gameOngoing = true 
        else if (action === "stop") gameData.gameInfo.gameOngoing = false
    }
    function restartGame() {
        gameData.gameBoard.tiles= ["", "", "", "", "", "", "", "", ""]
        gameData.gameInfo.turn = gameData.players.player1
        gameData.players.player1.score = 0
        gameData.players.player2.score = 0
        gameData.players.tieScore = 0
        gameData.gameInfo.round = 1
        displayController.displayTiles()
        displayController.displayScores()
        displayController.displayRound()
        displayController.displayPlayerTurn()
        _toggleGame("start")
    }  
    function rematchGame() {
        gameData.gameBoard.tiles = ["", "", "", "", "", "", "", "", ""]
        gameData.gameInfo.round += 1
        displayController.displayRound()
        displayController.displayTiles()
        _toggleGame("start")
    }
    return {changeAvatar, changeLocation, resetSelection, isTileFilled, checkForGameOver, 
        setTile, changePlayerTurn, restartGame, rematchGame}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const displayController = (() => {

    let currentScreen = 0
    function changeScreen(action) {
        const screens = document.querySelectorAll(".screen")
        if (action === "next") currentScreen += 1
        else if (action === "back") currentScreen -= 1
        else if (action === "home") currentScreen = 0
        screens.forEach(screen => {
            screen.classList.add("hide")
        })
        screens[currentScreen].classList.remove("hide")
    }
    function updateAvatarSelection() {
        for (i = 1; i < 3; i++) {
            const avatarPic = document.querySelector(`.player-${i}-select .avatar`);
            const nameInput = document.querySelector(`.player-${i}-select input`);
            const avatarName = gameData.players[`player${i}`].avatarName
            avatarPic.src = `images/avatars/${avatarName}.png`
            nameInput.placeholder = avatarName   
        }
    }  
    function updateLocationSelection(ancestor) {
        const locationPic = document.querySelector(".location-picture")
        const locationTitle = document.querySelector(".location-title")
        const locationName = gameData.gameBoard.locationName
        locationPic.src = `images/locations/${locationName}.png`
        locationTitle.textContent = locationName
    }
    function setPlayersAvatar() {
       for (i = 1; i < 3; i++) {
       const inputName = document.querySelector(`.player-${i}-select input`).value
       gameData.players[`player${i}`].name = inputName
       const avatarName = gameData.players[`player${i}`].avatarName
       const avatar = document.querySelector(`.player-${i} .avatar`)
       const name = document.querySelector(`.player-${i} .name`)
       name.textContent = inputName || avatarName
       avatar.src = `images/avatars/${avatarName}.png`
       }       
    }
    function setGameLocation() {
        const gameContainer = document.querySelector(".game-container")
        const location = gameData.gameBoard.locationName
        gameContainer.style.backgroundImage = `url(images/locations/${location}.png)`
    }

    let tilesDisplay = document.querySelectorAll(".tile")
    function displayTiles() {
        tilesDisplay.forEach((e, index) => {
            if (gameMechanics.isTileFilled(index)) {
                e.firstChild.style.backgroundImage = 
                `url(images/${gameData.gameBoard.tiles[index]}.png)`
            }
            else {
                e.firstChild.style.backgroundImage = ""
            }
            displayTileFilled()
        })
    }
    function displayTileFilled() {
        tilesDisplay.forEach((e, index) => {
            if (gameMechanics.isTileFilled(index)) e.classList.add("tile-filled")
            else e.classList.remove("tile-filled")
        })
    }
    function displayPlayerTurn() {
        const playerNum = gameData.gameInfo.turn.playerNum
        const playerTurn =  document.querySelector(`.player-${playerNum}`)
        for (i = 1; i < 3; i++) {
            document.querySelector(`.player-${i}`).classList.remove(`player-${i}-turn`)
            document.querySelector(`.player-${i} .turn`).textContent = ""
        }
        playerTurn.classList.add(`player-${playerNum}-turn`)
        playerTurn.querySelector(".turn").textContent = "Your Turn!"
    }
    function displayScores() {
        const scoreBoard = document.querySelector(".score-board")
        scoreBoard.textContent = `${gameData.players.player1.score} 
        - ${gameData.players.tieScore} - ${gameData.players.player2.score} `
    }
    function displayRound() {
        const round = document.querySelector('.round')
        round.textContent = `Round ${gameData.gameInfo.round}`
    }
    function toggleModal(modalType, name, gameResult) {
        let modalContainer = document.querySelector(".modal-container")
        let modal = document.querySelector(".modal")
        if (!modalContainer.className.includes("modal-hide")) {
            setTimeout(() => {
                setModalContent()
                modalContainer.classList.toggle("modal-hide")
            }, 200)
        }
        else {
            setModalContent()
            modalContainer.classList.toggle("modal-hide")
        }
        document.querySelector(".overlay").classList.toggle("overlay-close")
        modal.classList.toggle("modal-close")
        modal.id = name
        function setModalContent() {
            if (gameResult === "win") modal.querySelector(".title").textContent = modalType.winTitle
            else if (gameResult === "tie") modal.querySelector(".title").textContent = modalType.tieTitle
            else modal.querySelector(".title").textContent = modalType.title
            modal.querySelector(".no").textContent = modalType.no
            modal.querySelector(".yes").textContent = modalType.yes
        }
    }

    return {changeScreen, updateAvatarSelection, updateLocationSelection,
        tilesDisplay, displayTiles, displayPlayerTurn, displayScores, 
        displayRound, toggleModal, setPlayersAvatar, setGameLocation}
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


const gameInteractions = (() => {
    const screen = (() => { 
        document.querySelectorAll(".next").forEach(e => 
        e.addEventListener("click", displayController.changeScreen.bind(null, "next")))
        document.querySelectorAll(".back").forEach(e => 
        e.addEventListener("click", displayController.changeScreen.bind(null, "back")))
    })()

    const modals = (() => {
        let modal = document.querySelector(".modal")
        document.querySelector(".home-button").onclick = () => {
            displayController.toggleModal(gameData.modals.quitModal, "quit")
            document.querySelector("#quit .yes").onclick = () => {
                displayController.changeScreen("home")
                gameMechanics.resetSelection()
                gameMechanics.restartGame()
            }
            document.querySelector("#quit .no").onclick = () => displayController.toggleModal("")
        }
        document.querySelector(".restart-button").onclick = () => {
            displayController.toggleModal(gameData.modals.restartModal, "restart")
            document.querySelector("#restart .yes").onclick = gameMechanics.restartGame
            document.querySelector("#restart .no").onclick = () => displayController.toggleModal("")
        }

        modal.querySelector(".yes").addEventListener
        ("click", () => displayController.toggleModal(""))
    })()

    document.querySelector(".start-button").addEventListener("click", () => {
        displayController.setPlayersAvatar()
        displayController.setGameLocation()
    })
 
    const gameplay = (() => {
        displayController.tilesDisplay.forEach((tileDisplay, index) => {
            displayController.displayPlayerTurn()
            tileDisplay.onclick = () => {
                if (gameMechanics.isTileFilled(index) || !gameData.gameInfo.gameOngoing) return
                gameMechanics.setTile(index)
                displayController.displayTiles()
                gameMechanics.checkForGameOver()
                gameMechanics.changePlayerTurn()
            }
        })  
    })()

    const carets = document.querySelectorAll(".fa-caret-left, .fa-caret-right")
    carets.forEach(caret => {
        caret.onclick = e => {
            const ancestor = e.target.parentElement
            if (ancestor.className.includes("1")) gameMechanics.changeAvatar(e, 1)
            else if (ancestor.className.includes("2")) gameMechanics.changeAvatar(e, 2)
            else gameMechanics.changeLocation(e)
            displayController.updateAvatarSelection()
            displayController.updateLocationSelection()
        }
    })
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 