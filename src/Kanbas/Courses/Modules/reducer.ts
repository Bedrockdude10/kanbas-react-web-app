import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: "M104",
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any;
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId
      );
    },
    updateModule: (state, { payload: module }) => {
      console.log("Updating module in reducer:", module); // Log module details
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
      console.log("Updated modules state:", state.modules); // Log updated state
    },
    editModule: (state, { payload: moduleId }) => {
      console.log("Editing module with ID:", moduleId); // Log module ID
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
      console.log("Modules state after edit:", state.modules); // Log updated state
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;
