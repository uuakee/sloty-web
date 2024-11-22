import { useEffect, useState } from 'react';
import LoginModal from '../../pages/Login';
import logoDefault from '../../assets/default_logo.svg';
import LoggedHeader from './LoggedHeader';

export default function Header() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem('authToken'))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoggedIn(Boolean(localStorage.getItem('authToken')));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <div className="p-2 px-2 flex justify-between items-center">
            <div>
                <img src={logoDefault} alt="Logotype" width={80} />
            </div>
            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <LoggedHeader onLogout={handleLogout} />
                ) : (
                    <>
                        <button
                            onClick={openLoginModal}
                        >
                            <a className="text-sm font-medium text-white">
                                Entrar
                            </a>
                        </button>
                        <div className="relative">
                            <span className="absolute bottom-[-20%] left-[30%] bg-white transform -translate-x-5 px-2 text-[10px] rounded-full shadow-sm shadow-white font-semibold w-fit text-black">
                                30% de bônus
                            </span>
                            <button className="bg-[#FF3C3A] p-2 rounded-xl rounded-tr-none">
                                <a href="/register" className="text-sm font-medium text-white">
                                    Faça seu registro!
                                </a>
                            </button>
                        </div>
                        {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
                    </>
                )}
            </div>
        </div>
    );
}
