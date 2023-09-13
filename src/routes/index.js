import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/Signup';
import Profile from '../pages/profile';
import New from '../pages/New';
import Dashboard from '../pages/dashboard';

import Private from './private';

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
            {/* Rotas privadas */}
            <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
            <Route path="/profile" element={<Private><Profile /></Private>} />
            <Route path="/New" element={<Private>< New /></Private>} />
            <Route path="/New:id" element={<Private>< New /></Private>} />
        </Routes>
    )

} 