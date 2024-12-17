import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  Cloud, 
  Building2, 
  FileText, 
  Phone, 
  Map, 
  Bell,
  LogIn,
  LogOut,
  FileSpreadsheet,
  User,
  Home as HomeIcon,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout, user } = useAuthStore((state) => ({
    logout: state.logout,
    user: state.user
  }));

  const menuItems = [
    { id: 'home', icon: HomeIcon, label: 'Início', path: '/' },
    { id: 'traffic', icon: Car, label: 'Boletim de Trânsito', path: '/traffic' },
    { id: 'weather', icon: Cloud, label: 'Meteorologia', path: '/weather' },
    { id: 'units', icon: Building2, label: 'Unidades', path: '/units' },
    { id: 'occurrences', icon: FileText, label: 'Ocorrências', path: '/occurrences' },
    { id: 'emergency', icon: Phone, label: 'Contatos de Emergência', path: '/emergency' },
    { id: 'vulnerability', icon: Map, label: 'Mapa de Vulnerabilidade', path: '/vulnerability' },
    { id: 'monitoring', icon: Bell, label: 'Alarme de Monitoramento', path: '/monitoring' },
    { id: 'reports', icon: FileSpreadsheet, label: 'Relatórios', path: '/reports' },
  ];

  const handleNavigation = (id: string, path: string) => {
    setActiveTab(id);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-lg text-white"
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-gray-800 text-white p-4
        transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex items-center gap-2 mb-8">
          <LogIn className="h-8 w-8 text-green-500" />
          <h1 className="text-2xl font-bold text-green-500">BBraun</h1>
        </div>
        
        {/* User Profile Section */}
        <div className="mb-6 p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-white">{user?.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 mt-2 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Sair</span>
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.id, item.path)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${activeTab === item.id 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-green-500'}
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;