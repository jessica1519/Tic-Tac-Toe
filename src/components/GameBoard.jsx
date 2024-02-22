export default function GameBoard({
  onSelectSquare,
  board /*activePlayerSymbol*/,
}) {
  return (
    <ol id="game-board">
      {/*per ogni riga voglio venga prodotto un elemento della lista*/}
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {/*per disabilitare bottone quando è diverso da nullo e cioè quando il giocatore è X o O in modo tale che non si pox fare clic su una casella più volte*/}
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
