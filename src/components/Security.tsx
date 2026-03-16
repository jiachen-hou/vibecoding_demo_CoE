import { 
  Activity, 
  Check, 
  Eye, 
  FileEdit, 
  Lock, 
  Play, 
  ShieldAlert, 
  Trash2, 
  UserCog, 
  X 
} from 'lucide-react';

const auditLogs = [
  { id: 'AL-901', time: '2026-03-15 14:32:11', user: 'Admin User', role: 'IT Ops', action: '修改节点配置', target: 'FIN-Worker-01 (CPU Limit 80% -> 90%)', status: 'Success' },
  { id: 'AL-902', time: '2026-03-15 13:15:00', user: 'Bot-FIN-01', role: 'System', action: '读取凭据', target: 'SAP ERP (ID: C-001)', status: 'Success' },
  { id: 'AL-903', time: '2026-03-15 11:45:22', user: '张三', role: 'Developer', action: '发布新版本', target: '发票核验流程 v2.1.0', status: 'Success' },
  { id: 'AL-904', time: '2026-03-15 09:12:05', user: '李四', role: 'Business User', action: '手动触发任务', target: 'T-8901 (每日财务对账)', status: 'Success' },
  { id: 'AL-905', time: '2026-03-14 22:00:00', user: 'System', role: 'System', action: '密码轮转失败', target: 'Oracle DB (ID: C-003)', status: 'Failed' },
];

const roles = ['Business User', 'Developer', 'IT Ops', 'CoE Manager'];
const permissions = [
  { resource: '大盘概览 (Dashboard)', actions: ['view'] },
  { resource: '节点管理 (Nodes)', actions: ['view', 'edit', 'delete'] },
  { resource: '凭据管理 (Credentials)', actions: ['view', 'edit', 'use'] },
  { resource: '流程发布 (Deployments)', actions: ['view', 'create', 'approve'] },
  { resource: '任务调度 (Schedules)', actions: ['view', 'execute', 'edit'] },
  { resource: '审计日志 (Audit Logs)', actions: ['view', 'export'] },
];

const roleMatrix: Record<string, Record<string, string[]>> = {
  'Business User': {
    '大盘概览 (Dashboard)': ['view'],
    '任务调度 (Schedules)': ['view', 'execute'],
  },
  'Developer': {
    '大盘概览 (Dashboard)': ['view'],
    '凭据管理 (Credentials)': ['use'],
    '流程发布 (Deployments)': ['view', 'create'],
    '任务调度 (Schedules)': ['view'],
  },
  'IT Ops': {
    '大盘概览 (Dashboard)': ['view'],
    '节点管理 (Nodes)': ['view', 'edit', 'delete'],
    '凭据管理 (Credentials)': ['view', 'edit'],
    '任务调度 (Schedules)': ['view', 'execute', 'edit'],
    '审计日志 (Audit Logs)': ['view'],
  },
  'CoE Manager': {
    '大盘概览 (Dashboard)': ['view'],
    '节点管理 (Nodes)': ['view'],
    '凭据管理 (Credentials)': ['view'],
    '流程发布 (Deployments)': ['view', 'approve'],
    '任务调度 (Schedules)': ['view'],
    '审计日志 (Audit Logs)': ['view', 'export'],
  }
};

export default function Security() {
  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Lock className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">安全合规得分</p>
            <p className="text-2xl font-bold text-slate-800">98/100</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">高危操作拦截</p>
            <p className="text-2xl font-bold text-slate-800">12 次</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <UserCog className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">活跃授权账号</p>
            <p className="text-2xl font-bold text-slate-800">342</p>
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">行为审计日志 (Audit Logs)</h2>
            <p className="text-sm text-slate-500">操作人员配置修改记录与机器人操作留痕</p>
          </div>
          <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Activity className="w-4 h-4" />
            导出日志
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-medium">时间</th>
                <th className="px-6 py-3 font-medium">操作主体 (User/Bot)</th>
                <th className="px-6 py-3 font-medium">角色</th>
                <th className="px-6 py-3 font-medium">动作</th>
                <th className="px-6 py-3 font-medium">目标对象 / 详情</th>
                <th className="px-6 py-3 font-medium">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 text-xs font-mono">{log.time}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{log.action}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">{log.target}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${log.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}
                    `}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">权限矩阵 (RBAC Matrix)</h2>
          <p className="text-sm text-slate-500">不同角色的视图与操作权限划分</p>
        </div>
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-slate-200 font-semibold text-slate-800 bg-slate-50">资源模块</th>
                {roles.map(role => (
                  <th key={role} className="p-3 border-b-2 border-slate-200 font-semibold text-slate-800 bg-slate-50 text-center">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 border-b border-slate-100 font-medium text-slate-700">
                    {perm.resource}
                    <div className="flex gap-1 mt-1">
                      {perm.actions.map(a => (
                        <span key={a} className="text-[10px] uppercase bg-slate-100 text-slate-500 px-1 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  {roles.map(role => {
                    const rolePerms = roleMatrix[role]?.[perm.resource] || [];
                    return (
                      <td key={role} className="p-3 border-b border-slate-100 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {perm.actions.map(action => {
                            const hasPerm = rolePerms.includes(action);
                            return (
                              <div 
                                key={action} 
                                title={`${role} - ${action} ${perm.resource}`}
                                className={`w-6 h-6 rounded flex items-center justify-center ${
                                  hasPerm ? 'bg-blue-100 text-blue-600' : 'bg-slate-50 text-slate-300'
                                }`}
                              >
                                {hasPerm ? (
                                  action === 'view' ? <Eye className="w-3.5 h-3.5" /> :
                                  action === 'edit' || action === 'create' ? <FileEdit className="w-3.5 h-3.5" /> :
                                  action === 'delete' ? <Trash2 className="w-3.5 h-3.5" /> :
                                  action === 'execute' || action === 'use' ? <Play className="w-3.5 h-3.5" /> :
                                  <Check className="w-3.5 h-3.5" />
                                ) : (
                                  <X className="w-3.5 h-3.5 opacity-50" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
