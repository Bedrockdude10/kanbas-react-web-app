import { FaDownload, FaFileExport } from 'react-icons/fa';  // Updated icons

export default function Grades() {
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
              <th>A1 SETUP</th>
              <th>A2 HTML</th>
              <th>A3 CSS</th>
              <th>A4 BOOTSTRAP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jane Adams</td>
              <td><input type="text" className="form-control" defaultValue="100%" /></td>
              <td>96.67%</td>
              <td>92.18%</td>
              <td>66.22%</td>
            </tr>
            {/* Additional rows can be added as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
