import React, { useState } from 'react';
import axios from 'axios';
import { saveToken, getRoleFromToken } from '../../../utils/Auth';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginHandle = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      saveToken(res.data.token);
      const role = getRoleFromToken();

      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if(role === 'impexp') {
        navigate('/imp-exp/dashboard');
      }
    } catch (err) {
      alert('Login failed');
    }
  };
  return (
    <>
    <form className="p-4">
      <h2>Login</h2>
      <input className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginHandle} className="btn btn-primary" type="submit">Login</button>
    </form>
    </>
  )
}

export default Login
