import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  correctQuiz: 0,
  attempt: 1,
  attemptHistory: [],
  currentQuestionIndex: 0,
};

const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    setCorrectQuiz: (state) => {
      state.correctQuiz += 1;
    },
    resetCorrectQuiz: (state) => {
      state.correctQuiz = 0;
    },
    setAttempt: (state) => {
      state.attempt += 1;
    },
    setAttemptHistory: (state, action) => {
      state.attemptHistory.push(action.payload);
    },
    setCurrentQuestionIndex: (state) => {
      state.currentQuestionIndex += 1;
    },
    resetCurrentQuestionIndex: (state) => {
      state.currentQuestionIndex = 0;
    },
  },
});

export const {
  setCorrectQuiz,
  resetCorrectQuiz,
  setAttempt,
  setAttemptHistory,
  setCurrentQuestionIndex,
  resetCurrentQuestionIndex,
} = quizSlice.actions;
export default quizSlice.reducer;
