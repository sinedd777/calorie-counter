import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import React from 'react'
import { Button, FormControl, TextField, Stack, Typography, Box } from '@mui/material';


const Register = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/users/register', {
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

		if (data.status === 'ok') {
			navigate('/login')
		}else if(data.status === 'error'){
			alert('User already exists')
		}
	}

	const handleUsername = (e) => {
		setUsername((e.trim()).replace(/[^a-zA-Z0-9 ]/g, ""))
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
				<Box sx={{
					m: 8,
					p: 8,
					boxShadow: 4, "&:hover": {
						boxShadow: 8,
					  },
					  
					
				}}>
				<Typography variant='h3' align="center" mb={2} >Register</Typography>
				<FormControl >
					<TextField
						value={username}
						onChange={(e) => handleUsername(e.target.value)}
						type="text"
						placeholder="Username"
					/>
					<br />
					<TextField
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<br />
					<Button type="submit" variant="contained" onClick={registerUser} value="Register" disabled={!(username && password)}> Register </Button>
				</FormControl>
				</Box>
			</Stack>
		</div>
	)
}

export default Register;
