import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DefaultUser from './pages/DefaultUser'
import AdminPage from './pages/AdminPage'


const App = () => {
	return (
    <Routes>
        <Route path="/login" element={< Login />} />
        <Route path="/register"  element={< Register />} />
        <Route path="/dashboard/*"  element={< DefaultUser />} />
        <Route path="/admin"  element={< AdminPage />} />
    </Routes>
	)
}

export default App