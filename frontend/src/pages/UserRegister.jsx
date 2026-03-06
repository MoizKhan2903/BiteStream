import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const UserRegister = () => {

	const navigate = useNavigate();

	const handleSubmit = async (e) => { e.preventDefault(); /* TODO */ 
  
	const firstName = e.target.firstName.value;
	const lastName = e.target.lastName.value; 
	const email = e.target.email.value;   
	const password = e.target.password.value;

const response = await  axios.post('http://localhost:3000/api/auth/user/register', {
		fullName: firstName + " " + lastName,
		email,
		password
	}, {
		// token cookies main dikhne lgege isse 
		withCredentials: true
	})
	console.log(response.data);

}
	return (
		<div className="auth-screen">
			<div className="auth-card">
				<div style={{display:'flex', justifyContent:'center'}}>
					<div className="segmented">
						<Link to="/user/register" className={`seg-item`}>User</Link>
						<Link to="/food-partner/register" className={`seg-item`}>Food partner</Link>
					</div>
				</div>
				<div className="auth-header">
					<div className="brand-mark" />
					<div>
						<div className="auth-title">Create your account</div>
						<div className="auth-sub">Sign up as a user to discover and order food</div>
					</div>
				</div>

				<form className="form" onSubmit={handleSubmit}>
					<div className="row">
						<div className="input">
							<label htmlFor="user-firstname">First name</label>
							<input id="firstName" name="firstName" placeholder="First name" />
						</div>

						<div className="input">
							<label htmlFor="user-lastname">Last name</label>
							<input id="lastName" name="lastName" placeholder="Last name" />
						</div>
					</div>
					<div className="input">
						<label htmlFor="user-email">Email</label>
						<input id="email" name="email" type="email" placeholder="you@example.com" />
					</div>

					<div className="input">
						<label htmlFor="user-password">Password</label>
						<input id="password" name="password" type="password" placeholder="Create a password" />
					</div>

					<div className="actions">
						<button className="btn" type="submit">Create account</button>
						<Link to="/user/login" className="btn ghost" role="button">Sign in</Link>
					</div>
				</form>

				<div className="footer-note">By continuing, you agree to our terms and privacy policy.</div>
			</div>
		</div>
	)
}

export default UserRegister

