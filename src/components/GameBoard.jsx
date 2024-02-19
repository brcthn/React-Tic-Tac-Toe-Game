export default function GameBoard({onSelectSquare, board}){
    return(
        <ol id = "game-board">
            {board.map((row,rowIndex) => 
                <li key = {rowIndex}>
                    <ol>
                        {row.map((playersymbol,colIndex)=> <li key = {colIndex}>
                            <button disabled={playersymbol !== null} onClick={() => onSelectSquare(rowIndex,colIndex)}>{playersymbol}</button>
                        </li>)}
                    </ol>
                </li>
            )}
        </ol>
    )
}