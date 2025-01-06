import React from 'react';
import { Question, NewQuestion } from '../../types';

interface FillInBlanksEditorProps {
  question: Question | NewQuestion;
  handleChange: (updatedQuestion: Question | NewQuestion) => void;
}

const FillInBlanksEditor: React.FC<FillInBlanksEditorProps> = ({ question, handleChange }) => {
  const handleAddAnswer = () => {
    const updatedAnswers = [...(question.correctAnswers || []), ''];
    handleChange({ ...question, correctAnswers: updatedAnswers });
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAnswers = (question.correctAnswers || []).map((answer, i) =>
      i === index ? e.target.value : answer
    );
    handleChange({ ...question, correctAnswers: updatedAnswers });
  };

  return (
    <div className="form-group">
      <label>Correct Answers</label>
      {(question.correctAnswers || []).map((answer: string, index: number) => (
        <input
          key={index}
          type="text"
          className="form-control mb-2"
          value={answer}
          onChange={(e) => handleAnswerChange(e, index)}
        />
      ))}
      <button
        className="btn btn-secondary"
        onClick={handleAddAnswer}
      >
        Add Answer
      </button>
    </div>
  );
};

export default FillInBlanksEditor;
