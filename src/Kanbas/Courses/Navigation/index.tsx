import "./index.css";
import { useParams, useLocation } from "react-router";
export default function CoursesNavigation() {
   const {courseID} = useParams()
   const {pathname} = useLocation()
   const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades"];
   return (
      <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
         {links.map((link) => {
            const linkPath = link.replace(/\s+/g, ''); // Remove any spaces for URL compatibility
            const isActive = pathname.includes(`/Kanbas/Courses/${courseID}/${linkPath}`);
            const linkHref = `#/Kanbas/Courses/${courseID}/${linkPath}`;
            const linkId = `wd-course-${linkPath.toLowerCase()}-link`;

            return (
               <a key={linkPath}
                  id={linkId}
                  href={linkHref}
                  className={`list-group-item ${isActive ? 'active' : 'text-danger'} border-0`}
               >
                  {link}
               </a>
            );
         })}
      </div>
  );
}
