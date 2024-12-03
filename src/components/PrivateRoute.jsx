import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('authToken'); // Verifica se o token existe

    // Se o token não existe, redireciona para a home
    if (!token) {
        return <Navigate to="/" />;
    }

    // Caso contrário, permite o acesso à rota
    return children;
}
