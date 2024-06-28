import axios from "axios";
import { Quiz, NewQuiz, Question , NewQuestion} from "../../types"; // Ensure NewQuiz is imported from types

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

// Create a new quiz
export const createQuiz = async (courseId: string, quiz: NewQuiz) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

// Get quizzes for a course
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const findQuizById = async (qid: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${qid}`);
  return response.data;
};

// Update a quiz
export const updateQuiz = async (quiz: Quiz) => {
  if (!quiz._id) {
    throw new Error("Quiz ID is required to update the quiz.");
  }
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

// Delete a quiz
export const deleteQuiz = async (qid: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${qid}`);
  return response.data;
};

// Publish or unpublish a quiz
export const publishQuiz = async (qid: string, published: boolean) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${qid}/publish`, { published });
  return response.data;
};

// Get questions for a quiz
export const findQuestionsForQuiz = async (qid: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${qid}/questions`);
  return response.data;
};

// Add a question to a quiz
export const addQuestionToQuiz = async (qid: string, question: NewQuestion) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${qid}/questions`, question);
  return response.data;
};

// Update a question
export const updateQuestion = async (question: Question) => {
  if (!question._id) {
      throw new Error("Question ID is required to update the question.");
  }
  const response = await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
  return response.data;
};

// Delete a question
export const deleteQuestion = async (questionId: string) => {
  const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

// Create a quiz attempt
export const createQuizAttempt = async (qid: string, attempt: any) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${qid}/attempts`, attempt);
  return response.data;
};

// Get quiz attempts for a user
export const findQuizAttempts = async (qid: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${qid}/attempts`);
  return response.data;
};
