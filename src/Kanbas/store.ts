import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer"

const store = configureStore({
  reducer: {
    modules: modulesReducer,        // Use "modules" to refer to this part of the state
    assignments: assignmentsReducer, // Use "assignments" to refer to this part of the state
    accountReducer,
    quizzes: quizzesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
