import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email,
                password,
            });

            const { token, user } = response.data;

            // Save token and role to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("email", user.email);

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else if (user.role === "icmr") {
                navigate("/icmr/dashboard");
            } else if (user.role === "committee") {
                navigate("/committee/dashboard");
            } else if (user.role === "imp-exp") {
                navigate("/imp-exp/dashboard");
            } else {
                navigate("/login"); // fallback
            }

        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials");
        }
    };

    return (
        <form>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button onClick={handleLogin} type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
