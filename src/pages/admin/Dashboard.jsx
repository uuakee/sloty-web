import { useState } from 'react';
import { 
  Menu,
  Search, 
  LogOut,
  Settings,
  Users,
  CreditCard,
  FileText,
  Gift,
  LayoutDashboard,
  Globe,
  ChevronRight,
  Paintbrush,
  PaintRoller
} from 'lucide-react';
import logo from '../../assets/default_logo.svg';

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('diario');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Função para formatar valores em BRL
  const formatBRL = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="flex min-h-full bg-background-600">
      {/* Sidebar */}
      <aside className={`fixed lg:static lg:translate-x-0 z-20 transition-all duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="h-full w-64 bg-background-700/60 backdrop-blur-xl border-r border-white/10 p-4">
          <div className="flex items-center justify-between mb-8">
            <img src={logo} alt="Logo" className="h-8" />
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <ChevronRight />
            </button>
          </div>

          <nav className="space-y-2">
            <SidebarItem icon={<LayoutDashboard />} text="Painel" active />
            <SidebarItem icon={<Users />} text="Jogadores" />
            <SidebarItem icon={<PaintRoller />} text="Tema" />
            <SidebarItem icon={<CreditCard />} text="Transações" />
            <SidebarItem icon={<Settings />} text="Configurações" />
            <SidebarItem icon={<FileText />} text="Relatórios" />
            <SidebarItem icon={<Gift />} text="Bônus" />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8  backdrop-blur-xl p-4 ">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <Menu />
            </button>
            <h1 className="text-2xl font-bold text-white">Administrativo</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar"
                className="pl-10 pr-4 py-2 bg-background-800/60 backdrop-blur-xl text-white rounded-lg border border-white/10 focus:outline-none focus:border-[#FF3C3A]"
              />
            </div>

            <div className="flex space-x-2">
              <TimeFilterButton active={timeFilter === 'diario'} onClick={() => setTimeFilter('diario')}>
                Diário
              </TimeFilterButton>
              <TimeFilterButton active={timeFilter === 'semanal'} onClick={() => setTimeFilter('semanal')}>
                Semanal
              </TimeFilterButton>
              <TimeFilterButton active={timeFilter === 'mensal'} onClick={() => setTimeFilter('mensal')}>
                Mensal
              </TimeFilterButton>
            </div>

            <button className="px-4 py-2 bg-[#FF3C3A] text-white rounded-lg hover:bg-[#FF3C3A]/80 transition-colors">
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total de Jogadores" value="1.234" percentage="+12,5%" />
          <StatCard title="Jogadores Ativos" value="856" percentage="+5,2%" />
          <StatCard title="Total de Depósitos" value={formatBRL(45678)} percentage="+8,3%" />
          <StatCard title="Total de Saques" value={formatBRL(23456)} percentage="-3,7%" negative />
        </div>

        {/* Financial Activity */}
        <div className="bg-background-700/60 backdrop-blur-xl p-6 rounded-xl border border-white/10 mb-8">
          <h3 className="text-white text-xl font-bold mb-6">Atividade Financeira</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FinancialTable title="Total de Depósitos" />
            <FinancialTable title="Total de Saques" />
            <FinancialTable title="Relatório de Saldo" />
          </div>
        </div>

        {/* Gaming Activity */}
        <div className="bg-background-700/60 backdrop-blur-xl p-6 rounded-xl border border-white/10">
          <h3 className="text-white text-xl font-bold mb-6">Atividade de Jogos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GamingStats title="Total Apostado" />
            <GamingStats title="Total Ganho" />
            <GamingStats title="Total Perdido" />
            <GamingStats title="GGR" />
          </div>
        </div>
      </main>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function SidebarItem({ icon, text, active }) {
  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
      active ? 'bg-[#FF3C3A] text-white' : 'text-white/60 hover:bg-background-800/60 hover:text-white'
    }`}>
      {icon}
      <span>{text}</span>
    </div>
  );
}

function TimeFilterButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${
        active ? 'bg-background-800/60 text-white' : 'text-white/60 hover:bg-background-800/40 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function StatCard({ title, value, percentage, negative }) {
  return (
    <div className="bg-background-700/60 backdrop-blur-xl p-6 rounded-xl border border-white/10">
      <h4 className="text-white/60 mb-2">{title}</h4>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className={`text-sm ${negative ? 'text-red-500' : 'text-green-500'}`}>
          {percentage}
        </span>
      </div>
    </div>
  );
}

function FinancialTable({ title }) {
  return (
    <div className="bg-background-800/40 p-4 rounded-lg border border-white/5">
      <h4 className="text-white/60 mb-4">{title}</h4>
      <table className="w-full">
        <tbody className="text-white/80">
          <tr>
            <td className="py-2">Real</td>
            <td className="py-2 text-right">0</td>
            <td className="py-2 text-right text-gray-400">BRL 0.00</td>
          </tr>
          <tr>
            <td className="py-2">Cripto</td>
            <td className="py-2 text-right">0</td>
            <td className="py-2 text-right text-gray-400">BRL 0.00</td>
          </tr>
          <tr>
            <td className="py-2">USDT</td>
            <td className="py-2 text-right">0</td>
            <td className="py-2 text-right text-gray-400">BRL 0.00</td>
          </tr>
          <tr className="border-t border-white/10">
            <td className="py-2">Total</td>
            <td colSpan={2} className="py-2 text-right">R$ 0,00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function GamingStats({ title }) {
  return (
    <div className="bg-background-800/40 p-4 rounded-lg border border-white/5">
      <h4 className="text-white/60 mb-4">{title}</h4>
      <table className="w-full">
        <tbody className="text-white/80">
          <tr>
            <td className="py-2">FiversCan</td>
            <td className="py-2 text-right">0</td>
            <td className="py-2 text-right text-gray-400">BRL 0.00</td>
          </tr>
          <tr>
            <td className="py-2">API 12 Jogos</td>
            <td className="py-2 text-right">0</td>
            <td className="py-2 text-right text-gray-400">BRL 0.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
