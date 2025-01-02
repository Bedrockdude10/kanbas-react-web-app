import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateQuiz, addQuestion, updateQuestion, deleteQuestion } from './reducer';
import { Quiz, NewQuestion, Question } from '../../types';
import * as client from './client';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TrueFalseEditor';
import FillInBlanksEditor from './FillInBlanksEditor';

const QuizQuestionEditor = () => {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quizzes.quizzes.find(q => q._id === qid));

  const [questions, setQuestions] = useState<Question[]>(quiz ? quiz.questions : []);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<NewQuestion | null>(null);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  useEffect(() => {
    if (quiz) {
      setQuestions(quiz.questions);
    }
  }, [quiz, triggerUpdate]);

  const handleAddNewQuestion = () => {
    const defaultQuestion: NewQuestion = {
      title: 'New Question',
      points: 0,
      questionType: 'multipleChoice',
      questionText: '',
      choices: [{ text: '', isCorrect: false }],
    };
    setNewQuestion(defaultQuestion);
  };

  const handleEditQuestion = (questionId: string) => {
    setEditingQuestionId(questionId);
  };

  const handleSaveQuestion = async () => {
    if (newQuestion) {
      try {
        const response = await client.addQuestionToQuiz(qid!, newQuestion);
        dispatch(addQuestion({ quizId: qid!, question: response }));
        setNewQuestion(null);
        setTriggerUpdate(!triggerUpdate); // Trigger the update
      } catch (error) {
        console.error('Error saving question:', error);
      }
    } else if (editingQuestionId) {
      const question = questions.find(q => q._id === editingQuestionId);
      if (question) {
        try {
          const response = await client.updateQuestion(question);
          dispatch(updateQuestion({ quizId: qid!, question: response }));
          setEditingQuestionId(null);
          setTriggerUpdate(!triggerUpdate); // Trigger the update
        } catch (error) {
          console.error('Error updating question:', error);
        }
      }
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await client.deleteQuestion(questionId);
      dispatch(deleteQuestion({ quizId: qid!, questionId }));
      setTriggerUpdate(!triggerUpdate); // Trigger the update
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
    setNewQuestion(null);
  };

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string, questionId: string | null) => {
    const value = e.target.value === 'true' ? true : e.target.value === 'false' ? false : e.target.value;
    const fieldPath = field.split('.');
    const updateField = (obj: any, path: string[], value: any): any => {
      if (path.length === 1) {
        return { ...obj, [path[0]]: value };
      }
      return { ...obj, [path[0]]: updateField(obj[path[0]], path.slice(1), value) };
    };

    if (questionId) {
      const updatedQuestions = questions.map(q => q._id === questionId ? updateField(q, fieldPath, value) : q);
      setQuestions(updatedQuestions);
    } else if (newQuestion) {
      setNewQuestion(updateField(newQuestion, fieldPath, value));
    }
  };

  const handleMultipleChoiceChange = (updatedQuestion: any) => {
    const updatedQuestions = questions.map(q => q._id === updatedQuestion._id ? updatedQuestion : q);
    setQuestions(updatedQuestions);
  };

  const handleTrueFalseChange = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map(q => q._id === updatedQuestion._id ? updatedQuestion : q);
    setQuestions(updatedQuestions);
  };

  const handleFillInBlanksChange = (updatedQuestion: any) => {
    const updatedQuestions = questions.map(q => q._id === updatedQuestion._id ? updatedQuestion : q);
    setQuestions(updatedQuestions);
  };

  const renderQuestionEditor = (question: any) => {
    switch (question.questionType) {
      case 'multipleChoice':
        return <MultipleChoiceEditor question={question} handleChange={handleMultipleChoiceChange} />;
      case 'trueFalse':
        return <TrueFalseEditor question={question} handleChange={handleTrueFalseChange} />;
      case 'fillInBlanks':
        return <FillInBlanksEditor question={question} handleChange={handleFillInBlanksChange} />;
      default:
        return null;
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Quiz Questions Editor</h2>
      <ul className="list-group">
        {questions.map((question) => (
          <li key={question._id} className="list-group-item">
            <strong>{question.title}</strong>
            <p>{question.questionText}</p>
            <button className="btn btn-secondary" onClick={() => handleEditQuestion(question._id)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-3" onClick={handleAddNewQuestion}>+ New Question</button>
      {(newQuestion || editingQuestionId) && (
        <div className="question-editor mt-3">
          <h3>{newQuestion ? 'New Question' : 'Edit Question'}</h3>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={newQuestion ? newQuestion.title : questions.find(q => q._id === editingQuestionId)?.title || ''}
              onChange={(e) => handleQuestionTextChange(e, 'title', editingQuestionId)}
            />
          </div>
          <div className="form-group">
            <label>Question Text</label>
            <textarea
              className="form-control"
              value={newQuestion ? newQuestion.questionText : questions.find(q => q._id === editingQuestionId)?.questionText || ''}
              onChange={(e) => handleQuestionTextChange(e, 'questionText', editingQuestionId)}
            />
          </div>
          <div className="form-group">
            <label>Points</label>
            <input
              type="number"
              className="form-control"
              value={newQuestion ? newQuestion.points : questions.find(q => q._id === editingQuestionId)?.points || 0}
              onChange={(e) => handleQuestionTextChange(e, 'points', editingQuestionId)}
            />
          </div>
          <div className="form-group">
            <label>Question Type</label>
            <select
              className="form-control"
              value={newQuestion ? newQuestion.questionType : questions.find(q => q._id === editingQuestionId)?.questionType || ''}
              onChange={(e) => handleQuestionTextChange(e, 'questionType', editingQuestionId)}
            >
              <option value="multipleChoice">Multiple Choice</option>
              <option value="trueFalse">True/False</option>
              <option value="fillInBlanks">Fill in Blanks</option>
            </select>
          </div>
          {renderQuestionEditor(newQuestion || (questions.find(q => q._id === editingQuestionId) as Question))}
          <button className="btn btn-success me-2" onClick={handleSaveQuestion}>Save</button>
          <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
      <div className="quiz-editor-actions mt-4">
        <button className="btn btn-secondary" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}>Back to Quiz</button>
      </div>
    </div>
  );
};

export default QuizQuestionEditor;
