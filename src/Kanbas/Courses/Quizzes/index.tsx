import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import * as client from "./client";
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz } from "./reducer";
import { Quiz, NewQuiz } from "../../types"; // Ensure NewQuiz is imported from types
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IconButton, Menu, MenuItem } from "@mui/material";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const saveQuiz = async (quiz: Quiz) => {
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

  const handleCreateQuiz = async () => {
    const newQuiz: NewQuiz = {
      name: "New Quiz",
      description: "",
      course: cid as string,
      quizType: 'gradedQuiz',
      points: 0,
      assignmentGroup: 'quizzes',
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      attemptLimit: 1,
      showCorrectAnswers: 'never',
      accessCode: "",
      oneQuestionAtATime: false,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: undefined,
      availableDate: undefined,
      untilDate: undefined,
      published: false,
      questions: [],
      editing: false,
    };
    const createdQuiz = await client.createQuiz(cid as string, newQuiz);
    dispatch(addQuiz(createdQuiz));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${createdQuiz._id}`); // Navigate to the quiz details screen
  };

  const handlePublishQuiz = async (quiz: Quiz) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    saveQuiz(updatedQuiz);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, quiz: Quiz) => {
    setAnchorEl(event.currentTarget);
    setCurrentQuiz(quiz);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentQuiz(null);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-3">
        <div className="position-relative">
          <input id="search-quiz" className="form-control pl-5" placeholder="Search for Quizzes" style={{ paddingLeft: '2rem' }}/>
        </div>
        <div>
          <button 
            className="btn btn-danger"
            onClick={() => handleCreateQuiz()}>
            <FaPlus /> Quiz
          </button>
        </div>
      </div>
      {quizzes.length === 0 ? (
        <div className="alert alert-info">No quizzes found. Click + Quiz to add a new quiz.</div>
      ) : (
        <ul className="list-group rounded-0">
          {quizzes.filter((quiz: Quiz) => quiz.course === cid).map((quiz: Quiz) => (
            <li key={quiz._id} className="list-group-item d-flex align-items-center">
              <BsGripVertical className="fs-3 me-2" />
              <div className="flex-grow-1" onClick={() => navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`)} style={{ cursor: 'pointer' }}>
                <div className="fw-bold">{quiz.name}</div>
                <div>
                  {quiz.published ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}
                  <span className="ms-2">{quiz.published ? 'Published' : 'Unpublished'}</span>
                </div>
                <div>
                  Points: {quiz.points} | Questions: {quiz.questions.length}
                </div>
              </div>
              <IconButton onClick={(e) => handleClick(e, quiz)}>
                <BsThreeDotsVertical />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`);
                  handleClose();
                }}>Edit</MenuItem>
                <MenuItem onClick={() => {
                  handlePublishQuiz(currentQuiz as Quiz);
                  handleClose();
                }}>{currentQuiz?.published ? 'Unpublish' : 'Publish'}</MenuItem>
                <MenuItem onClick={() => {
                  removeQuiz(currentQuiz?._id as string);
                  handleClose();
                }}>Delete</MenuItem>
              </Menu>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
