import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../utils/api';
import logo from '../../assets/default_logo.svg';

export default function AdminLogin() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/v1/login', {
        phone,
        password,
      });

      console.log('Resposta do login:', response.data);
      const userRole = response.data.user?.role;
      console.log('Role do usuário:', userRole);

      if (userRole !== 'ADMIN') {
        toast.error('Acesso negado. Área restrita para administradores.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setPassword('');
        return;
      }

      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      
      toast.success('Login realizado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/admin/dashboard');
      
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Telefone ou senha inválidos', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-600">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="max-w-md w-full space-y-8 p-8 bg-background-700 rounded-lg">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Sloty Logo" className="h-8 w-auto" />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Área Administrativa
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="text-white">
                Telefone
              </label>
              <input
                id="phone"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-[#FF3C3A] focus:border-[#FF3C3A]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="text-white">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-[#FF3C3A] focus:border-[#FF3C3A]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF3C3A] hover:bg-[#FF3C3A]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3C3A]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
