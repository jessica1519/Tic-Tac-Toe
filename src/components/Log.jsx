export default function Log({ turns }) {
  //informazioni con turno di gioco, ciò signidica che deve ex un array che cresce a ogni clic del pulsante
  return (
    <ol id="log">
      {turns.map((turns) => (
        <li key={`${turns.square.row}${turns.square.col} `}>
          {turns.player}selected{turns.square.row},{turns.square.col}
        </li>
      ))}
      {/*i turni saranno mappati in un elelemtno dell'elenco dove voglio dire quale giocatore ha selezionato quale coordinata*/}
    </ol>
  ); // la key sarà una stringa che è la combinazione tra righe e colonne creata con la sintassi dei literali js
}
