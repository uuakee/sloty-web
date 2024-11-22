import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { RefreshCcw, Wallet } from 'lucide-react';
import currencyIcon from '/brazil-flag.png';

export default function LoggedHeader({ onLogout }) {
    const [balance, setBalance] = useState(null);
    const reloadBalance = () => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const fetchBalance = async () => {
                try {
                    const response = await api.get(`/v1/getBalance`, {
                        params: { userId },
                    });

                    // Garante que o saldo seja convertido para número
                    const fetchedBalance = Number(response.data.balance);

                    // Verifica se o saldo é válido
                    if (!isNaN(fetchedBalance)) {
                        setBalance(fetchedBalance);
                    } else {
                        console.error('Saldo retornado não é um número:', response.data.balance);
                    }
                } catch (error) {
                    console.error('Erro ao buscar o saldo do usuário:', error);
                }
            };

            // Faz a requisição inicial
            fetchBalance();
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const fetchBalance = async () => {
                try {
                    const response = await api.get(`/v1/getBalance`, {
                        params: { userId },
                    });

                    // Garante que o saldo seja convertido para número
                    const fetchedBalance = Number(response.data.balance);

                    // Verifica se o saldo é válido
                    if (!isNaN(fetchedBalance)) {
                        setBalance(fetchedBalance);
                    } else {
                        console.error('Saldo retornado não é um número:', response.data.balance);
                    }
                } catch (error) {
                    console.error('Erro ao buscar o saldo do usuário:', error);
                }
            };

            // Faz a requisição inicial
            fetchBalance();

            // Configura o intervalo para atualizar o saldo a cada 40 segundos
            const intervalId = setInterval(fetchBalance, 40000);

            // Limpa o intervalo ao desmontar o componente
            return () => clearInterval(intervalId);
        }
    }, []);

    return (
        <div className="flex items-center gap-4">
            <div className='flex items-center bg-background-600 p-2 rounded-xl gap-2'>
            <img src={currencyIcon} alt="Currency Icon" className="w-4 h-4"/>
            <span className="text-white text-sm font-regular">
                R$ {balance !== null && !isNaN(balance) ? balance.toFixed(2) : '...'}
            </span>
            <RefreshCcw className="text-white w-4 h-4" onClick={reloadBalance}/>
            </div>
            <button
                onClick={onLogout}
                className="text-sm font-medium text-white bg-red-500 p-2 rounded-xl w-16"
            >
                Sair
            </button>
        </div>
    );
}
