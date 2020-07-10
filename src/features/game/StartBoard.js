import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Game.module.css";
import { runGame, selectResults } from "./gameSlice";

export function StartBoard(props) {
  const [time, setTime] = useState(1); // Time in minutes
  const [numberOfQuestions, setNumberOfQuestions] = useState(5); // Number of questions

  const dispatch = useDispatch();

  const results = useSelector(selectResults);

  return (
    <div>
      <h4>Start New Game</h4>
      <div>
        <div className={styles.timeSetting}>
          <h6>Timer in minutes</h6>
          <button
            className={styles.button}
            aria-label="Increment value"
            onClick={() => setTime((prevTime) => prevTime + 1)}
          >
            +
          </button>
          <span className={styles.value}>{time}</span>
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() => {
              if (time > 1) setTime((prevTime) => prevTime - 1);
            }}
          >
            -
          </button>
        </div>
        <div className={styles.questionSetting}>
          <h6>Number of Questions</h6>
          <button
            className={styles.button}
            aria-label="Increment value"
            onClick={() =>
              setNumberOfQuestions(
                (prevNumberOfQuestions) => prevNumberOfQuestions + 1
              )
            }
          >
            +
          </button>
          <span className={styles.value}>{numberOfQuestions}</span>
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() => {
              if (numberOfQuestions > 1)
                setNumberOfQuestions(
                  (prevNumberOfQuestions) => prevNumberOfQuestions - 1
                );
            }}
          >
            -
          </button>
        </div>
        <div className={styles.UpDownMargins}>
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() =>
              dispatch(
                runGame({
                  time: time,
                  numberOfQuestions: numberOfQuestions,
                })
              )
            }
          >
            Start Game
          </button>
        </div>
      </div>
      {results.length > 0 ? (
        <div>
          <h4>Best Results</h4>
          <table>
            <thead>
              <tr>
                <th>Score</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Not Answered</th>
                <th>Elapsed Time</th>
                <th>Total Time</th>
              </tr>
            </thead>

            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.Score}</td>
                  <td>{result.Correct}</td>
                  <td>{result.Wrong}</td>
                  <td>{result.Not_Answered}</td>
                  <td>{props.timeToString(result.Elapsed_Time)}</td>
                  <td>{props.timeToString(result.Total_Time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
