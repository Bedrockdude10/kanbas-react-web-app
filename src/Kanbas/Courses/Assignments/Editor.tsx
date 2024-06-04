import { useParams} from 'react-router';
import { Link, useLocation } from "react-router-dom";
import { assignments } from "../../Database"

export default function AssignmentEditor() {
  const {aid, cid} = useParams()
  const current_assignment = assignments.find(assignment => assignment._id === aid)

  return (
    <div id="wd-assignments-editor" className="container mt-3">
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input id="wd-name" className="form-control" value={current_assignment?.title} />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea id="wd-description" className="form-control" defaultValue="The assignment is available online. Submit a link to the landing page of" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input id="wd-points" className="form-control" type="number" defaultValue={100} />
        </div>
        <div className="col-6">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          <select id="wd-group" className="form-select" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
          <select id="wd-display-grade-as" className="form-select" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Letter">Letter</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
          <select id="wd-submission-type" className="form-select" defaultValue="Online">
            <option value="Online">Online</option>
            <option value="Paper">Paper</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Online Entry Options</label>
          <div className="form-check">
            <input type="checkbox" id="wd-text-entry" className="form-check-input" />
            <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-website-url" className="form-check-input" />
            <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
            <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
            <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
          </div>
          <div className="form-check">
            <input type="checkbox" id="wd-file-upload" className="form-check-input" />
            <label htmlFor="wd-file-upload" className="form-check-label">File Upload</label>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
          <select id="wd-assign-to" className="form-select" defaultValue="Everyone">
            <option value="Everyone">Everyone</option>
            <option value="Your Mom">Your Mom</option>
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="wd-due-date" className="form-label">Due Date</label>
          <input type="date" id="wd-due-date" className="form-control" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="wd-available-from" className="form-label">Available From</label>
          <input type="date" id="wd-available-from" className="form-control" />
        </div>
        <div className="col-6">
          <label htmlFor="wd-available-until" className="form-label">Available Until</label>
          <input type="date" id="wd-available-until" className="form-control" />
        </div>
      </div>
      <div className="col mb-3 text-end">
        <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
          <button className="btn" style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc' }}>Cancel</button>
        </Link>
        <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
          <button className="btn" style={{ backgroundColor: 'red', color: 'white' }}>Save</button>
        </Link>
      </div>
    </div>
  );
}
