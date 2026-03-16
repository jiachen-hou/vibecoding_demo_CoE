import { 
  Server, 
  Cpu, 
  HardDrive, 
  CheckCircle, 
  AlertCircle, 
  Key, 
  Database, 
  Globe, 
  Lock 
} from 'lucide-react';

const nodesData = [
  { id: 'N-001', name: 'FIN-Worker-01', dept: '财务部', env: 'VM', status: 'healthy', cpu: '45%', mem: '6.2GB' },
  { id: 'N-002', name: 'FIN-Worker-02', dept: '财务部', env: 'VM', status: 'healthy', cpu: '32%', mem: '4.8GB' },
  { id: 'N-003', name: 'HR-Worker-01', dept: '人力资源', env: 'Physical', status: 'warning', cpu: '88%', mem: '14.5GB' },
  { id: 'N-004', name: 'SCM-Worker-01', dept: '供应链', env: 'VM', status: 'healthy', cpu: '12%', mem: '3.1GB' },
  { id: 'N-005', name: 'IT-Worker-01', dept: 'IT运维', env: 'VM', status: 'offline', cpu: '0%', mem: '0GB' },
];

const credentialsData = [
  { system: 'SAP ERP', type: 'Database', status: 'active', lastUsed: '10分钟前', owner: '财务部' },
  { system: 'Salesforce CRM', type: 'API Key', status: 'active', lastUsed: '2小时前', owner: '销售部' },
  { system: 'Oracle DB', type: 'DB Credential', status: 'expired', lastUsed: '3天前', owner: 'IT运维' },
  { system: 'Workday', type: 'OAuth2', status: 'active', lastUsed: '1小时前', owner: '人力资源' },
];

export default function Architecture() {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Server className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">总节点数</p>
            <p className="text-2xl font-bold text-slate-800">142</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">虚拟机占比</p>
            <p className="text-2xl font-bold text-slate-800">85%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
            <HardDrive className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">平均资源利用率</p>
            <p className="text-2xl font-bold text-slate-800">64%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Node Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">节点分布与健康度</h2>
            <p className="text-sm text-slate-500">各部门 RPA 运行环境状态</p>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-3 font-medium">节点名称</th>
                  <th className="px-6 py-3 font-medium">所属部门</th>
                  <th className="px-6 py-3 font-medium">环境</th>
                  <th className="px-6 py-3 font-medium">状态</th>
                  <th className="px-6 py-3 font-medium">CPU/内存</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {nodesData.map((node) => (
                  <tr key={node.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{node.name}</td>
                    <td className="px-6 py-4 text-slate-600">{node.dept}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {node.env}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {node.status === 'healthy' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                        {node.status === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                        {node.status === 'offline' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                        <span className={`text-xs font-medium capitalize
                          ${node.status === 'healthy' ? 'text-emerald-700' : ''}
                          ${node.status === 'warning' ? 'text-amber-700' : ''}
                          ${node.status === 'offline' ? 'text-rose-700' : ''}
                        `}>
                          {node.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {node.cpu} / {node.mem}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Credentials & Auth */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">账号与应用授权</h2>
              <p className="text-sm text-slate-500">业务系统凭据挂载状态</p>
            </div>
            <button className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
              <Key className="w-4 h-4" />
              新增凭据
            </button>
          </div>
          <div className="p-6 space-y-4">
            {credentialsData.map((cred, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    cred.type === 'Database' ? 'bg-indigo-100 text-indigo-600' :
                    cred.type === 'API Key' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {cred.type === 'Database' ? <Database className="w-5 h-5" /> :
                     cred.type === 'API Key' ? <Globe className="w-5 h-5" /> :
                     <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{cred.system}</h4>
                    <p className="text-xs text-slate-500">{cred.type} • 所属: {cred.owner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-1
                    ${cred.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}
                  `}>
                    {cred.status === 'active' ? '正常' : '已过期'}
                  </span>
                  <p className="text-xs text-slate-400">最后调用: {cred.lastUsed}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
