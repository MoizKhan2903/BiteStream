import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const PartnerRegister = () => {
  
  const navigate = useNavigate();

  const handleSubmit =  (e) => { e.preventDefault(); 
  const businessName = e.target.businessName.value;
  const contactName = e.target.contactName.value; 
  const phone = e.target.phone.value;   
  const email = e.target.email.value;
  const password = e.target.password.value;
  const address = e.target.address.value; 

 axios.post('http://localhost:3000/api/auth/food-partner/register', {
    name: businessName,
    contactName,
    phone,
    email,
    password,
    address
  },{
    withCredentials: true // token cookies main dikhne lgege isse
  }).then(response => {
    console.log(response.data);
    navigate("/food-partner/login")
  }).catch(error => { 
    console.error("There was an error!", error);
  })
  }


  return (
    <div className="auth-screen">
      <div className="auth-card">
        
        <div className="auth-header">
          <div className="brand-mark" />
          <div>
            <div className="auth-title">Partner sign up</div>
            <div className="auth-sub">Register your restaurant or kitchen</div>
          </div>
        </div>

  <form className="form" onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="biz-name">Business name</label>
            <input id="biz-name" name="businessName" placeholder="Restaurant or brand name" />
          </div>

          <div className="input">
            <label htmlFor="contact-name">Contact name</label>
            <input id="contact-name" name="contactName" placeholder="Contact person name" />
          </div>

          <div className="row">
            <div className="input">
              <label htmlFor="contact-phone">Phone</label>
              <input id="contact-phone" name="phone" placeholder="Phone number" />
            </div>

            <div className="input">
              <label htmlFor="contact-email">Contact email</label>
              <input id="contact-email" name="email" type="email" placeholder="contact@yourbiz.com" />
            </div>
          </div>

          <div className="input">
            <label htmlFor="partner-password">Password</label>
            <input id="partner-password" name="password" type="password" placeholder="Create a password" />
          </div>

          <div className="input">
            <label htmlFor="partner-address">Address</label>
            <textarea id="partner-address" name="address" placeholder="Street, building, area, city" rows="3" className="input-textarea" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Register</button>
            <Link to="/food-partner/login" className="btn ghost" role="button">Sign in</Link>
          </div>
        </form>

        <div className="footer-note">We’ll review your application and reach out via email.</div>
      </div>
    </div>
  )
}

export default PartnerRegister
