export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {/*se winner è impostato*/}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
        {/*rimando ad App tramite props*/}
      </p>
    </div>
  );
}
