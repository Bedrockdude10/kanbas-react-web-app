import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

// Create a new quiz
export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

// Get quizzes for a course
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

// Update a quiz
export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

// Delete a quiz
export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

// Publish or unpublish a quiz
export const publishQuiz = async (quizId: string, published: boolean) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/publish`, { published });
  return response.data;
};

// Add a question to a quiz
export const addQuestionToQuiz = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return response.data;
};

// Get questions for a quiz
export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

// Delete a question
export const deleteQuestion = async (questionId: string) => {
  const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

// Create a quiz attempt
export const createQuizAttempt = async (quizId: string, attempt: any) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, attempt);
  return response.data;
};

// Get quiz attempts for a user
export const findQuizAttempts = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
  return response.data;
};
