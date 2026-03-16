import { 
  Activity, 
  AlertOctagon, 
  AlertTriangle, 
  ArrowUp, 
  CheckCircle2, 
  Clock, 
  ListFilter, 
  Play, 
  RefreshCw, 
  Settings2, 
  Terminal 
} from 'lucide-react';

const activeTasks = [
  { id: 'T-8901', name: '每日财务对账', priority: 'High', status: 'running', progress: 65, node: 'FIN-Worker-01', startTime: '08:00:00' },
  { id: 'T-8902', name: '发票OCR识别批处理', priority: 'Medium', status: 'running', progress: 32, node: 'FIN-Worker-02', startTime: '08:15:30' },
  { id: 'T-8903', name: '员工离职权限回收', priority: 'Critical', status: 'queued', progress: 0, node: 'Pending', startTime: 'Scheduled 09:00' },
  { id: 'T-8904', name: '供应链库存同步', priority: 'Low', status: 'queued', progress: 0, node: 'Pending', startTime: 'Scheduled 10:00' },
];

const exceptionLogs = [
  { id: 'ERR-102', task: 'SAP订单抓取', level: 'Critical', message: 'SAP GUI Login Failed: Invalid Credentials', time: '10分钟前', status: '未处理' },
  { id: 'ERR-103', task: '报表邮件发送', level: 'Warning', message: 'SMTP Server Timeout (30000ms)', time: '1小时前', status: '处理中' },
  { id: 'ERR-104', task: '网页数据爬取', level: 'Info', message: 'Selector not found: #main-table > tr:nth-child(5)', time: '2小时前', status: '已解决' },
  { id: 'ERR-105', task: '银企直连对账', level: 'Critical', message: 'USB Key Not Detected on FIN-Worker-03', time: '3小时前', status: '处理中' },
];

export default function Operations() {
  return (
    <div className="space-y-6">
      {/* Real-time Queue */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              实时调度大屏
            </h2>
            <p className="text-sm text-slate-500">当前执行任务队列与优先级调度</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
              <ListFilter className="w-4 h-4" />
            </button>
            <button className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition-colors flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              调度策略配置
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-medium">任务 ID</th>
                <th className="px-6 py-3 font-medium">流程名称</th>
                <th className="px-6 py-3 font-medium">优先级</th>
                <th className="px-6 py-3 font-medium">状态 / 进度</th>
                <th className="px-6 py-3 font-medium">执行节点</th>
                <th className="px-6 py-3 font-medium">开始时间</th>
                <th className="px-6 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500 text-xs">{task.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{task.name}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${task.priority === 'Critical' ? 'bg-rose-100 text-rose-700' : ''}
                      ${task.priority === 'High' ? 'bg-orange-100 text-orange-700' : ''}
                      ${task.priority === 'Medium' ? 'bg-blue-100 text-blue-700' : ''}
                      ${task.priority === 'Low' ? 'bg-slate-100 text-slate-700' : ''}
                    `}>
                      {task.priority === 'Critical' && <ArrowUp className="w-3 h-3" />}
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {task.status === 'running' ? (
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${task.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">{task.progress}%</span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <Clock className="w-4 h-4" /> 排队中
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{task.node}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{task.startTime}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exception Radar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-rose-50/30">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              异常雷达 (Exception Radar)
            </h2>
            <p className="text-sm text-slate-500">失败任务日志聚合与告警处理进度</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full flex items-center gap-1">
              2 严重告警
            </span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1">
              1 警告
            </span>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {exceptionLogs.map((log) => (
              <div key={log.id} className={`p-4 rounded-lg border ${
                log.level === 'Critical' ? 'border-rose-200 bg-rose-50/50' :
                log.level === 'Warning' ? 'border-amber-200 bg-amber-50/50' :
                'border-slate-200 bg-slate-50/50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {log.level === 'Critical' ? <AlertOctagon className="w-4 h-4 text-rose-600" /> :
                     log.level === 'Warning' ? <AlertTriangle className="w-4 h-4 text-amber-500" /> :
                     <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    <span className="font-semibold text-sm text-slate-800">{log.task}</span>
                    <span className="text-xs text-slate-500 font-mono">({log.id})</span>
                  </div>
                  <span className="text-xs text-slate-400">{log.time}</span>
                </div>
                
                <div className="bg-slate-900 rounded p-3 mb-3 flex items-start gap-2 overflow-x-auto">
                  <Terminal className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <code className="text-xs text-slate-300 font-mono whitespace-nowrap">
                    {log.message}
                  </code>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    log.status === '未处理' ? 'bg-rose-100 text-rose-700' :
                    log.status === '处理中' ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {log.status}
                  </span>
                  
                  {log.status !== '已解决' && (
                    <div className="flex gap-2">
                      <button className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded shadow-sm transition-colors">
                        分配工单
                      </button>
                      <button className="text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded shadow-sm transition-colors flex items-center gap-1">
                        <Play className="w-3 h-3" /> 重试任务
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Operations Summary / Mini Dashboard */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-white shadow-sm">
              <div className="text-center">
                <span className="block text-2xl font-bold text-slate-800">94%</span>
                <span className="block text-xs text-slate-500">SLA 达标率</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">运维健康度良好</h3>
              <p className="text-sm text-slate-500 max-w-xs mt-1">
                当前有 2 个严重告警需要立即处理。大部分核心业务流程运行平稳。
              </p>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">平均修复时间 (MTTR)</p>
                <p className="font-bold text-slate-800">45 分钟</p>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">自动恢复率</p>
                <p className="font-bold text-slate-800">68%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
