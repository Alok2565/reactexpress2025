import React, { createContext, useContext, useState } from "react";

// 1️⃣ Create the Context
const ProjectContext = createContext();

// 2️⃣ Create a Custom Hook to Access Context
export const useProject = () => useContext(ProjectContext);

// 3️⃣ Create a Provider Component
export const ProjectProvider = ({ children }) => {
    // State to hold the project title
    const [title, setTitle] = useState("Transfer of Human Biological Material (THBM)");

    return (
        <ProjectContext.Provider value={{ title, setTitle }}>
            {children}
        </ProjectContext.Provider>
    );
};
