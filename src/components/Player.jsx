import { useState } from "react";
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName); //passo come oggetto initialName che poi pox usare come valore iniziale da mostrare nel mio input twxt
  const [isEditing, setIsEditing] = useState(false); //lo imposto su falso in modo tale che inizialmente non modifico la scritta edit
  function handleEditClick() {
    //funzione legata al mio button per cambiare in vero il valore al click e così apportare modifiche di let playerName
    setIsEditing((editing) => !editing); //con React devo usare una funzione => con argomento editing che scelgo io, per essere certa di lavorare sempre con l'ultimo valore di stato disponibile
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  function handleChange(event) {
    //ascolto l evento che avviene nel campo input quando qualcuno digita il suo nome
    setPlayerName(event.target.value); //come primo argomento viene passato l'evento,l'evento ha delle proprietà fisse tra cui target
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>; //salvo in una let x impostare sotto una condizione
  if (isEditing) {
    //se isEditing è vero mostrare un input text per modificare nome
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} /> //onchange è una proprietà fissa tipo onclick
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="players">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
