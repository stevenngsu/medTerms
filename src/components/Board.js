import React from 'react'
import Letter from './Letter.js'
import { todaysObj, guesses } from './Words.js'

export const boardDefault = Array.from({ length: guesses }, () => Array(todaysObj["word"].length).fill(''));

export const Board = () => {
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
