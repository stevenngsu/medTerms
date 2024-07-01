import "./App.css";
import Icons from './components/Icons'
import { Board, boardDefault }from "./components/Board";
import Keyboard from "./components/Keyboard";
import { generateWordSet } from "./components/Words";
import Hints from "./components/Hints";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";
import { todaysObj, guesses } from "./components/Words";


export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState({});
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    setCurrAttempt({ attempt: 0, letter: 0 });
    setWordSet({});
    setDisabledLetters([]);
    setGameOver({
      gameOver: false,
      guessedWord: false,
    })
    generateWordSet().then(({wordSet, todaysWord}) => {
      setWordSet(wordSet);
      setCorrectWord(todaysWord);
    });
  }, []);

  const onEnter = () => {
    if (currAttempt.letter !== correctWord.length) return;

    let currWord = "";
    for (let i = 0; i < correctWord.length; i++) {
      currWord += board[currAttempt.attempt][i];
    }
 
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });

    if (currWord === correctWord.toUpperCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    } else if (currAttempt.attempt + 1 === guesses) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > correctWord.length - 1) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <Icons />
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
          <div className="full-game-board">
            <Hints />
            <Board />
          </div>
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;