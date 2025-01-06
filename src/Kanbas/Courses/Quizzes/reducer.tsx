import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizzesState, Quiz, Question } from "../../types";

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
      state.quizzes = state.quizzes.filter((q: Quiz) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q: Quiz) =>
        q._id === quiz._id ? quiz : q
      );
    },
    editQuiz: (state, { payload: quizId }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((q: Quiz) =>
        q._id === quizId ? { ...q, editing: true } : q
      );
    },
    addQuestion: (state, { payload }: PayloadAction<{ quizId: string; question: Question }>) => {
      const { quizId, question } = payload;
      const quiz = state.quizzes.find((q: Quiz) => q._id === quizId);
      if (quiz) {
        quiz.questions.push(question);
      }
    },
    updateQuestion: (state, { payload }: PayloadAction<{ quizId: string; question: Question }>) => {
      const { quizId, question } = payload;
      const quiz = state.quizzes.find((q: Quiz) => q._id === quizId);
      if (quiz) {
        quiz.questions = quiz.questions.map((q: Question) =>
          q._id === question._id ? question : q
        );
      }
    },
    deleteQuestion: (state, { payload }: PayloadAction<{ quizId: string; questionId: string }>) => {
      const { quizId, questionId } = payload;
      const quiz = state.quizzes.find((q: Quiz) => q._id === quizId);
      if (quiz) {
        quiz.questions = quiz.questions.filter((q: Question) => q._id !== questionId);
      }
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  editQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
