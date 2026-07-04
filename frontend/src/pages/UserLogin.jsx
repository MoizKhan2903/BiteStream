import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
	const navigate = useNavigate();
	const handleSubmit = async (e) => { e.preventDefault(); 
const email = e.target.email.value;
const password = e.target.password.value;

const response = await axios.post('http://localhost:3000/api/auth/user/login', {
	email,
	password
	 },{
		withCredentials: true
	 })
	 console.log(response.data);
	 navigate("/home")
	 }
	return (
		<div className="auth-screen">
			<div className="auth-card">
        
				<div className="auth-header">
					<div className="brand-mark" />
					<div>
						<div className="auth-title">Welcome back</div>
						<div className="auth-sub">Sign in to continue to your account</div>
					</div>
				</div>

	<form className="form" onSubmit={handleSubmit}>
					<div className="input">
						<label htmlFor="login-email">Email</label>
						<input id="user-email" name="email" type="email" placeholder="you@example.com" />
					</div>

					<div className="input">
						<label htmlFor="login-password">Password</label>
						<input id="user-password" name="password" type="password" placeholder="Your password" />
					</div>

					<div className="actions">
						<button className="btn" type="submit">Sign in</button>
						<Link to="/user/register" className="btn ghost" role="button">Create account</Link>
					</div>
				</form>
				<div className="footer-note">Trouble signing in? Reset your password or contact support.</div>
			</div>
		</div>
	)
}

export default UserLogin

