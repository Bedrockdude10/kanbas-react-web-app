export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" />
        <br /><br />
        <textarea id="wd-description">
          The assignment is available online
          Submit a link to the landing page of
        </textarea>
        <br />
        <table>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-points">Points</label>
                </td>
                <td>
                    <input id="wd-points" value={100} />
                </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-group">Assignment Group</label>
                </td>
                <td>
                    <select id="wd-group" value={"ASSIGNMENTS"}>
                    <option value={"ASSIGNMENTS"}>ASSIGNMENTS</option>
                    <option value={"QUIZZES"}>QUIZZES</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-display-grade-as">Display Grade as</label>
                </td>
                <td>
                    <select id="wd-display-grade-as" value={"Percentage"}>
                    <option value={"Percentage"}>Percentage</option>
                    <option value={"Letter"}>Letter</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-submission-type">Submission Type</label>
                </td>
                <td>
                    <select id="wd-submission-type" value={"Online"}>
                    <option value={"Online"}>Online</option>
                    <option value={"Paper"}>Paper</option>
                    </select>
                </td>
            </tr>
            <tr> 
                <td>
                    <label>Online Entry Options</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="wd-text-entry"/>
                    <label htmlFor="wd-text-entry">Text Entry</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="wd-website-url"/>
                    <label htmlFor="wd-website-url">Website URL</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="wd-media-recordings"/>
                    <label htmlFor="wd-media-recordings">Media Recordings</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="wd-student-annotation"/>
                    <label htmlFor="wd-student-annotation">Student Annotation</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="wd-file-upload"/>
                    <label htmlFor="wd-file-upload">File Upload</label>
                </td>
            </tr>
            <tr> 
                <td> 
                    <label htmlFor="wd-assign-to">Assign to</label>
                </td>
            </tr>
            <tr>
                <td>
                    <select id="wd-assign-to" value={"Everyone"}>
                        <option value={"Everyone"}>Everyone</option>
                        <option value={"Your Mom"}>Your Mom</option>
                    </select>
                </td>
            </tr>
            <tr> 
                <td> 
                    <label htmlFor="wd-due-date">Due</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="date" id="wd-due-date" />
                </td>
            </tr>
            <tr>
                <td>
                    <label htmlFor="wd-available-from" style={{ marginRight: '20px' }}>Available from</label>
                    <label htmlFor="wd-available-until">Until</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="date" id="wd-available-from" />
                    <input type="date" id="wd-available-until" />
                </td>
            </tr>
        </table>
      </div>
  );}
  