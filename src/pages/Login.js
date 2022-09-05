import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
    const navigate = useNavigate();


	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			if(data.role === 'user'){
				alert('Login successful')
				navigate('/dashboard');
			}else if( data.role === 'admin'){
				alert('Welcome Admin')
				navigate('/admin');
			}
			
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="username"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default Login;