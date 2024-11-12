import { useState } from 'react';
import { ChevronLeft, IdCard, Lock, Phone } from 'lucide-react';
import logoDefault from '../assets/default_logo.svg';
import api from '../utils/api';  // Importe o arquivo de API para fazer a requisição
import { useNavigate } from 'react-router-dom';  // Importe o useNavigate

export default function Register() {
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');  // Novo estado para sucesso

    const navigate = useNavigate();  // Crie uma instância do navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação simples
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
            // Se o registro for bem-sucedido, mostra a mensagem de sucesso e redireciona
            setSuccess('Registro realizado com sucesso! Você será redirecionado.');
            setError('');
            setTimeout(() => {
                navigate('/');  // Redireciona para a home (página inicial)
            }, 2000); // Espera 2 segundos antes de redirecionar
        } catch (err) {
            setError(err.response?.data?.message || "Verifique com o time de suporte o motivo de não ser realizado o registro!");
            setSuccess('');
        }
    };

    return (
        <div>
            {/* Header (Icon with Register) */}
            <div className="flex items-center p-4">
                <button>
                    <ChevronLeft className="text-[#00C8FF]" />
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

                {/* Inputs */}
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

                    {/* Terms and Conditions */}
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

                    {/* Error and Success messages */}
                    {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                    {success && <div className="text-green-500 text-center mt-2">{success}</div>}

                    {/* Register Button */}
                    <div className="p-4">
                        <button
                            type="submit"
                            className="w-full bg-[#00C8FF] p-2 rounded-xl rounded-tr-none"
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
