import React from "react"

function GameBoard({onSelectSquare, board}) {
   

    // const [gameBoard, setGameBoard] = useState<(null | string)[][]>(initialGameBoard);

    // function handleSelectSquare(rowIndex: number, colIndex: number) {
    //     if (gameBoard[rowIndex][colIndex] === null) {
    //         const updatedBoard = gameBoard.map((row, r) =>
    //             row.map((cell, c) => (r === rowIndex && c === colIndex ? activePlayerSymbol : cell))
    //         );
    //         setGameBoard(updatedBoard);
    //     }
    //     onSelectSquare()
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}> */}
                                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !== null}>
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

export default GameBoard;
