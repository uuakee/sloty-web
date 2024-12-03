import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import currencyIcon from '/brazil-flag.png';
import vipIcon from '/001.png';
import '../index.css';
import { ChevronRight, Coins, Copy, RefreshCcw, Settings, Stars, Users } from 'lucide-react';

export default function Profile() {
    const [balance, setBalance] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    // Função para recarregar o saldo
    const reloadBalance = () => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const fetchBalance = async () => {
                try {
                    const response = await api.get(`/v1/getUserInfo`, {
                        params: { userId },
                    });

                    // Atualiza o saldo a partir da resposta
                    const fetchedBalance = Number(response.data.user.balance);

                    if (!isNaN(fetchedBalance)) {
                        setBalance(fetchedBalance);
                    } else {
                        console.error('Saldo retornado não é um número:', response.data.user.balance);
                    }
                } catch (error) {
                    console.error('Erro ao buscar o saldo do usuário:', error);
                }
            };

            fetchBalance();
        }
    };

    // Função para buscar informações do usuário
    const fetchUserInfo = async () => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            try {
                const response = await api.get(`/v1/getUserInfo`, {
                    params: { userId },
                });

                // Atualiza as informações do usuário
                setUserInfo(response.data.user);
                setBalance(Number(response.data.user.balance)); // Atualiza o saldo
            } catch (error) {
                console.error('Erro ao buscar as informações do usuário:', error);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            fetchUserInfo(); // Busca as informações do usuário

            const intervalId = setInterval(() => {
                fetchUserInfo(); // Atualiza informações do usuário periodicamente
            }, 40000);

            return () => clearInterval(intervalId);
        }
    }, []);

    return (
        <div>
            <Nav />
            {/* Profile card */}
            <div>
                <div className='flex justify-between gap-2 items-center bg-background-600 px-2 py-6'>
                    {/* Avatar, name and id */}
                    <div className='flex items-center gap-2'>
                        <img
                            src={userInfo?.avatar || "https://i.seadn.io/gae/XXkvCQ25zzBsWwpje9OwYeNa87755vELicqPRUuBtkp9A35YT-r914m2bwUO3pgcbqeR6A2HWtbdHtHhSX6s_p7N_r6SzcYLa_oV?auto=format&dpr=1&w=640"} // Usa avatar ou um placeholder
                            className="w-10 h-10 rounded-md"
                            alt="Avatar"
                        />
                        <div className='flex flex-col'>
                            <p className='text-white text-xs'>Nome: {userInfo?.fullname || '...'}</p>
                            <div className='flex gap-2 items-center'>
                            <p className='text-white text-xs'>ID: {userInfo?.id || '...'}</p>
                            <Copy className="text-white w-3 h-3 cursor-pointer" onClick={() => navigator.clipboard.writeText(userInfo?.id)} />
                            </div>
                        </div>
                    </div>
                    {/* Balance */}
                    <div className='flex items-center bg-background-700 p-2 rounded-xl gap-2'>
                        <img src={currencyIcon} alt="Currency Icon" className="w-4 h-4" />
                        <span className="text-white text-sm font-regular">
                            R$ {balance !== null && !isNaN(balance) ? balance.toFixed(2) : '...'}
                        </span>
                        <RefreshCcw className="text-white w-4 h-4 cursor-pointer" onClick={reloadBalance} />
                    </div>
                </div>
                <div className='bg-background-600 px-2 pb-4 flex justify-between'>
                    <div className='flex items-center gap-2'>
                        <button className='flex items-center gap-2 bg-[#FF3C3A] p-1 text-sm rounded-md text-white shadow-sm shadow-[#FF3C3A]'>
                            Depositar
                        </button>
                        <button className='flex items-center gap-2 border border-background-300 p-1 text-sm rounded-md text-white'>
                            Sacar
                        </button>
                    </div>
                    <div className='flex items-center gap-2'>
                        <img src={vipIcon} alt="" className='w-12'/>
                        <div className='flex flex-col'>
                            <p className='text-[white] text-xs'>Nível: {userInfo?.level || 'VIP Tier 1'}</p>
                            <p className='text-white text-xs'>Pontos: {userInfo?.points || '...'}</p>
                        </div>
                    </div>
                </div>

                <div className='mt-4 px-2 flex flex-col gap-2'>
                    {/* Transactions */}
                    <div className='bg-background-600 rounded-md'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2 p-3'>
                                <Coins className="text-[#FF3C3A] w-4 h-4" />
                                <span className="text-white text-sm font-medium">Hístorico de transações</span>
                            </div>
                            <ChevronRight className="text-background-400 w-4 h-4 mr-2" />
                        </div>
                    </div>

                    {/* Agents */}
                    <div className='bg-background-600 rounded-md'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2 p-3'>
                                <Users className="text-[#FF3C3A] w-4 h-4" />
                                <span className="text-white text-sm font-medium">Agente</span>
                            </div>
                            <ChevronRight className="text-background-400 w-4 h-4 mr-2" />
                        </div>
                    </div>

                    {/* VIP */}
                    <div className='bg-background-600 rounded-md'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2 p-3'>
                                <Stars className="text-[#FF3C3A] w-4 h-4" />
                                <span className="text-white text-sm font-medium">VIP</span>
                            </div>
                            <ChevronRight className="text-background-400 w-4 h-4 mr-2" />
                        </div>
                    </div>

                    {/* Settings */}
                    <div className='bg-background-600 rounded-md'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-2 p-3'>
                                <Settings className="text-[#FF3C3A] w-4 h-4" />
                                <span className="text-white text-sm font-medium">Configurações e privacidade</span>
                            </div>
                            <ChevronRight className="text-background-400 w-4 h-4 mr-2" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
