import React, { useState } from "react";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";


export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className="wd-modules">
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <ul id="wd-modules" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%', 
        listStyleType: 'none', 
        padding: 0 
      }}>
        {modules.filter((module: any) => module.course === cid).map((module: any) => (
          <li key={module._id} className="list-group-item"> {/* Added key and li as the wrapper */}
            {!module.editing ? (
              <span>{module.name}</span>
            ) : (
              <input 
                className="form-control w-50 d-inline-block"
                onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(updateModule({ ...module, editing: false }));
                  }
                }}
                value={module.name}
              />
            )}
            <ModuleControlButtons 
              moduleId={module._id}
              deleteModule={() => dispatch(deleteModule(module._id))}
              editModule={() => dispatch(editModule(module._id))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
