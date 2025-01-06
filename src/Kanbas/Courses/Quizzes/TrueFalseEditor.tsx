import React from 'react';
import { NewQuestion, Question } from '../../types';

interface TrueFalseEditorProps {
  question: Question;
  handleChange: (updatedQuestion: any) => void;
}

const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({ question, handleChange }) => {
  const handleRadioChange = (correctAnswer: boolean) => {
    const updatedQuestion = { ...question, correctAnswer };
    handleChange(updatedQuestion);
  };

  return (
    <div className="form-group">
      <label>Correct Answer</label>
      <div>
        <input
          type="radio"
          name="correctAnswer"
          checked={question.correctAnswer === true}
          onChange={() => handleRadioChange(true)}
        /> True
        <input
          type="radio"
          name="correctAnswer"
          checked={question.correctAnswer === false}
          onChange={() => handleRadioChange(false)}
        /> False
      </div>
    </div>
  );
};

export default TrueFalseEditor;
