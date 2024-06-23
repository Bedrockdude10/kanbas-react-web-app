import React, { useState, useEffect } from "react";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import * as client from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const modules = useSelector((state: RootState) => state.modules.modules);
  const dispatch = useDispatch();
  const saveModule = async (module: any) => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };
  const removeModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
  const createModule = async (module: any) => {
    const newModule = await client.createModule(cid as string, module);
    dispatch(addModule(newModule));
  };
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div className="wd-modules">
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName}
        addModule={() => {
          createModule({ name: moduleName, course: cid });
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
                onChange={(e) => saveModule({ ...module, name: e.target.value }) }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveModule({ ...module, editing: false });
                  }
                }}
                value={module.name}
              />
            )}
            <ModuleControlButtons 
              moduleId={module._id}
              deleteModule={(moduleId) => { removeModule(moduleId); }}
              editModule={() => dispatch(editModule(module._id))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
