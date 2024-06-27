import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizzesState, Quiz } from "../../types";

const initialState: QuizzesState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }: PayloadAction<Quiz>) => {
      state.quizzes.push(quiz);
    },
    deleteQuiz: (state, { payload: quizId }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q:any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q:any) =>
        q._id === quiz._id ? quiz : q
      );
    },
    editQuiz: (state, { payload: quizId }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((q:any) =>
        q._id === quizId ? { ...q, editing: true } : q
      );
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
