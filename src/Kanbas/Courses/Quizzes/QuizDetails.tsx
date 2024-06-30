import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import * as client from "./client";
import { setQuizzes, updateQuiz } from "./reducer";
import { Quiz } from "../../types";

export default function QuizDetails() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await client.findQuizById(qid as string);
        setQuiz(quiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [qid]);

  const handlePreview = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz?._id}/Preview`);
  };

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz?._id}/Edit`);
  };

  const handlePublish = async () => {
    if (quiz) {
      const updatedQuiz = { ...quiz, published: !quiz.published };
      try {
        await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
        setQuiz(updatedQuiz);
      } catch (error) {
        console.error('Error updating quiz:', error);
      }
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Quiz Details</h1>
      <div className="quiz-details">
        <div>
          <strong>Quiz Type:</strong> {quiz.quizType}
        </div>
        <div>
          <strong>Points:</strong> {quiz.points}
        </div>
        <div>
          <strong>Assignment Group:</strong> {quiz.assignmentGroup}
        </div>
        <div>
          <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}
        </div>
        <div>
          <strong>Time Limit:</strong> {quiz.timeLimit} Minutes
        </div>
        <div>
          <strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? "Yes" : "No"}
        </div>
        {quiz.multipleAttempts && (
          <div>
            <strong>How Many Attempts:</strong> {quiz.attemptLimit}
          </div>
        )}
        <div>
          <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}
        </div>
        <div>
          <strong>Access Code:</strong> {quiz.accessCode || "None"}
        </div>
        <div>
          <strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}
        </div>
        <div>
          <strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}
        </div>
        <div>
          <strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
        </div>
        <div>
          <strong>Due Date:</strong> {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "None"}
        </div>
        <div>
          <strong>Available Date:</strong> {quiz.availableDate ? new Date(quiz.availableDate).toLocaleString() : "None"}
        </div>
        <div>
          <strong>Until Date:</strong> {quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : "None"}
        </div>
        <div className="mt-3">
          <button className="btn btn-primary" onClick={handlePreview}>
            Preview
          </button>
          <button className="btn btn-secondary ms-2" onClick={handleEdit}>
            Edit
          </button>
          <button
            className={`btn ms-2 ${quiz.published ? 'btn-warning' : 'btn-success'}`}
            onClick={handlePublish}
          >
            {quiz.published ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}
