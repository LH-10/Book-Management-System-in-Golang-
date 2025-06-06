import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { FaArrowCircleLeft, FaEnvelopeSquare, FaLock, FaMailBulk, FaMailchimp, FaRegEnvelope, FaStore, FaUser } from 'react-icons/fa';
import { BASE_URL } from '../../configs/Urls';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeName: '',
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
      const response = await axios.post(`${BASE_URL}/api/signup`, formData);
      console.log('Signup successful:', response.data);
      toast.success("Sigup Successful",{autoClose:1200,onClose:(()=>{navigate("/login")})})
    } catch (err) {
      console.log(err)
      setError(err.response?.data || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (<>
    <div className="signup-page">
     <span style={{margin:"30px 20px",height:"70px",width:"70px"}} onClick={()=>{navigate('/')}} ><FaArrowCircleLeft color='Orange' size={36} /></span>
      
      <div className="signup-left-panel">
        <div className="signup-form-container">
          <div className="signup-header">
            <h2>Create Your Account</h2>
          </div>
          
          {error && <div className="signup-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-form-group">
              <label htmlFor="username">Username</label>
              <div className="signup-input-container">
                <input
                  type="text"
                  id="username"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                />
                <span className="signup-input-icon"><FaUser/></span>
              </div>
            </div>
            
            <div className="signup-form-group">
              <label htmlFor="email">Email</label>
              <div className="signup-input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  />
                <span className="signup-input-icon"><FaRegEnvelope/></span>
              </div>
            </div>
            
            <div className="signup-form-group">
              <label htmlFor="storeName">Store Name</label>
              <div className="signup-input-container">
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="Enter your store name"
                  required
                  />
                <span className="signup-input-icon"><FaStore/></span>
              </div>
            </div>
            
            <div className="signup-form-group">
              <label htmlFor="password">Password</label>
              <div className="signup-input-container">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  />
                <span className="signup-input-icon"><FaLock/></span>
              </div>
            </div>
            
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="signup-footer">
            <p>Already have an account? <Link to="/login" className="signup-login-link">Sign In</Link></p>
          </div>
        </div>
        
       
      </div>
      
      <ToastContainer theme='colored'/>
    </div>
                  </>
  );
};

export default Signup;