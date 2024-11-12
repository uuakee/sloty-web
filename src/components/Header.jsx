import logoDefault from '../assets/default_logo.svg'

export default function Header() {
    return (
        <div className='p-2 px-2 flex justify-between items-center'>
            <div>
                <img src={logoDefault} alt="Logotype" width={80} />
            </div>
            <div className='flex items-center gap-4'>
                <a className='text-white text-sm'>
                    Acessar
                </a>
                <div className="relative">
                    <span className="absolute bottom-[-20%] left-[30%]  bg-white transform -translate-x-5 px-2 text-[10px] rounded-full shadow-sm shadow-white font-semibold w-fit text-black">
                        30% de bônus
                    </span>
                    <button className='bg-[#00C8FF] p-2 rounded-xl rounded-tr-none'>
                        <a href="/register" className='text-sm font-medium text-white'>
                            Faça seu registro!
                        </a>
                    </button>
                </div>
            </div>
        </div>
    )
}
