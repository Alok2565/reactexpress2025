import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext();
export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [title, setTitle] = useState("Transfer of Human Biological Material (THBM)");
    return (
        <ProjectContext.Provider value={{ title, setTitle }}>
            {children}
        </ProjectContext.Provider>
    );
};
