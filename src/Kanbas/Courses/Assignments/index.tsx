import React, {useState, useEffect} from 'react';
import LessonControlButtons from "../Modules/LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useParams, useNavigate} from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import { RootState } from '../../store';
import * as client from "./client"
import { setAssignments, deleteAssignment } from './reducer';

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignments);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const removeAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const handleAddAssignment = () => {
    navigate("new"); // Navigate to the new assignment editor
  };

  // Fetch assignments from Redux state filtered by course ID
 

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState('');

  const handleDeleteClick = (assignmentId : string) => {
    setCurrentAssignmentId(assignmentId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    removeAssignment(currentAssignmentId);
    setShowDeleteConfirm(false);
    const url = `/Kanbas/Courses/${cid}/Assignments`;
    navigate(url);  // Adjust if necessary to stay on the current page or redirect
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div id="wd-assignments" className="container">
      <div className="d-flex justify-content-between mb-3">
        <div className="position-relative">
          <FaSearch className="position-absolute top-50 translate-middle-y ms-3 fs-5 text-muted" style={{ zIndex: 5 }} />
          <input id="wd-search-assignment" className="form-control pl-5" placeholder="Search for Assignments" style={{ paddingLeft: '2rem' }}/>
        </div>
        <div>
          <button className="btn btn-secondary me-2"><FaPlus /> Group</button>
          <button onClick={handleAddAssignment} className="btn btn-danger"><FaPlus /> Assignment</button>
        </div>
      </div>
      <h3 id="wd-assignments-title" className="mb-3">
        ASSIGNMENTS 40% of Total <button className="btn btn-link">+</button>
      </h3>
      <ul className="list-group rounded-0">
        {assignments.map((assignment: any) => 
            <li className="wd-assignment-list-item list-group-item d-flex align-items-center" style={{borderLeft: '5px solid green'}}>
            <BsGripVertical className="fs-3 me-2" />
            <div className="flex-grow-1" onClick={() => navigate(`/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`)} style={{cursor: 'pointer'}}>
              <div className="wd-assignment-link fs-5 fw-bold">
                  {assignment.title}
              </div>
              <div>
                  <p>{assignment.availableFromDate}</p>
                  <p>{assignment.dueDate}</p>
              </div>
            </div>
            <LessonControlButtons/>
            <button className="btn" onClick={(e) => {
                e.stopPropagation();  // Prevents the navigation event from bubbling up to the div
                handleDeleteClick(assignment._id);
              }}>
              <FaTrash className="text-danger" />
            </button>
            {showDeleteConfirm && (
              <div>
                <p>Are you sure you want to delete this assignment?</p>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={cancelDelete}>No</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
