import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
export default function ModuleControlButtons() {
    return (
    <div className="float-end">
      <GreenCheckmark />
      <button className="btn btn-secondary me-2"> {/* Add Bootstrap button with margin */}
        <FaPlus className="fs-4" /> {/* Add the plus icon inside the button */}
      </button>
      <IoEllipsisVertical className="fs-4" />
    </div>
);}