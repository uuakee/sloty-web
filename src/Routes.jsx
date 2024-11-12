import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    );
}
