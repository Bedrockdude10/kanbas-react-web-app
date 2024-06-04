import { useParams, Link } from 'react-router-dom';
import { assignments } from '../../Database';

export default function AssignmentEditor() {
  const { courseId, aid } = useParams();
  const assignment = assignments.find(a => a._id === aid);

  return (
    <div id="wd-assignments-editor" className="container mt-3">
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input id="wd-name" className="form-control" value={assignment.title} readOnly />
        </div>
      </div>
      {/* Additional fields like description, points, etc., need to be added similarly once they are included in your assignment data structure. */}
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea id="wd-description" className="form-control" defaultValue="The assignment is available online. Submit a link to the landing page of" readOnly />
        </div>
      </div>
      
      <div className="row mb-3">
        <div className="col-12">
          <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
          <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-danger">Save</Link>
        </div>
      </div>
    </div>
  );
}
