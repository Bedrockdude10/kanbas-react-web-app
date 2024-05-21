import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import "./styles.css"
export default function Kanbas() {
  return (
    <div id="wd-kanbas" className="h-100">
      <div className="d-flex h-100">
        <div className="d-none d-md-block bg-black">
          <KanbasNavigation />
        </div>
        <div className="flex-fill p-4">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Courses/:cid/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </div>
);}
