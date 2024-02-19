import { useState } from "react"

export default function Player({initialName,symbol, onChangeName, isActive}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditButton(){
        setIsEditing((editing) => !editing);
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }

    return(
        <li className = {isActive ? "active": undefined}>
            <span className = "player">
                {!isEditing &&<span className = "player-name">{playerName}</span>}
                {isEditing && <input type = "text" required value = {playerName} onChange = {handleChange}></input>}
            <span className = "player-symbol">{symbol}</span>
            </span>
            <button onClick = {handleEditButton}>{isEditing ? "Save": "Edit"}</button>
        </li>
    )
}