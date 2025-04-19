import { useEffect, useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [role_id, setRoleId] = useState('');

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios .get("http://localhost:5000/api/roles")
      .then((res) => setRoles(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !email || !role_id) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users", {
        name,
        username,
        email,
        role_id,
      });
      setName("");
      setUserName("");
      setEmail("");
      setRoleId("");
      alert("User created successfully");
    } catch (error) {
      console.error("User creation failed:", error.response?.data);
      alert("Error: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <form>
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        name="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="User Name"
      />
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <select value={role_id} onChange={(e) => setRoleId(e.target.value)}>
        <option value="">Select Role</option>
        {roles.map((role) => (
          <option key={role._id} value={role._id}>
            {role.role_slug}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit} type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
