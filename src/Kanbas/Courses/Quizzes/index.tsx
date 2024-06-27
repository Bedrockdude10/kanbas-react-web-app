import React, { useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import * as client from "./client";
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    try {
      const quizzes = await client.findQuizzesForCourse(cid as string);
      console.log("Fetched quizzes:", quizzes); // Log quizzes to the console
      dispatch(setQuizzes(quizzes));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const saveQuiz = async (quiz: any) => {
    console.log('Saving quiz:', quiz); // Log quiz details
    try {
      const status = await client.updateQuiz(quiz);
      console.log('Quiz updated:', status);
      dispatch(updateQuiz(quiz));
    } catch (error) {
      console.error('Failed to update quiz:', error);
    }
  };

  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const createQuiz = async (quiz: any) => {
    const newQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(addQuiz(newQuiz));
  };

  return (
    <div className="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Quizzes</h1>
        <button 
          className="btn btn-primary"
          onClick={() => createQuiz({ name: "New Quiz", course: cid })}>
          + Quiz
        </button>
      </div>
      <ul id="wd-quizzes" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%', 
        listStyleType: 'none', 
        padding: 0 
      }}>
        {quizzes.filter((quiz: any) => quiz.course === cid).map((quiz: any) => (
          <li key={quiz._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {!quiz.editing ? (
                <span>{quiz.name}</span>
              ) : (
                <input 
                  className="form-control w-50 d-inline-block"
                  onChange={(e) => {
                    const updatedQuiz = { ...quiz, name: e.target.value };
                    console.log('onChange quiz:', updatedQuiz);
                    saveQuiz(updatedQuiz);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const updatedQuiz = { ...quiz, editing: false };
                      console.log('onKeyDown quiz:', updatedQuiz);
                      dispatch(updateQuiz(updatedQuiz)); // Only update the local state
                    }
                  }}
                  value={quiz.name}
                />
              )}
            </div>
            <div>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => removeQuiz(quiz._id)}
              >
                Delete
              </button>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => dispatch(editQuiz(quiz._id))}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
