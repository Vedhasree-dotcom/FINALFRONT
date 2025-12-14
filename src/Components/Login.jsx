import React, { useState } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";


export default function Login() {
    const [form, setForm] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const { login, user, token, loading } = useAuth();
    const location = useLocation()
    const [ notice, setNotice ] = useState("");
    const [ submitted, setSubmitted ] = useState(false);
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if(params.get("verified")) {
            setNotice("Email verified successfully. You can now login.");
            // remove the param from the URL without reloading
            window.history.replaceState({}, document.title, location.pathname);
        }
    }, [location]);

    // If already authenticated , send user straight to home
    useEffect(() => {
        if(!loading && (token || user)) {
            navigate("/home");
        }
    }, [loading, token, user, navigate]);

    const validate = () => {
        const errs = {};
        if (!form.email) errs.email = "Email is required";
        else if (!form.email.includes("@")) 
            errs.email = "Invalid email";
        if (!form.password) 
            errs.password = "Password is required";
        else if (form.password.length < 6) 
            errs.password = "Password must be atleast 6 characters";
        return errs;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate();
    if (Object.keys(errs).length) return;
    try {
        await login(form)
        navigate("/verify-otp", {state: {email: form.email } })
    } catch (err) {
        alert(err?.response?.data?.message || err.message);
    }
};

return (
    <form onSubmit={handleSubmit} className="form d-flex flex-column gap-2">
        {notice && <div className="alert alert-success">{notice}</div>}

        <h1 className="text-center">Login</h1>

        <input
            className="form-control"
            name="email"
            placeholder="Email"
            onChange={(e) =>
                setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
        />
        {submitted && validate().email && (
            <div className="text-danger small">{validate().email}</div>
        )}

        <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) =>
                setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
        />
        {submitted && validate().password && (
            <div className="text-danger small">{validate().password}</div>
        )}

        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/register"> Register </Link>
        <Link to= "/logout" className="btn btn-danger"> Logout </Link>
    </form>
);


}






