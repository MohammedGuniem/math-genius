import { createSlice } from "@reduxjs/toolkit";

function getNewQuestion() {
  let Operation = ["÷", "X", "-", "+"][
    Math.floor(Math.random() * Math.floor(4))
  ];
  let a = Math.floor(Math.random() * Math.floor(11)) + 1;
  let b = 0;
  if (Operation !== "÷") {
    b = Math.floor(Math.random() * (a - 0)) + 0;
  } else {
    let multipleOfa = [];
    for (var i = 1; i <= a; i++) {
      if (a % i === 0) multipleOfa.push(i);
    }
    b = multipleOfa[Math.floor(Math.random() * Math.floor(multipleOfa.length))];
  }
  return { firstDigit: a, secondDigit: b, Operation: Operation };
}

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameIsRunning: false,
    totalTime: null,
    timeRemaining: null,
    numberOfQuestions: null,
    currentQuestionNumber: null,
    numberOfCorrectAnswers: null,
    numberOfWrongAnswers: null,
    firstDigit: null,
    secondDigit: null,
    currentOperation: null,
    results: [],
  },
  reducers: {
    runGame: (state, action) => {
      state.gameIsRunning = true;
      state.totalTime = action.payload.time * 60; // Converting to seconds
      state.timeRemaining = action.payload.time * 60; // Converting to seconds
      state.numberOfQuestions = action.payload.numberOfQuestions;
      state.currentQuestionNumber = 1;
      state.currentUserAnswer = 0;
      state.numberOfCorrectAnswers = 0;
      state.numberOfWrongAnswers = 0;
      let newQuestion = getNewQuestion();
      state.firstDigit = newQuestion.firstDigit;
      state.secondDigit = newQuestion.secondDigit;
      state.currentOperation = newQuestion.Operation;
    },
    stopGame: (state) => {
      let result = {
        Score:
          state.numberOfCorrectAnswers + " out of " + state.numberOfQuestions,
        Time: state.totalTime - state.timeRemaining,
      };
      state.results.push(result);
      state.gameIsRunning = false;
    },
    generateNewQuestion: (state) => {
      let newQuestion = getNewQuestion();
      state.firstDigit = newQuestion.firstDigit;
      state.secondDigit = newQuestion.secondDigit;
      state.currentOperation = newQuestion.Operation;
    },
    checkAnswer: (state, action) => {
      let userAnswer = action.payload;
      let correctResult;
      switch (state.currentOperation) {
        case "÷":
          correctResult = state.firstDigit / state.secondDigit;
          break;
        case "-":
          correctResult = state.firstDigit - state.secondDigit;
          break;
        case "X":
          correctResult = state.firstDigit * state.secondDigit;
          break;
        case "+":
          correctResult = state.firstDigit + state.secondDigit;
          break;
        default:
          break;
      }
      // User answer is correct
      if (Number(userAnswer) === correctResult) {
        state.numberOfCorrectAnswers = state.numberOfCorrectAnswers + 1;
        // User answer is wrong
      } else {
        state.numberOfWrongAnswers = state.numberOfWrongAnswers + 1;
      }
      // Last question is answered
      if (state.numberOfQuestions === state.currentQuestionNumber) {
        let result = {
          Score:
            state.numberOfCorrectAnswers + " out of " + state.numberOfQuestions,
          Time: state.totalTime - state.timeRemaining,
          StartTime: "30.05.2020 18:50:15",
        };
        state.results.push(result);
        state.gameIsRunning = false;
        // More questions remains to
      } else {
        let newQuestion = getNewQuestion();
        state.firstDigit = newQuestion.firstDigit;
        state.secondDigit = newQuestion.secondDigit;
        state.currentOperation = newQuestion.Operation;
        state.currentQuestionNumber = state.currentQuestionNumber + 1;
        state.currentUserAnswer = 0;
      }
    },
    tick: (state) => {
      state.timeRemaining -= 1;
    },
  },
});

export const {
  runGame,
  stopGame,
  checkAnswer,
  tick,
  generateNewQuestion,
} = gameSlice.actions;

export const selectTimeInMinutes = (state) => state.game.timeInMinutes;
export const selectNumberOfQuestions = (state) => state.game.numberOfQuestions;
export const selectResults = (state) => state.game.results;
export const selectGameIsRunning = (state) => state.game.gameIsRunning;
export const selectFirstDigit = (state) => state.game.firstDigit;
export const selectCurrentOperation = (state) => state.game.currentOperation;
export const selectSecondDigit = (state) => state.game.secondDigit;
export const selectCurrentQuestionNumber = (state) =>
  state.game.currentQuestionNumber;
export const selectNumberOfCorrectAnswers = (state) =>
  state.game.numberOfCorrectAnswers;
export const selectNumberOfWrongAnswers = (state) =>
  state.game.numberOfWrongAnswers;
export const selectTotalTime = (state) => state.game.totalTime;
export const selectTimeRemaining = (state) => state.game.timeRemaining;

export default gameSlice.reducer;
