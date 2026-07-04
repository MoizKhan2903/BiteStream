import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const PartnerLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => { e.preventDefault(); 
const email = e.target.email.value; 
const password = e.target.password.value;
const response = await axios.post('http://localhost:3000/api/auth/food-partner/login', {
  email,
  password
   },{ withCredentials: true })

   console.log(response.data);

   navigate("/create-food")
  }
  return (
    <div className="auth-screen">
      <div className="auth-card">
        
        <div className="auth-header">
          <div className="brand-mark" />
          <div>
            <div className="auth-title">Partner sign in</div>
            <div className="auth-sub">Access your partner dashboard</div>
          </div>
        </div>

  <form className="form" onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="partner-login-email">Email</label>
            <input id="partner-login-email" name="email" type="email" placeholder="contact@yourbiz.com" />
          </div>

          <div className="input">
            <label htmlFor="partner-login-password">Password</label>
            <input id="partner-login-password" name="password" type="password" placeholder="Your password" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Sign in</button>
            <Link to="/food-partner/register" className="btn ghost" role="button">Create account</Link>
          </div>
        </form>
        <div className="footer-note">Need help? Contact partner support.</div>
      </div>
    </div>
  )
}

export default PartnerLogin
