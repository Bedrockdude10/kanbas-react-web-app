import { FaDownload, FaFileExport } from 'react-icons/fa';  // Updated icons
import { grades, assignments, enrollments } from '../../Database';
import { useParams } from "react-router-dom";

export default function Grades() {
  const {cid} = useParams()
  const local_assignments = assignments.filter(assignment => assignment.course === cid);
  const local_enrollments = enrollments.filter(enrollment => enrollment.course === cid);

  let gradesMap: {
    [studentId: string]: {
        [assignmentId: string]: string;
    };
  } = {};
  
  grades.forEach((grade) => {
    if (!gradesMap[grade.student]) {
        gradesMap[grade.student] = {};
    }
    gradesMap[grade.student][grade.assignment] = grade.grade;
  });

  function getGrade(studentId: string, assignmentId: string): string | null {
    if (gradesMap[studentId] && gradesMap[studentId][assignmentId]) {
        return gradesMap[studentId][assignmentId];
    }
    return null; // Return null if the grade doesn't exist
  }

  return (
    <div className="container mt-3">
      <div className="row mb-3">
        <div className="col-6">
          <input type="text" className="form-control" placeholder="Search Students" />
        </div>
        <div className="col-6">
          <input type="text" className="form-control" placeholder="Search Assignments" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <button className="btn btn-secondary me-2"><FaDownload /> Import</button>
          <div className="btn-group">
            <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <FaFileExport /> Export
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Option 1</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
                {local_assignments.map(assignment => (
                  <th>{assignment.title}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {local_enrollments.map(enrollment => (
              <tr key={enrollment._id}>
                <td>{enrollment.user}</td>
                {local_assignments.map(assignment => (
                  <td>{getGrade(enrollment.user, assignment._id)}</td>
                ))}
              </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
