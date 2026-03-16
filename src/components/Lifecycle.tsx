import { 
  CheckCircle, 
  Clock, 
  Code, 
  FileText, 
  GitPullRequest, 
  PlayCircle, 
  Settings, 
  Users 
} from 'lucide-react';

const kanbanData = [
  { stage: '需求池', count: 12, color: 'bg-slate-100 border-slate-200 text-slate-700' },
  { stage: '评估中', count: 5, color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
  { stage: '开发中', count: 8, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { stage: '测试中', count: 3, color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { stage: '灰度发布', count: 2, color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { stage: '全面投产', count: 45, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
];

const devMetrics = [
  { name: '张三 (财务组)', commits: 142, reuseRate: '78%', passRate: '96%' },
  { name: '李四 (HR组)', commits: 98, reuseRate: '65%', passRate: '92%' },
  { name: '王五 (供应链)', commits: 215, reuseRate: '82%', passRate: '98%' },
  { name: '赵六 (IT支持)', commits: 64, reuseRate: '45%', passRate: '88%' },
];

export default function Lifecycle() {
  return (
    <div className="space-y-6">
      {/* Kanban / Funnel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">项目全生命周期看板</h2>
            <p className="text-sm text-slate-500">从需求提出到全面投产的流程状态</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            新建需求
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
          {kanbanData.map((col, idx) => (
            <div key={idx} className={`flex-1 min-w-[160px] rounded-lg border ${col.color} p-4 flex flex-col`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">{col.stage}</h3>
                <span className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center text-xs font-bold">
                  {col.count}
                </span>
              </div>
              
              {/* Mock Cards for '开发中' to show detail */}
              {col.stage === '开发中' && (
                <div className="space-y-3 mt-2">
                  <div className="bg-white p-3 rounded shadow-sm border border-blue-100 text-xs">
                    <p className="font-medium text-slate-800 mb-1">发票自动核验流程</p>
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 3天前</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 张三</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded shadow-sm border border-blue-100 text-xs">
                    <p className="font-medium text-slate-800 mb-1">员工入职信息录入</p>
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 1周前</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 李四</span>
                    </div>
                  </div>
                </div>
              )}
              {col.stage !== '开发中' && (
                <div className="flex-1 flex items-center justify-center opacity-50 border-2 border-dashed border-current rounded mt-2 py-4">
                  <span className="text-xs font-medium">拖拽至此</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Developer Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">开发者效能指标</h2>
            <p className="text-sm text-slate-500">各团队开发人员代码提交与质量追踪</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-3 font-medium">开发者/团队</th>
                  <th className="px-6 py-3 font-medium">本月代码提交 (次)</th>
                  <th className="px-6 py-3 font-medium">组件复用率</th>
                  <th className="px-6 py-3 font-medium">测试通过率</th>
                  <th className="px-6 py-3 font-medium">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {devMetrics.map((dev, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {dev.name.charAt(0)}
                      </div>
                      {dev.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono">{dev.commits}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full" 
                            style={{ width: dev.reuseRate }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{dev.reuseRate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${parseInt(dev.passRate) > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                            style={{ width: dev.passRate }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{dev.passRate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        活跃
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-1">快捷操作</h2>
            <p className="text-sm text-slate-500">常用开发与生命周期管理工具</p>
          </div>
          
          <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group">
            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <Code className="w-5 h-5 text-blue-600 group-hover:text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">组件资产库</p>
              <p className="text-xs text-slate-500">浏览和复用已发布的公共组件</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left group">
            <div className="w-10 h-10 rounded bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
              <GitPullRequest className="w-5 h-5 text-indigo-600 group-hover:text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">代码审查 (Code Review)</p>
              <p className="text-xs text-slate-500">处理待审批的合并请求 (3个待办)</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group">
            <div className="w-10 h-10 rounded bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
              <PlayCircle className="w-5 h-5 text-emerald-600 group-hover:text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">自动化测试平台</p>
              <p className="text-xs text-slate-500">配置和运行回归测试用例</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
