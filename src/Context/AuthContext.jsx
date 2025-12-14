import React, { createContext, useContext, useEffect, useState } from "react";
import api, {setAuthToken} from "../Services/api";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);
export function AuthProvider({children}) {
    const [token, setToken] = useState(() => {
        try{
            return JSON.parse(localStorage.getItem("token"));
        }
        catch{
            return null;
        }
    });

    const [user, setUser] = useState(() => {
        try{
            return JSON.parse(localStorage.getItem("user"))
        }
        catch{
            return null;
        }
    });

    const [pendingEmail, setPendingEmail] = useState(null);
    const [loading, setLoading] = useState(true);


    // Decode token using jwt-decode (super simple & safe )
    const decodeToken = (token) => {
        try{
            return jwtDecode(token);
        }
        catch{
            return null;
        }
    };


     // when it changes in header change
    // if token exists decode it and store it in localstorage
    useEffect(() => {
        setAuthToken(token);
        if(token) {
            const decoded = decodeToken(token);
            const payloadUser = decoded?.user || decoded || null;
            setUser(payloadUser);
            localStorage.setItem("user", JSON.stringify(payloadUser));
        } else {
            setUser(null);
            localStorage.removeItem("user");
        }
    }, [token]);

    
    // register function api call 
    const register = async (form) => {
        return await api.post("/api/auth/register", form);
    };

    // login function api call
    const login = async (form) => {
        const res = await api.post("/api/auth/login", form);
        setPendingEmail(form.email);   // verifying email for otp sending
        return res;
    };

    const verifyOTP = async(email, otp) => {
        const res = await api.post("/api/auth/verify-otp", { email, otp });
        if(res?.data?.accessToken) {
            setToken(res.data.accessToken);  
            localStorage.setItem("token", JSON.stringify(res.data.accessToken));
            setPendingEmail(null);
        };
        return res;
    };

    // //logout function
    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
        localStorage.removeItem("user");
    };


    return (
        <AuthContext.Provider 
        value={{token, user, pendingEmail, loading, register, login, verifyOTP}}
        >
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}