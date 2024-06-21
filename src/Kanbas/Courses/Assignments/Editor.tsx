import React, {ChangeEvent} from 'react';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAssignment, addAssignment } from './reducer';
import Assignment from './types';

interface RootState {
  assignments: {
    assignments: Assignment[];
  };
}

export default function AssignmentEditor() {
  const { aid, cid } = useParams<{ aid?: string; cid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetching the assignment from Redux state
  const assignment = useSelector((state: RootState) => 
    state.assignments.assignments.find(a => a._id === aid)
  );

  // Initialize local state with fetched assignment or default values
  const [currentAssignment, setCurrentAssignment] = useState<Assignment>(() => {
    return assignment || {
      _id: '',
      title: '',
      description: '',
      course: cid || 'default_cid',
      points: 0,
      dueDate: '',
      availableFromDate: '',
      availableUntilDate: '',
      displayGradeAs: '',
      group: '',
      submissionType: ''
    };
  });

  useEffect(() => {
    if (assignment) {
      setCurrentAssignment(assignment);
    }
  }, [assignment]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const isCheckbox = target instanceof HTMLInputElement && target.type === 'checkbox';
    const value = isCheckbox ? target.checked : target.value;
    const name = target.name;

    setCurrentAssignment(prevState => ({
        ...prevState,
        [name]: value
    }));
};



const handleSave = () => {
  if (currentAssignment._id) {
    dispatch(updateAssignment(currentAssignment));
  } else {
    const newAssignment = {
      ...currentAssignment,
      _id: new Date().getTime().toString()
    };
    dispatch(addAssignment(newAssignment));
  }
  navigate(`/Kanbas/Courses/${cid}/Assignments`);
};

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

  return (
    <div id="wd-assignments-editor" className="container mt-3">
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input id="wd-name" name='title' className="form-control" value={currentAssignment.title} onChange={handleInputChange} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea id="wd-description" className="form-control" name='description' value={currentAssignment.description} defaultValue="The assignment is available online. Submit a link to the landing page of" onChange={handleInputChange}/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input id="wd-points" className="form-control" type="number" name="points" value={currentAssignment.points} onChange={handleInputChange}/>
        </div>
        <div className="col-6">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          <select id="wd-group" className="form-select" name="group" value={currentAssignment.group} onChange={handleInputChange}>
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
          <select id="wd-display-grade-as" className="form-select" name="displayGradeAs" value={currentAssignment.displayGradeAs} onChange={handleInputChange}>
            <option value="Percentage">Percentage</option>
            <option value="Letter">Letter</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          <select id="wd-submission-type" className="form-select" name="submissionType" value={currentAssignment.submissionType} onChange={handleInputChange}>
            <option value="Online">Online</option>
            <option value="Paper">Paper</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Online Entry Options</label>
          <div className="form-check">
            <input type="checkbox" id="wd-text-entry" className="form-check-input" onChange={handleInputChange}/>
            <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-website-url" className="form-check-input" onChange={handleInputChange}/>
            <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-media-recordings" className="form-check-input" onChange={handleInputChange}/>
            <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-student-annotation" className="form-check-input" onChange={handleInputChange}/>
            <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-file-upload" className="form-check-input" onChange={handleInputChange}/>
            <label htmlFor="wd-file-upload" className="form-check-label">File Upload</label>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
          <select id="wd-assign-to" className="form-select" defaultValue="Everyone" onChange={handleInputChange}>
            <option value="Everyone">Everyone</option>
            <option value="Your Mom">Your Mom</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="wd-due-date" className="form-label">Due Date</label>
          <input type="date" id="wd-due-date" className="form-control" name="dueDate" value={currentAssignment.dueDate} onChange={handleInputChange}/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-available-from" className="form-label">Available From</label>
          <input type="date" id="wd-available-from" className="form-control" name="availableFromDate" value={currentAssignment.availableFromDate} onChange={handleInputChange}/>
        </div>
        <div className="col-6">
          <label htmlFor="wd-available-until" className="form-label">Available Until</label>
          <input type="date" id="wd-available-until" className="form-control" name="availableUntilDate" value={currentAssignment.availableUntilDate} onChange={handleInputChange}/>
        </div>
      </div>
      <div className="col mb-3 text-end">
          <button onClick={handleCancel} className="btn" style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc' }}>Cancel</button>
          <button onClick={handleSave} className="btn" style={{ backgroundColor: 'red', color: 'white' }}>Save</button>
      </div>
    </div>
  );
}
