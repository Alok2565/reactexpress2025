// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem("token");
//     return token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // e.g., "icmr", "committee", etc.

    const path = location.pathname;

    // Check role based on URL path
    if (path.startsWith("/icmr")) {
        if (!token || role !== "icmr") {
            return <Navigate to="/icmr/login" replace />;
        }
    } else if (path.startsWith("/committee")) {
        if (!token || role !== "committee") {
            return <Navigate to="/committee/login" replace />;
        }
    } else if (path.startsWith("/admin")) {
        if (!token || role !== "admin") {
            return <Navigate to="/admin/login" replace />;
        }
    } else if (path.startsWith("/imp-exp")) {
        if (!token || role !== "imp-exp") {
            return <Navigate to="/imp-exp/login" replace />;
        }
    }

    // Default fallback: allow access if token exists
    return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
