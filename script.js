// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - G A M E - D A T A - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //


const gameData = (() => {
    const gameBoard = (() => {
        locationName = "Dojo";
        let tiles = ["", "", "", "", "", "", "", "", ""];
        return {tiles, locationName};
    })()
    const players = (() => {
        const player = (playerNum, mark) => {
            let name;
            let avatarName = "Shadow";
            let score = 0;
            return {playerNum, mark, score, name, avatarName};
        }
        let player1 = player(1, "x-mark");
        let player2 = player(2, "o-mark");
        let tieScore = 0;
        return {player1, player2, tieScore};
    })()
    const selection = (() => {
        let player1Index = 0;
        let player2Index = 0;
        let locationIndex = 0;
        const characters = ["Shadow", "Lynx", "Hermit", "Butcher", 
        "Wasp", "Widow", "Shogun", "Titan"];
        const locations = ["Dojo", "Moon", "Chess-Yard", "Village", 
        "Ships", "Fuji", "Burning-Town", "Neural-Network"];
        return {characters, locations, player1Index, player2Index, locationIndex};
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
        return {quitModal, restartModal, gameOverModal};
    })()
    return {selection, gameBoard, gameInfo, players, modals};
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - G A M E - M E C H A N I C S - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const gameMechanics = (() => {
    //Avatar and Location Selection Functions
    function changeAvatar(e, playerNum) {
        const selection = gameData.selection;
        const index = `player${playerNum}Index`;
        if (e.target.className.includes("left")) {
            selection[index] === 0 ?  selection[index] = 7 
            :  selection[index] -= 1;
        }
        else if (e.target.className.includes("right")) {
            selection[index] === 7 ?  selection[index] = 0 
            :  selection[index] += 1;
        }
        gameData.players[`player${playerNum}`].avatarName = 
        gameData.selection.characters[selection[index]];
    }
    function changeLocation(e) {
        const selection = gameData.selection;
        const index = "locationIndex";
        if (e.target.className.includes("left")) {
            selection[index] === 0 ? selection[index] = 7 
            : selection[index] -= 1;
        }
        else if (e.target.className.includes("right")) {
            selection[index] === 7 ? selection[index] = 0 
            : selection[index] += 1;
        }
        gameData.gameBoard.locationName = 
        gameData.selection.locations[selection[index]];
    }
    function resetSelection() {
        let selection = gameData.selection;
        selection.locationIndex = 0;
        gameData.gameBoard.locationName = 
        gameData.selection.locations[selection.locationIndex];
        for (i = 1; i < 3; i++) {
            const avatarIndex = `player${i}Index`;
            selection[avatarIndex] = 0;
            gameData.players[`player${i}`].avatarName = 
            gameData.selection.characters[selection[avatarIndex]];        
        }
        displayController.updateAvatarSelection();
        displayController.updateLocationSelection();
    }

    //Game Functions
    function setTile(index) {
        gameData.gameBoard.tiles[index] = gameData.gameInfo.turn.mark;
    }
    function changePlayerTurn() {
        gameData.gameInfo.turn === gameData.players.player1 ? 
        gameData.gameInfo.turn = gameData.players.player2
        : gameData.gameInfo.turn = gameData.players.player1;
        displayController.displayPlayerTurn();
    }
    function isTileFilled(index) {
        return gameData.gameBoard.tiles[index] !== "";
    }
    function checkForGameOver() {
        if (checkForWinner()) {
            _increaseScore("win");
            _setWinTitle();
            displayController.displayWinner()
            setTimeout(() => {
                displayController.toggleModal
                (gameData.modals.gameOverModal, "rematch", "win");
                displayController.rematchModal();
            }, 1600);
            
        }
        else if (_checkForTie()) {
            _increaseScore("tie");
            displayController.toggleModal
            (gameData.modals.gameOverModal, "rematch", "tie");
            displayController.rematchModal();
        }
        if (checkForWinner() || _checkForTie()) {
            _toggleGame("stop");
            displayController.displayScores();
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
        ];
        for (i = 0; i < winCombinations.length; i++) {
            let isAWinCombination = winCombinations[i].every(index => {
                return gameData.gameBoard.tiles[index] 
                === gameData.gameInfo.turn.mark;
            })
            if (isAWinCombination === true) return winCombinations[i];
        }
    }
    function _checkForTie() {
        return gameData.gameBoard.tiles.every(tile => {return tile !== ""});
    }
    function _increaseScore(result) {
        if (result === "win") gameData.gameInfo.turn.score += 1;
        else if (result === "tie") gameData.players.tieScore += 1;
    }
    function _setWinTitle()  {
        gameData.modals.gameOverModal.winTitle = `${gameData.gameInfo.turn.name 
        || gameData.gameInfo.turn.avatarName} Wins!`;
    }
    function _toggleGame(action) {
        if (action === "start") gameData.gameInfo.gameOngoing = true;
        else if (action === "stop") gameData.gameInfo.gameOngoing = false;
    }
    function restartGame() {
        gameData.gameBoard.tiles= ["", "", "", "", "", "", "", "", ""];
        gameData.gameInfo.turn = gameData.players.player1;
        gameData.players.player1.score = 0;
        gameData.players.player2.score = 0;
        gameData.players.tieScore = 0;
        gameData.gameInfo.round = 1;
        displayController.displayTiles();
        displayController.displayScores();
        displayController.displayRound();
        displayController.displayPlayerTurn();
        _toggleGame("start");
    }  
    function rematchGame() {
        gameData.gameBoard.tiles = ["", "", "", "", "", "", "", "", ""];
        gameData.gameInfo.round += 1;
        displayController.displayRound();
        displayController.displayTiles();
        _toggleGame("start");
    }
    return {changeAvatar, changeLocation, resetSelection, isTileFilled, checkForGameOver, 
        setTile, changePlayerTurn, restartGame, rematchGame, checkForWinner};
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - D I S P L A Y - C O N T R O L L E R - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //


const displayController = (() => {
    let currentScreen = 0;
    function changeScreen(action) {
        const screens = document.querySelectorAll(".screen");
        if (action === "next") currentScreen += 1;
        else if (action === "back") currentScreen -= 1;
        else if (action === "home") currentScreen = 0;
        screens.forEach(screen => {
            screen.classList.add("hide");
        });
        screens[currentScreen].classList.remove("hide");
    }
    //Avatar and Location Selection Display Functions
    function updateAvatarSelection() {
        for (i = 1; i < 3; i++) {
            const avatarPic = document.querySelector(`.player-${i}-select .avatar`);
            const nameInput = document.querySelector(`.player-${i}-select input`);
            const avatarName = gameData.players[`player${i}`].avatarName;
            avatarPic.src = `images/avatars/${avatarName}.png`;
            nameInput.placeholder = avatarName;
        }
    }  
    function updateLocationSelection(ancestor) {
        const locationPic = document.querySelector(".location-picture");
        const locationTitle = document.querySelector(".location-title");
        const locationName = gameData.gameBoard.locationName;
        locationPic.src = `images/locations/${locationName}.png`;
        locationTitle.textContent = locationName;
    }
    function setPlayersAvatar() {
       for (i = 1; i < 3; i++) {
       const inputName = document.querySelector(`.player-${i}-select input`).value;
       gameData.players[`player${i}`].name = inputName;
       const avatarName = gameData.players[`player${i}`].avatarName;
       const avatar = document.querySelector(`.player-${i} .avatar`);
       const name = document.querySelector(`.player-${i} .name`);
       name.textContent = inputName || avatarName;
       avatar.src = `images/avatars/${avatarName}.png`;
       }       
    }
    function setGameLocation() {
        const gameContainer = document.querySelector(".game-container");
        const location = gameData.gameBoard.locationName;
        gameContainer.style.backgroundImage = `url(images/locations/${location}.png)`;
    }

    //Gameboard Display Functions
    let tilesDisplay = document.querySelectorAll(".tile");
    function displayTiles() {
        tilesDisplay.forEach((e, index) => {
            if (gameMechanics.isTileFilled(index)) {
                e.firstChild.style.backgroundImage = 
                `url(images/${gameData.gameBoard.tiles[index]}.png)`;
            }
            else {
                e.firstChild.style.backgroundImage = "";
            }
            displayTileFilled();
        })
    }
    function displayTileFilled() {
        tilesDisplay.forEach((e, index) => {
            if (gameMechanics.isTileFilled(index)) e.classList.add("tile-filled");
            else e.classList.remove("tile-filled");
        })
    }
    function displayPlayerTurn() {
        const playerNum = gameData.gameInfo.turn.playerNum;
        const playerTurn =  document.querySelector(`.player-${playerNum}`);
        for (i = 1; i < 3; i++) {
            document.querySelector(`.player-${i}`).classList.remove(`player-${i}-turn`);
            document.querySelector(`.player-${i} .turn`).textContent = "";
        }
        playerTurn.classList.add(`player-${playerNum}-turn`);
        playerTurn.querySelector(".turn").textContent = "Your Turn!";
    }
    function displayScores() {
        const scoreBoard = document.querySelector(".score-board");
        scoreBoard.textContent = `${gameData.players.player1.score} 
        - ${gameData.players.tieScore} - ${gameData.players.player2.score} `;
    }
    function displayRound() {
        const round = document.querySelector('.round');
        round.textContent = `Round ${gameData.gameInfo.round}`;
    }
    function displayWinner() {
        winningTiles = gameMechanics.checkForWinner()
        let repeat = 0
        const blinkingTiles = setInterval(() => {
            winningTiles.forEach(tileIndex => {
                tilesDisplay[tileIndex].firstChild.classList.toggle("hide");
            })
            repeat += 1;
            if (repeat === 6) clearInterval(blinkingTiles);
        }, 250)
    }
    function toggleModal(modalType, name, gameResult) {
        let modalContainer = document.querySelector(".modal-container");
        let modal = document.querySelector(".modal");
        if (!modalContainer.className.includes("modal-hide")) {
            setTimeout(() => {
                setModalContent();
                modalContainer.classList.toggle("modal-hide");
            }, 200);
        }
        else {
            setModalContent();
            modalContainer.classList.toggle("modal-hide");
        }
        document.querySelector(".overlay").classList.toggle("overlay-close");
        modal.classList.toggle("modal-close");
        modal.id = name;
        function setModalContent() {
            if (gameResult === "win") modal.querySelector(".title").textContent = 
            modalType.winTitle
            else if (gameResult === "tie") modal.querySelector(".title").textContent = 
            modalType.tieTitle
            else modal.querySelector(".title").textContent = modalType.title
            modal.querySelector(".no").textContent = modalType.no;
            modal.querySelector(".yes").textContent = modalType.yes;
        }
    }
    function rematchModal() {
        document.querySelector("#rematch .yes").onclick = gameMechanics.rematchGame;
        document.querySelector("#rematch .no").onclick = () => {
            displayController.toggleModal("");
            displayController.changeScreen("home");
            gameMechanics.resetSelection();
            gameMechanics.restartGame();
        }
    }

    return {changeScreen, updateAvatarSelection, updateLocationSelection, tilesDisplay, 
        displayTiles, displayPlayerTurn, displayScores, displayRound, displayWinner, 
        toggleModal, rematchModal, setPlayersAvatar, setGameLocation};
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - G A M E - - I N T E R A C T I O N s - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const gameInteractions = (() => {
    document.querySelector(".start-button").addEventListener("click", () => {
        displayController.setPlayersAvatar();
        displayController.setGameLocation();
    })
    const screen = (() => { 
        document.querySelectorAll(".next").forEach(e => 
        e.addEventListener("click", displayController.changeScreen.bind(null, "next")));
        document.querySelectorAll(".back").forEach(e => 
        e.addEventListener("click", displayController.changeScreen.bind(null, "back")));
    })()
    const modals = (() => {
        document.querySelector(".home-button").onclick = () => {
            displayController.toggleModal(gameData.modals.quitModal, "quit");
            document.querySelector("#quit .yes").onclick = () => {
                displayController.changeScreen("home");
                gameMechanics.resetSelection();
                gameMechanics.restartGame();
            }
            document.querySelector("#quit .no").onclick = () => 
            displayController.toggleModal("");
        }
        document.querySelector(".restart-button").onclick = () => {
            displayController.toggleModal(gameData.modals.restartModal, "restart");
            document.querySelector("#restart .yes").onclick = 
            gameMechanics.restartGame;
            document.querySelector("#restart .no").onclick = () => 
            displayController.toggleModal("");
        }
        document.querySelector(".modal .yes").addEventListener
        ("click", () => displayController.toggleModal(""));
    })() 
    const gameplay = (() => {
        displayController.tilesDisplay.forEach((tileDisplay, index) => {
            displayController.displayPlayerTurn();
            tileDisplay.onclick = () => {
                if (gameMechanics.isTileFilled(index) 
                || !gameData.gameInfo.gameOngoing) return
                gameMechanics.setTile(index);
                displayController.displayTiles();
                gameMechanics.checkForGameOver();
                gameMechanics.changePlayerTurn();
            }
        })  
    })()
    const carets = document.querySelectorAll(".fa-caret-left, .fa-caret-right");
    carets.forEach(caret => {
        caret.onclick = e => {
            const ancestor = e.target.parentElement;
            if (ancestor.className.includes("1")) gameMechanics.changeAvatar(e, 1)
            else if (ancestor.className.includes("2")) gameMechanics.changeAvatar(e, 2)
            else gameMechanics.changeLocation(e)
            displayController.updateAvatarSelection();
            displayController.updateLocationSelection();
        }
    })
})()


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  