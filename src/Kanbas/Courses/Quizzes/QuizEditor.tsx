import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import * as client from './client';
import { updateQuiz, setQuizzes } from './reducer';
import { Quiz, Question } from '../../types';
import QuizQuestionEditor from './QuizQuestionEditor';

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'questions'>('details');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await client.findQuizById(qid!);
        setQuiz({
          ...fetchedQuiz,
          dueDate: fetchedQuiz.dueDate ? new Date(fetchedQuiz.dueDate) : undefined,
          availableDate: fetchedQuiz.availableDate ? new Date(fetchedQuiz.availableDate) : undefined,
          untilDate: fetchedQuiz.untilDate ? new Date(fetchedQuiz.untilDate) : undefined,
        });
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [qid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => prevQuiz ? { ...prevQuiz, [name]: value } : null);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => prevQuiz ? { ...prevQuiz, [name]: value } : null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setQuiz((prevQuiz) => prevQuiz ? { ...prevQuiz, [name]: checked } : null);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => prevQuiz ? { ...prevQuiz, [name]: new Date(value) } : null);
  };

  const handleSave = async () => {
    if (quiz) {
      try {
        await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
      } catch (error) {
        console.error('Error saving quiz:', error);
      }
    }
  };

  const handleSaveAndPublish = async () => {
    if (quiz) {
      try {
        await client.updateQuiz({ ...quiz, published: true });
        dispatch(updateQuiz({ ...quiz, published: true }));
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      } catch (error) {
        console.error('Error saving and publishing quiz:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Quiz Editor</h1>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button
          className={`tab ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          Questions
        </button>
      </div>
      {activeTab === 'details' && (
        <div className="quiz-details-editor">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={quiz.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={quiz.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Quiz Type</label>
            <select
              className="form-control"
              name="quizType"
              value={quiz.quizType}
              onChange={handleSelectChange}
            >
              <option value="gradedQuiz">Graded Quiz</option>
              <option value="practiceQuiz">Practice Quiz</option>
              <option value="gradedSurvey">Graded Survey</option>
              <option value="ungradedSurvey">Ungraded Survey</option>
            </select>
          </div>
          <div className="form-group">
            <label>Assignment Group</label>
            <select
              className="form-control"
              name="assignmentGroup"
              value={quiz.assignmentGroup}
              onChange={handleSelectChange}
            >
              <option value="quizzes">Quizzes</option>
              <option value="exams">Exams</option>
              <option value="assignments">Assignments</option>
              <option value="projects">Projects</option>
            </select>
          </div>
          <div className="form-group">
            <label>Shuffle Answers</label>
            <input
              type="checkbox"
              name="shuffleAnswers"
              checked={quiz.shuffleAnswers}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="form-group">
            <label>Time Limit (minutes)</label>
            <input
              type="number"
              className="form-control"
              name="timeLimit"
              value={quiz.timeLimit}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Multiple Attempts</label>
            <input
              type="checkbox"
              name="multipleAttempts"
              checked={quiz.multipleAttempts}
              onChange={handleCheckboxChange}
            />
          </div>
          {quiz.multipleAttempts && (
            <div className="form-group">
              <label>How Many Attempts</label>
              <input
                type="number"
                className="form-control"
                name="attemptLimit"
                value={quiz.attemptLimit}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="form-group">
            <label>Show Correct Answers</label>
            <select
              className="form-control"
              name="showCorrectAnswers"
              value={quiz.showCorrectAnswers}
              onChange={handleSelectChange}
            >
              <option value="never">Never</option>
              <option value="immediately">Immediately</option>
              <option value="afterLastAttempt">After Last Attempt</option>
            </select>
          </div>
          <div className="form-group">
            <label>Access Code</label>
            <input
              type="text"
              className="form-control"
              name="accessCode"
              value={quiz.accessCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>One Question at a Time</label>
            <input
              type="checkbox"
              name="oneQuestionAtATime"
              checked={quiz.oneQuestionAtATime}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="form-group">
            <label>Webcam Required</label>
            <input
              type="checkbox"
              name="webcamRequired"
              checked={quiz.webcamRequired}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="form-group">
            <label>Lock Questions After Answering</label>
            <input
              type="checkbox"
              name="lockQuestionsAfterAnswering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="dueDate"
              value={quiz.dueDate ? (quiz.dueDate instanceof Date ? quiz.dueDate.toISOString().slice(0, 16) : '') : ''}
              onChange={handleDateChange}
            />
          </div>
          <div className="form-group">
            <label>Available Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="availableDate"
              value={quiz.availableDate ? (quiz.availableDate instanceof Date ? quiz.availableDate.toISOString().slice(0, 16) : '') : ''}
              onChange={handleDateChange}
            />
          </div>
          <div className="form-group">
            <label>Until Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="untilDate"
              value={quiz.untilDate ? (quiz.untilDate instanceof Date ? quiz.untilDate.toISOString().slice(0, 16) : '') : ''}
              onChange={handleDateChange}
            />
          </div>
        </div>
      )}
      {activeTab === 'questions' && (
        <div className="quiz-questions-editor">
          <QuizQuestionEditor />
        </div>
      )}
      <div className="quiz-editor-actions mt-4">
        <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
        <button className="btn btn-primary me-2" onClick={handleSaveAndPublish}>Save and Publish</button>
        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
