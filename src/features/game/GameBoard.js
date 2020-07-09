import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Game.module.css";
import {
  stopGame,
  checkAnswer,
  tick,
  selectGameIsRunning,
  selectTimeRemaining,
  selectCurrentQuestionNumber,
  selectNumberOfCorrectAnswers,
  selectNumberOfWrongAnswers,
  selectFirstDigit,
  selectCurrentOperation,
  selectSecondDigit,
  selectNumberOfQuestions,
} from "./gameSlice";

export function GameBoard(props) {
  const [currentUserAnswer, setCurrentUserAnswer] = useState("");

  const dispatch = useDispatch();

  const numberOfQuestions = useSelector(selectNumberOfQuestions);
  const timeRemaining = useSelector(selectTimeRemaining);
  const firstDigit = useSelector(selectFirstDigit);
  const currentOperation = useSelector(selectCurrentOperation);
  const secondDigit = useSelector(selectSecondDigit);
  const currentQuestionNumber = useSelector(selectCurrentQuestionNumber);
  const numberOfCorrectAnswers = useSelector(selectNumberOfCorrectAnswers);
  const numberOfWrongAnswers = useSelector(selectNumberOfWrongAnswers);
  const gameIsRunning = useSelector(selectGameIsRunning);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining === 0) {
        if (gameIsRunning) dispatch(stopGame());
      } else if (gameIsRunning) {
        dispatch(tick());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch, timeRemaining, gameIsRunning]);

  return (
    <div>
      <div>
        <div>Time Remaining</div>
        <div>{props.timeToString(timeRemaining)}</div>
      </div>
      <div className={styles.row} />
      <div className={styles.row} />
      <div className={styles.row}>
        <div className={styles.value}>{firstDigit}</div>
        <div className={styles.value}>{currentOperation}</div>
        <div className={styles.value}>{secondDigit}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.value}>=</div>
      </div>
      <div className={styles.row}>
        <div className={styles.textbox}>
          <input
            type="number"
            className={styles.textbox}
            aria-label="Set increment amount"
            value={currentUserAnswer}
            onChange={(e) => {
              if (e.target.value >= 0) {
                setCurrentUserAnswer(Number(e.target.value));
              }
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                dispatch(checkAnswer(currentUserAnswer));
                setCurrentUserAnswer("");
              }
            }}
          />
        </div>
        <div>
          <button
            className={styles.button}
            aria-label="Increment value"
            onClick={() => {
              dispatch(checkAnswer(currentUserAnswer));
              setCurrentUserAnswer("");
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div className={styles.row}>
        Question {currentQuestionNumber} of {numberOfQuestions}
      </div>
      <div className={styles.row}>
        <div className={styles.sideMargins}>
          {numberOfCorrectAnswers} Correct Answers
        </div>{" "}
        <div className={styles.sideMargins}>
          {numberOfWrongAnswers} Wrong Answers
        </div>
      </div>
    </div>
  );
}
