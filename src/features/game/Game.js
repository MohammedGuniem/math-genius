import React from "react";
import { useSelector } from "react-redux";
import { selectGameIsRunning } from "./gameSlice";

import { StartBoard } from "./StartBoard";
import { GameBoard } from "./GameBoard";

const timeToString = function timeToString(totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;

  // round seconds
  seconds = Math.round(seconds * 100) / 100;

  let result = hours < 10 ? "0" + hours : hours;
  result += ":" + (minutes < 10 ? "0" + minutes : minutes);
  result += ":" + (seconds < 10 ? "0" + seconds : seconds);

  return result;
};

export function Game() {
  const gameIsRunning = useSelector(selectGameIsRunning);

  return (
    <div className="App">
      <header className="App-header">
        {gameIsRunning ? (
          <GameBoard timeToString={timeToString} />
        ) : (
          <StartBoard timeToString={timeToString} />
        )}
      </header>
    </div>
  );
}
