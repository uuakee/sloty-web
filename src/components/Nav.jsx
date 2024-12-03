import { Rocket, User, Users, Wallet2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import '../App.css';

export default function Nav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-black/40 backdrop-blur-lg rounded-full px-6 py-3">
                <div className="flex items-center gap-8">
                    <button 
                        onClick={() => navigate('/')}
                        type="button" 
                        className="flex flex-col items-center group"
                    >
                        <div className={`p-3 rounded-full ${isActive('/') ? 'bg-[#FF3C3A]' : 'bg-transparent'}`}>
                            <Rocket className={`w-6 h-6 ${isActive('/') ? 'text-white' : 'text-white/60 group-hover:text-white'} transition-colors`} />
                        </div>
                    </button>

                    <button type="button" className="flex flex-col items-center group">
                        <div className="p-2 rounded-full bg-transparent">
                            <Users className="w-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                    </button>

                    <button type="button" className="flex flex-col items-center group">
                        <div className="p-2 rounded-full bg-transparent">
                            <Wallet2 className="w-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                    </button>

                    <button 
                        onClick={() => navigate('/profile')}
                        type="button" 
                        className="flex flex-col items-center group"
                    >
                        <div className={`p-3 rounded-full ${isActive('/profile') ? 'bg-[#FF3C3A]' : 'bg-transparent'}`}>
                            <User className={`w-6 h-6 ${isActive('/profile') ? 'text-white' : 'text-white/60 group-hover:text-white'} transition-colors`} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
} 