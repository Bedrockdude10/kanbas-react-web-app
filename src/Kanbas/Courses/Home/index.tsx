import Modules from "../Modules";
import CourseStatus from "./Status";
import { useParams, useLocation } from "react-router";
import { courses } from "../Database";
export default function Home() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find(course => course._id === cid);
  
  return (
    <div id="wd-home" className="d-flex">
        <div className="flex-fill me-5">
          <Modules />
        </div>
        <div className="d-none d-xl-block">
          <CourseStatus />
        </div>
    </div>
  );
}
