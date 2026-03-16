import { Play, Search, Clock, CheckCircle2, AlertCircle, Terminal } from 'lucide-react';
import { useState } from 'react';

const mockApps = [
  { id: 'APP-001', name: '发票自动核验流程', dept: '财务部', desc: '自动从邮箱抓取发票并与ERP系统进行核对', lastRun: '10分钟前', status: 'idle' },
  { id: 'APP-002', name: '员工入职信息录入', dept: '人力资源', desc: '将新员工信息自动同步至各个业务子系统', lastRun: '2小时前', status: 'idle' },
  { id: 'APP-003', name: '每日财务对账', dept: '财务部', desc: '跨行网银流水自动下载与对账', lastRun: '昨天 18:00', status: 'idle' },
  { id: 'APP-004', name: '供应链库存同步', dept: '供应链', desc: '同步仓库WMS系统与电商平台的库存数据', lastRun: '5分钟前', status: 'running' },
  { id: 'APP-005', name: 'IT资产巡检', dept: 'IT运维', desc: '自动巡检服务器状态并生成报告', lastRun: '3天前', status: 'idle' },
];

export default function RunApplication() {
  const [searchTerm, setSearchTerm] = useState('');
  const [runningApps, setRunningApps] = useState<Record<string, boolean>>({});
  const [logs, setLogs] = useState<string[]>([]);

  const handleRun = (appId: string, appName: string) => {
    // TODO: 在这里接入运行应用的真实 API
    console.log(`Running application API for: ${appId}`);
    
    setRunningApps(prev => ({ ...prev, [appId]: true }));
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] 正在启动应用: ${appName} (${appId})...`, ...prev]);

    // 模拟 API 调用延迟和执行过程
    setTimeout(() => {
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] 应用执行成功: ${appName}`, ...prev]);
      setRunningApps(prev => ({ ...prev, [appId]: false }));
    }, 3000);
  };

  const filteredApps = mockApps.filter(app => 
    app.name.includes(searchTerm) || app.dept.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">运行应用 (App Launcher)</h2>
            <p className="text-sm text-slate-500">手动触发 RPA 流程，可在此接入执行 API</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索应用名称或部门..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredApps.map(app => {
            const isRunning = runningApps[app.id] || app.status === 'running';
            return (
              <div key={app.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all bg-white flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-800">{app.name}</h3>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] rounded uppercase font-medium tracking-wider">
                    {app.dept}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-4 flex-1">{app.desc}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {app.lastRun}
                  </div>
                  <button 
                    onClick={() => handleRun(app.id, app.name)}
                    disabled={isRunning}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isRunning 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 hover:border-blue-600'
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                        执行中
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        运行
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution Logs */}
      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden flex flex-col h-64">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2 bg-slate-950">
          <Terminal className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-medium text-slate-300">运行日志 (API 调用回显)</h3>
        </div>
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs space-y-2">
          {logs.length === 0 ? (
            <p className="text-slate-600 italic">暂无运行日志，点击上方“运行”按钮触发 API...</p>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className={`${log.includes('成功') ? 'text-emerald-400' : 'text-slate-300'}`}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
