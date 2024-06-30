import React, { useContext } from "react";
import { AppContext } from "../App";
import { todaysObj } from './Words'

const GameOver = () => {
  const {
    board,
    setBoard,
    currAttempt,
    gameOver,
    onSelectLetter,
    correctWord,
    onDelete,
  } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "You Correctly Guessed the Term"
          : "You Failed to Guess the Term"}
      </h3>
      <h1>Correct Word: {correctWord}</h1>
      <h3>Terminology Definition: {todaysObj["definition"]}</h3>
    </div>
  );
}

export default GameOver;