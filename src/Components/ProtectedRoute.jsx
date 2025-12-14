import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


export default function ProtectedRoute({ children }) {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/" replace />;  // Redirect to login if not authenticated
    }
    return children;
}