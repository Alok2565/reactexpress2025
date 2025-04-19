import { useState } from "react";
import axios from "axios";

const RoleForm = () => {
  const [role_name, setRoleName] = useState("");
  const [role_slug, setRoleSlug] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!role_name || !role_slug) {
      alert("Both fields are required");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/api/roles", { role_name, role_slug });
      setRoleName("");
      setRoleSlug("");
      alert("Role created successfully");
    } catch (error) {
      console.error("Role creation failed:", error.response?.data);
      alert("Error: " + (error.response?.data?.error || "Unknown error"));
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input value={role_name} onChange={e => setRoleName(e.target.value)} placeholder="Role Name" />
      <input value={role_slug} onChange={e => setRoleSlug(e.target.value)} placeholder="Role Slug" />
      <button type="submit">Create Role</button>
    </form>
  );
};

export default RoleForm;
