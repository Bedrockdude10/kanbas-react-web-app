import React, { useState, useEffect } from 'react';
import { Question, NewQuestion, Choice } from '../../types';

interface MultipleChoiceEditorProps {
  question: Question | NewQuestion;
  handleChange: (updatedQuestion: Question | NewQuestion) => void;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({ question, handleChange }) => {
  const [localQuestion, setLocalQuestion] = useState<Question | NewQuestion>(question);
  const [choices, setChoices] = useState<Choice[]>(question.choices ? [...question.choices] : []);

  useEffect(() => {
    setLocalQuestion(question);
    setChoices(question.choices ? [...question.choices] : []);
  }, [question]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const updatedChoices = choices.map((choice, i) =>
      i === index ? { ...choice, text: e.target.value } : choice
    );
    setChoices(updatedChoices);
    setLocalQuestion({ ...localQuestion, choices: updatedChoices });
  };

  const handleRadioChange = (index: number) => {
    const updatedChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setChoices(updatedChoices);
    setLocalQuestion({ ...localQuestion, choices: updatedChoices });
  };

  const handleAddChoice = () => {
    const updatedChoices = [...choices, { text: '', isCorrect: false }];
    setChoices(updatedChoices);
    setLocalQuestion({ ...localQuestion, choices: updatedChoices });
  };

  const handleSave = () => {
    handleChange({ ...localQuestion, choices });
  };

  return (
    <div className="form-group">
      <label>Choices</label>
      {choices.map((choice, index) => (
        <div key={index} className="input-group mb-2">
          <textarea
            className="form-control"
            value={choice.text}
            onChange={(e) => handleTextChange(e, index)}
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <input
                type="radio"
                name="correctChoice"
                checked={choice.isCorrect}
                onChange={() => handleRadioChange(index)}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        className="btn btn-secondary"
        onClick={handleAddChoice}
      >
        Add Choice
      </button>
      <button className="btn btn-success mt-2" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default MultipleChoiceEditor;
