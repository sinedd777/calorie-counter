import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { Button, FormControl, TextField, Stack, Typography } from '@mui/material';


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
			<Stack
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={2}
				mt={20}
			>
			<Typography variant='h3'>Login</Typography>
				<FormControl >
				<TextField
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
					placeholder="username"
				/>
				<br />
				<TextField
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<Button type="submit" variant="contained" onClick={loginUser} value="Login" disabled={!(username && password)}> Login </Button>
				</FormControl>
			</Stack>

		</div>
	)
}

export default Login;