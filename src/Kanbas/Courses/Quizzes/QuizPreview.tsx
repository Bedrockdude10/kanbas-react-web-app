import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Quiz, Question } from '../../types';
import * as client from './client';

const QuizPreview = () => {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const quiz = useSelector((state: RootState) => state.quizzes.quizzes.find(q => q._id === qid));
  const [answers, setAnswers] = useState<{ [key: string]: string | boolean }>({});
  const [attempt, setAttempt] = useState<any>(null);

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

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{quiz.name}</h1>
      <p>Quiz Instructions</p>
      {quiz.questions.map((question: Question) => (
        <div key={question._id} className="mb-3">
          <h3>{question.title}</h3>
          <p>{question.questionText}</p>
          {question.questionType === 'multipleChoice' && (
            <div>
              {question.choices?.map((choice, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name={question._id}
                    value={choice.text}
                    checked={answers[question._id] === choice.text}
                    onChange={() => handleAnswerChange(question._id, choice.text)}
                  />
                  <label>{choice.text}</label>
                </div>
              ))}
            </div>
          )}
          {question.questionType === 'trueFalse' && (
            <div>
              <input
                type="radio"
                name={question._id}
                value="true"
                checked={answers[question._id] === true}
                onChange={() => handleAnswerChange(question._id, true)}
              />
              <label>True</label>
              <input
                type="radio"
                name={question._id}
                value="false"
                checked={answers[question._id] === false}
                onChange={() => handleAnswerChange(question._id, false)}
              />
              <label>False</label>
            </div>
          )}
          {question.questionType === 'fillInBlanks' && (
            <div>
              <input
                type="text"
                value={answers[question._id] as string || ''}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleSaveAttempt}>
        Submit Quiz
      </button>
      <button className="btn btn-secondary ms-2" onClick={handleEditQuiz}>
        Keep Editing This Quiz
      </button>
    </div>
  );
};

export default QuizPreview;
