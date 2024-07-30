import React from 'react'
import Letter from './Letter'

function Board({ boardDefault }) {
    const guesses = 1;

    const renderWord = () => {
        return boardDefault.map((row, rowIndex) => (
            <div className="row">
                {row.map((cell, cellIndex) => (
                    <Letter letterPos={cellIndex} attemptVal={rowIndex}/>
                ))}
            </div>
        ));
    }
    return (
        <div className="board">
           {renderWord()}
        </div>
    )
}

export default Board;