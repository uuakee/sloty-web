import { useState } from 'react';
import { ChevronLeft, IdCard, Lock, Phone } from 'lucide-react';
import logoDefault from '../assets/default_logo.svg';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setError("As senhas não coincidem!");
            setSuccess('');
            return;
        }
    
        try {
            const response = await api.post('/v1/register', {
                fullname,
                phone,
                password,
            });
    
            // Captura o token e o id da resposta
            const { token, id } = response.data;
            
            // Armazena o token e o id no localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', id);  // Armazena o id do usuário
    
            // Exibe mensagem de sucesso e redireciona
            setSuccess('Registro realizado com sucesso! Você será redirecionado.');
            setError('');
            setTimeout(() => {
                navigate('/');  // Redireciona para a página inicial
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Verifique com o time de suporte o motivo de não ser realizado o registro!");
            setSuccess('');
        }
    };
    

    return (
        <div>
            {/* Header */}
            <div className="flex items-center p-4">
                <button onClick={() => navigate(-1)}> 
                    <ChevronLeft className="text-[#FF3C3A]" />
                </button>
                <h1 className="flex-1 text-center text-lg font-semibold text-white">
                    Registre-se
                </h1>
            </div>
            <div className='mt-8'>
                <div className='flex flex-col items-center gap-2'>
                    <img src={logoDefault} alt='Logo' width={90} />
                    <p className="text-white text-center font-light">
                        Comece hoje mesmo e obtenha<br /> até 30% de bônus!
                    </p>
                </div>

                {/* Formulário de Registro */}
                <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
                    <div className="relative">
                        <label className="sr-only">Nome completo</label>
                        <input
                            type="text"
                            placeholder="Nome completo sem abreviações"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full rounded-md border-gray-200 pe-10 p-3 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-[#141414] dark:text-white"
                        />
                        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500 dark:text-gray-400">
                            <IdCard className="w-4 h-4" />
                        </span>
                    </div>

                    <div className="relative">
                        <label className="sr-only">Telefone</label>
                        <input
                            type="text"
                            placeholder="Digite seu melhor número"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-md border-gray-200 pe-10 p-3 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-[#141414] dark:text-white"
                        />
                        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500 dark:text-gray-400">
                            <Phone className="w-4 h-4" />
                        </span>
                    </div>

                    <div className="relative">
                        <label className="sr-only">Senha</label>
                        <input
                            type="password"
                            placeholder="Digite uma senha segura"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border-gray-200 pe-10 p-3 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-[#141414] dark:text-white"
                        />
                        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500 dark:text-gray-400">
                            <Lock className="w-4 h-4" />
                        </span>
                    </div>

                    <div className="relative">
                        <label className="sr-only">Confirmar Senha</label>
                        <input
                            type="password"
                            placeholder="Digite novamente a senha segura"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-md border-gray-200 pe-10 p-3 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-[#141414] dark:text-white"
                        />
                        <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500 dark:text-gray-400">
                            <Lock className="w-4 h-4" />
                        </span>
                    </div>

                    {/* Checkbox para termos e condições */}
                    <div className="flex items-center px-4">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                            className="mr-2"
                        />
                        <label htmlFor="terms" className="text-sm text-white">
                            Eu aceito os <a href="#" className="text-[#00C8FF] underline">termos e condições</a>
                        </label>
                    </div>

                    {/* Exibição de mensagens de erro e sucesso */}
                    {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                    {success && <div className="text-green-500 text-center mt-2">{success}</div>}

                    {/* Botão de Registro */}
                    <div className="p-4">
                        <button
                            type="submit"
                            className="w-full bg-[#FF3C3A] p-2 rounded-xl rounded-tr-none"
                            disabled={!termsAccepted}
                        >
                            <span className="text-sm font-medium text-white">
                                Faça seu registro!
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
