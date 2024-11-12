import { Check, CheckCheck, Home, User, Users, Wallet2 } from "lucide-react";

export default function Nav() {
    return (
            <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-background-600 border-t border-background-400">
                <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    <button type="button" class="inline-flex flex-col items-center justify-center px-5 group">
                        <Home className="w-5 text-[#FF3C3A]" />
                        <span class="text-xs text-[#FF3C3A]">Home</span>
                    </button>

                    <button type="button" class="inline-flex flex-col items-center justify-center px-5 group">
                        <Users className="w-5 text-white" />
                        <span class="text-xs text-white">Afiliados</span>
                    </button>

                    <button type="button" class="inline-flex flex-col items-center justify-center px-5 group">
                        <Wallet2 className="w-5 text-white" />
                        <span class="text-xs text-white">Depósito</span>
                    </button>


                    <button type="button" class="inline-flex flex-col items-center justify-center px-5 group">
                        <User className="w-5 text-white" />
                        <span class="text-xs text-white">Perfil</span>
                    </button>

                </div>
            </div>
    )
} 