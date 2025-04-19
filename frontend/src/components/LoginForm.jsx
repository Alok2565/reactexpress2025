// import { useState } from "react";
// import axios from "axios";

// const LoginForm = () => {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const res = await axios.post("http://localhost:5000/api/login", form);
//     alert("Logged in with token: " + res.data.token);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
//       <input type="password" name="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const roleId = decoded.role;

      // Redirect based on roleId
      if (roleId === "adminRoleObjectIdHere") {
        navigate("/admin/dashboard");
      } else {
        navigate("imp-exp/dashboard");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <input type="password" name="password" onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
