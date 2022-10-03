const TicTacToe = (() => {
  const cells = document.querySelectorAll(".cell");
  const playerx = document.querySelector(".playerx");
  const playero = document.querySelector(".playero");
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let currentTurn;
  let gameResults = Array(8);

  const swapTurns = () => {
    if (currentTurn == "o") {
      currentTurn = "x";
      playero.classList.add("turn");
      playerx.classList.remove("turn");
    } else {
      currentTurn = "o";
      playerx.classList.add("turn");
      playero.classList.remove("turn");
    }
    return currentTurn;
  };

  const choosePlayer = () => {
    playero.addEventListener("click", () => {
      playero.classList.add("turn");
      currentTurn = "x";
    });
    playerx.addEventListener("click", () => {
      playerx.classList.add("turn");
      currentTurn = "o";
    });
  };

  const startGame = () => {
    let start = [...cells].some((cell) => {
      return cell.classList.contains("x") || cell.classList.contains("o");
    });
    if (start === false) {
      choosePlayer();
      newGame();
    } else {
      newGame();
    }
  };

  const makeMove = (event) => {
    let board = [...cells];
    const cellPlayed = event.target;
    gameResults.splice(index, 0, "mark");
    console.log("clicked");
    cellPlayed.classList.add(swapTurns());
    console.log(currentTurn);
    winningCombinations.every((winnerCombination) => {
      return winnerCombination.some((winner) => {
        return winningFinder(winner);
      });
    });
  };

  function winningFinder(winner) {
    let mappedCells = [...cells].map((cell, index) => {
      return cell.classList;
    });
    if (mappedCells[[winner][0]].contains("x")) {
      console.log(`${mappedCells[[winner][0]]}`);
      return true;
    }
  }
  const newGame = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", makeMove, { once: true });
    });
  };
  return { newGame, startGame };
})();

//TicTacToe.startGame();
//====================================================
// the gameboard as an array inside an object(implemented as a module)
const Gameboard = (() => {
  const cells = document.querySelectorAll(".cell");
  const result = document.querySelector(".result");
  const message = document.createElement("p");
  const display = document.querySelector(".display");
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let gameboard = [...cells];
  const cellContent = () => {
    let mappedCells = gameboard.map((cell) => {
      return cell.textContent;
    });
    return mappedCells;
  };

  const markCell = (event) => {
    let currentCell = event.target;
    if (currentCell.textContent === "") {
      currentCell.textContent = Controller.selectPlayer();
      markedBoard = cellContent();
      checkWin(winningCombinations);
    } else {
      currentCell.classList.add("unplayable");
    }
  };
  let markedBoard = cellContent();
  const checkWin = (winningCombinations) => {
    if (
      winningCombinations.some((winning) => {
        return winning.every((value, index) => {
          return markedBoard[value] == "X";
        });
      })
    ) {
      message.textContent = "Game Won by X";
      result.appendChild(message);
      display.classList.add("winner");
      restart.classList.add("showrestart");
      restart.addEventListener("click", clearGame);
      return;
    } else if (
      winningCombinations.some((winning) => {
        return winning.every((value, index) => {
          return markedBoard[value] == "O";
        });
      })
    ) {
      message.textContent = "Game Won by O";
      result.appendChild(message);
      display.classList.add("winner");
      restart.classList.add("showrestart");
      restart.addEventListener("click", clearGame);
      return;
    } else {
      checkDraw();
    }
  };

  const checkDraw = () => {
    if (
      markedBoard.every((markedCell) => {
        return markedCell == "X" || markedCell == "O";
      })
    ) {
      message.textContent = "Game Draw";
      result.appendChild(message);
      display.classList.add("winner");
      restart.classList.add("showrestart");
      restart.addEventListener("click", clearGame);
    }
  };

  const playGame = () => {
    gameboard.forEach((gameCell) => {
      gameCell.addEventListener("click", markCell);
    });
  };

  const clearGame = () => {
    cells.forEach((markedCell) => {
      markedCell.textContent = "";
    });
    display.classList.remove("winner");
    restart.classList.remove("showrestart");
    message.textContent = "";
  };

  const restart = document.querySelector(".restart");
  const restartGame = () => {
    return restart.addEventListener("click", clearGame);
  };

  return { gameboard, playGame, restartGame };
})();

//the players as objects via a factory function
const player = (name) => {
  let scoreStore = [];
  let score = scoreStore.length;
  return { name, score };
};

//the controller as an object via a module
const Controller = (() => {
  let playerX = player("exe");
  let playerO = player("ooh");
  let currentPlayer = playerX;
  let selectPlayer = () => {
    if (currentPlayer == undefined) {
      currentPlayer = playerO;
      return "O";
    } else if (currentPlayer == playerX) {
      currentPlayer = playerO;
      return "X";
    } else if (currentPlayer == playerO) {
      currentPlayer = playerX;
      return "O";
    }
  };
  const choosePlayer = () => {
    const playerx = document.querySelector(".playerx");
    const playero = document.querySelector(".playero");
    playero.addEventListener("click", () => {
      playero.classList.add("turn");
      currentPlayer = playerO;
    });
    playerx.addEventListener("click", () => {
      playerx.classList.add("turn");
      currentPlayer = playerX;
    });
  };
  return { selectPlayer, choosePlayer };
})();

Controller.choosePlayer();
Gameboard.playGame();
