import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft, FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css';
import { BASE_URL } from '../../configs/Urls';

const Login = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, formData);
      console.log('Login successful:', response.data);
      localStorage.setItem("jwtToken",response.data.jwtToken)
      navigate('/home/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="login-page">
     <span style={{margin:"30px 20px",height:"70px",width:"70px"}} onClick={()=>{navigate('/landing')}} ><FaArrowCircleLeft color='Orange' size={36} /></span>
      
      <div className="login-right-panel">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h2>Login</h2>
            <p>Sign in to proceed</p>
          </div>
          
          {error && <div className="login-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <div className="login-input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  />
                <span className="login-input-icon" style={{color:"orange"}}><FaEnvelope/></span>
              </div>
            </div>
            
            <div className="login-form-group">
              <div className="login-label-row">
                <label htmlFor="password">Password</label>
                <a href="/forgot-password" className="login-forgot-link">Forgot Password?</a>
              </div>
              <div className="login-input-container">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  />
                <span className="login-input-icon"><FaLock color='Orange'/></span>
              </div>
            </div>
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup" className="login-signup-link">Create Account</Link></p>
          </div>
      
        </div>
      </div>
    </div>
                  </>
  );
};

export default Login;