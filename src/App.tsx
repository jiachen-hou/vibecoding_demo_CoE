import { useState } from 'react';
import { 
  LayoutDashboard, 
  Network, 
  GitMerge, 
  Activity, 
  ShieldCheck,
  Bell,
  Search,
  UserCircle,
  Menu,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './components/Dashboard';
import Architecture from './components/Architecture';
import Lifecycle from './components/Lifecycle';
import Operations from './components/Operations';
import Security from './components/Security';
import RunApplication from './components/RunApplication';
import { LoginModal, LogoutModal } from './components/AuthModals';

const TABS = [
  { id: 'dashboard', label: '大盘概览', icon: LayoutDashboard, component: Dashboard },
  { id: 'run-app', label: '运行应用', icon: Play, component: RunApplication },
  { id: 'architecture', label: '架构与资源', icon: Network, component: Architecture },
  { id: 'lifecycle', label: '开发与生命周期', icon: GitMerge, component: Lifecycle },
  { id: 'operations', label: '运行与调度', icon: Activity, component: Operations },
  { id: 'security', label: '安全与治理', icon: ShieldCheck, component: Security },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component || Dashboard;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 256 }}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="bg-[#0f172a] text-slate-300 flex flex-col z-20 shadow-xl"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && <span className="font-bold text-white text-lg tracking-wide">RPA CoE Portal</span>}
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded text-slate-400">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600/20 text-blue-400 font-medium' 
                    : 'hover:bg-slate-800/50 hover:text-slate-100'
                }`}
                title={!isSidebarOpen ? tab.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                {isSidebarOpen && <span className="whitespace-nowrap">{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        <div 
          className="p-4 border-t border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors"
          onClick={() => isLoggedIn ? setShowLogoutModal(true) : setShowLoginModal(true)}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isLoggedIn ? 'bg-blue-600' : 'bg-slate-800'}`}>
              <UserCircle className={`w-6 h-6 ${isLoggedIn ? 'text-white' : 'text-slate-400'}`} />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                {isLoggedIn ? (
                  <>
                    <p className="text-sm font-medium text-white truncate">Admin User</p>
                    <p className="text-xs text-slate-400 truncate">CoE Manager</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-white truncate">未登录</p>
                    <p className="text-xs text-slate-400 truncate">点击登录</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <h1 className="text-xl font-semibold text-slate-800">
            {TABS.find(t => t.id === activeTab)?.label}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="搜索机器人、流程或节点..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all w-64"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={() => {
          setIsLoggedIn(true);
          setShowLoginModal(false);
        }} 
      />
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onLogout={() => {
          setIsLoggedIn(false);
          setShowLogoutModal(false);
        }} 
      />
    </div>
  );
}
