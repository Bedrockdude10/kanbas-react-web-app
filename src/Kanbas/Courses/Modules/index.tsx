import React, { useState } from "react"
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const addModule = () => {
    setModules([ ...modules, { _id: new Date().getTime().toString(),
                                     name: moduleName, course: cid, lessons: [] } ]);
    setModuleName("");
  };
  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };
  const editModule = (moduleId: string) => {
    setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
  };
  const updateModule = (module: any) => {
    setModules(modules.map((m) => (m._id === module._id ? module : m)));
  };

  return (
    <div className="wd-title p-3 ps-2 bg-secondary">
      <BsGripVertical className="me-2 fs-3" />
      {!module.editing && module.name}
      { module.editing && (
        <input className="form-control w-50 d-inline-block"
               onChange={(e) => updateModule({ ...module, name: e.target.value })}
               onKeyDown={(e) => {
                 if (e.key === "Enter") {
                   updateModule({ ...module, editing: false });
                 }
               }}
               value={module.name}/>
      )}
      <ModuleControlButtons
        moduleId={module._id}
        deleteModule={deleteModule}
        editModule={editModule}/>
      </div>
    </div>
);
}


