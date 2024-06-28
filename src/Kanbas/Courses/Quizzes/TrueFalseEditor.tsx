import React from 'react';

const TrueFalseEditor = ({ question, handleChange }: any) => (
  <div className="form-group">
    <label>Correct Answer</label>
    <div>
      <input
        type="radio"
        name="correctAnswer"
        checked={question.correctAnswer === true}
        onChange={() => handleChange({ target: { value: true } }, 'correctAnswer')}
      /> True
      <input
        type="radio"
        name="correctAnswer"
        checked={question.correctAnswer === false}
        onChange={() => handleChange({ target: { value: false } }, 'correctAnswer')}
      /> False
    </div>
  </div>
);

export default TrueFalseEditor;
