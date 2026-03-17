import { X } from 'lucide-react';
import React, { useState } from 'react';

export function LoginModal({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (username: string) => void }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoginMode && password !== confirmPassword) {
      alert("两次输入的密码不一致！");
      return;
    }
    // TODO: 接入真实数据库验证/注册逻辑
    onLogin(username || 'Admin User');
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">{isLoginMode ? '系统登录' : '注册账号'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">用户名</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={isLoginMode ? "请输入用户名" : "请输入新用户名"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">密码</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={isLoginMode ? "请输入密码" : "请设置密码"}
            />
          </div>
          {!isLoginMode && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">确认密码</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请再次输入密码"
              />
            </div>
          )}
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isLoginMode ? '登录' : '注册并登录'}
            </button>
          </div>
          <div className="text-center mt-4">
            <button 
              type="button" 
              onClick={toggleMode}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              {isLoginMode ? '没有账号？点击注册' : '已有账号？点击登录'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LogoutModal({ isOpen, onClose, onLogout }: { isOpen: boolean, onClose: () => void, onLogout: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">确认退出</h2>
        <p className="text-slate-500 mb-6">您确定要退出当前账号吗？</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">取消</button>
          <button onClick={onLogout} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">退出登录</button>
        </div>
      </div>
    </div>
  );
}
