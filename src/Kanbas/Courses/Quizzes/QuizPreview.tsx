import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Quiz, Question } from '../../types';
import * as client from './client';

const QuizPreview = () => {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const quiz = useSelector((state: RootState) => state.quizzes.quizzes.find(q => q._id === qid));
  const [answers, setAnswers] = useState<{ [key: string]: string | boolean }>({});
  const [attempt, setAttempt] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuizAttempt = async () => {
      try {
        const attempt = await client.findQuizAttempts(qid!);
        setAttempt(attempt);
        if (attempt && attempt.answers) {
          setAnswers(attempt.answers);
        }
      } catch (error) {
        console.error('Error fetching quiz attempt:', error);
      }
    };

    fetchQuizAttempt();
  }, [qid]);

  const handleAnswerChange = (questionId: string, value: string | boolean) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSaveAttempt = async () => {
    try {
      await client.createQuizAttempt(qid!, { answers });
      alert('Answers saved!');
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }
  };

  const handleEditQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container">
      <h1>{quiz.name}</h1>
      <p>Quiz Instructions</p>
      <div className="mb-3">
        <h3>{currentQuestion.title}</h3>
        <p>{currentQuestion.questionText}</p>
        {currentQuestion.questionType === 'multipleChoice' && (
          <div>
            {currentQuestion.choices?.map((choice, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name={currentQuestion._id}
                  value={choice.text}
                  checked={answers[currentQuestion._id] === choice.text}
                  onChange={() => handleAnswerChange(currentQuestion._id, choice.text)}
                />
                <label>{choice.text}</label>
              </div>
            ))}
          </div>
        )}
        {currentQuestion.questionType === 'trueFalse' && (
          <div>
            <input
              type="radio"
              name={currentQuestion._id}
              value="true"
              checked={answers[currentQuestion._id] === true}
              onChange={() => handleAnswerChange(currentQuestion._id, true)}
            />
            <label>True</label>
            <input
              type="radio"
              name={currentQuestion._id}
              value="false"
              checked={answers[currentQuestion._id] === false}
              onChange={() => handleAnswerChange(currentQuestion._id, false)}
            />
            <label>False</label>
          </div>
        )}
        {currentQuestion.questionType === 'fillInBlanks' && (
          <div>
            <input
              type="text"
              value={answers[currentQuestion._id] as string || ''}
              onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === quiz.questions.length - 1}
        >
          Next
        </button>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSaveAttempt}>
        Submit Quiz
      </button>
      <button className="btn btn-secondary mt-3 ms-2" onClick={handleEditQuiz}>
        Keep Editing This Quiz
      </button>
    </div>
  );
};

export default QuizPreview;
