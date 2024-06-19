import React from 'react';
import LessonControlButtons from "../Modules/LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useParams} from 'react-router';
import { Link, useLocation } from "react-router-dom";
import { assignments } from "../../Database"
import { addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";


export default function Assignments() {
  const { cid } = useParams();
  const local_assignments = assignments.filter(assignment => assignment.course === cid);

  return (
    <div id="wd-assignments" className="container">
      <div className="d-flex justify-content-between mb-3">
        <div className="position-relative">
          <FaSearch className="position-absolute top-50 translate-middle-y ms-3 fs-5 text-muted" style={{ zIndex: 5 }} />
          <input id="wd-search-assignment" className="form-control pl-5"
                 placeholder="Search for Assignments" style={{ paddingLeft: '2rem' }}/>
        </div>
        <div>
          <button className="btn btn-secondary me-2"><FaPlus /> Group</button>
          <button className="btn btn-danger"><FaPlus /> Assignment</button>
        </div>
      </div>
      <h3 id="wd-assignments-title" className="mb-3">
        ASSIGNMENTS 40% of Total <button className="btn btn-link">+</button>
      </h3>
      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Assignment List
            <button className="btn btn-light btn-sm float-end">Edit</button>
          </div>
          <ul id="wd-assignment-list" className="list-group rounded-0">
            {local_assignments.map((assignment) => ( 
              <Link to={`/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`} className="text-decoration-none" >
                {renderAssignment(assignment.title, "Multiple Modules | Not available until May 6 at 12:00am", "Due May 13 at 11:59pm | 100 pts")}
              </Link>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

function renderAssignment(name: string, availability: string, due: string) {
  return (
    <li className="wd-assignment-list-item list-group-item d-flex align-items-center" style={{borderLeft: '5px solid green'}}>
      <BsGripVertical className="fs-3 me-2" />
      <div className="flex-grow-1">
        <a className="wd-assignment-link fs-5 fw-bold d-block">
            {name}
        </a>
        <div>
            <p>{availability}</p>
            <p>{due}</p>
        </div>
        <LessonControlButtons />
      </div>
    </li>
  );
}
