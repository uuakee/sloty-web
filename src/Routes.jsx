import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';
import Login from './pages/Login';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    );
}
