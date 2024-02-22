import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCombinations";
import GameOver from "./components/GameOver";
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
const initialGameBoard = [
  //un array con degli array perchè abbiamo bisogno di una griglia per il tabellone
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setPlayers] = useState({
    X: "player 1",
    O: "player 2",
  });
  const [gameTurns, setGameTurns] = useState([]); //turni di gioco, lo gestisco qui perchè App collega sia GameBoard che Log, ogni volta che seleziono un quadrato voglio aggiungere un nuovo turno a qst array
  //const [activePlayer, setActivePlayer] = useState("X"); // il giocare attivo

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map((array) => [...array])]; //inizialmente il tabellone è vuoto//il tabellone di gioco deriva da questo stato, devo creare una copia del tabellone di array perchè se no non potrò riavviare il gioco tramite bottone alla fine della partita perchè vrà ancora salvato il vecchio tabellone pieno
  for (const turn of gameTurns) {
    const { square, player } = turn; //destrutturiamo il nostro turno per accedere alla proprietà square e player, qui ottengo il simbolo del giocatore
    const { row, col } = square; //da oggetto tiro fuori le due proprietà row and col, qui ottengo dove ha cliccato
    gameBoard[row][col] = player; //aggiorno il tabellone con riga e colonna del giocatore attivo quindi il suo simbolo
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    //vogliamo controllare tutte le combinazioni vincenti dopo ogni turno per vedere se qualcuno ha vinto
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    //ora vogliamo verificare se per una possibile combinazione vincente i simboli sono uguali cosi da determinare una vittoria
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      //verifico se è vero è quindi se esiste perchè il mio array iniziale vuoto è null quindi prima di paragonare verifico se esiste
      winner = players[firstSquareSymbol]; //se da condizione precedente il primo simbolo soddisfa tutte le condizioni sarà il simbolo vincente
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner; //abbiamo nove caselle e quindi nove turni, imposto cosi il pareggio
  function handleSelectSquare(rowIndex, colIndex) {
    //passo rowIndex e ColIndex perchè voglio sapere quale quadrati vengono cliccati
    //setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X")); //voglio cambiare se ha giocato x o se ha giocato O
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]; //aggiungiamo un nuovo oggetto square che memorizza quale quadrato viene cliccato, aggiungiamo player per memorizzare quale giocatore ha cliccato
      return updatedTurns;
    });
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  function handleRestart() {
    // per far ripartire il gioco devo semplicemente impostare il mio GameTurns su un array vuoto, passo questa funzione a GameOver tramite props
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
