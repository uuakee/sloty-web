import { Lock, Phone, X } from "lucide-react";
import { useState } from "react";
import api from '../utils/api';
import logoDefault from '../assets/default_logo.svg';
import '../App.css';

export default function LoginModal({ onClose }) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/v1/login', { phone, password });

            // Armazena o token e userId no localStorage
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userId', response.data.user?.id || '');

            // Fecha o modal após o login
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao fazer login');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-2">
            <div className="bg-background-500 rounded-lg p-6 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
                    <X size={24} />
                </button>
                <div className="flex flex-col items-center">
                    <img src={logoDefault} alt="Logo" width={90} className="mx-auto mb-4" />
                </div>
                <form onSubmit={handleLogin} className="flex flex-col gap-2">
                    <div className="relative">
                        <label className="sr-only">Telefone</label>
                        <input
                            type="text"
                            placeholder="Digite o número cadastrado"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-md border-gray-300 bg-background-800 p-3 shadow-sm sm:text-sm text-white"
                        />
                        <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">
                            <Phone className="w-4 h-4" />
                        </span>
                    </div>

                    <div className="relative">
                        <label className="sr-only">Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha segura"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border-gray-300 bg-background-800 p-3 shadow-sm sm:text-sm text-white"
                        />
                        <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">
                            <Lock className="w-4 h-4" />
                        </span>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-[#FF3C3A] p-2 rounded-lg text-white font-medium mt-4"
                    >
                        Acesse sua conta!
                    </button>

                    <div className="mt-4 flex justify-between">
                            <a className="text-[#FF3C3A]" href="#">
                                Fale com suporte
                            </a>
                            <a className="text-[#FF3C3A]">
                                Cadastre-se
                            </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
