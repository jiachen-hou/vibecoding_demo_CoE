import { 
  Bot, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const trendData = [
  { date: '03-01', executions: 4000, value: 2400 },
  { date: '03-05', executions: 3000, value: 1398 },
  { date: '03-10', executions: 2000, value: 9800 },
  { date: '03-15', executions: 2780, value: 3908 },
  { date: '03-20', executions: 1890, value: 4800 },
  { date: '03-25', executions: 2390, value: 3800 },
  { date: '03-30', executions: 3490, value: 4300 },
];

const roiData = [
  { dept: '财务部', hours: 4500 },
  { dept: '人力资源', hours: 3200 },
  { dept: '供应链', hours: 2800 },
  { dept: 'IT运维', hours: 1900 },
  { dept: '客服中心', hours: 1500 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="运行机器人总数" 
          value="1,284" 
          change="+12.5%" 
          isPositive={true}
          icon={Bot}
          color="text-blue-600"
          bg="bg-blue-100"
        />
        <MetricCard 
          title="累计节省工时 (小时)" 
          value="45,231" 
          change="+8.2%" 
          isPositive={true}
          icon={Clock}
          color="text-emerald-600"
          bg="bg-emerald-100"
        />
        <MetricCard 
          title="本月流程成功率" 
          value="98.7%" 
          change="+0.3%" 
          isPositive={true}
          icon={CheckCircle2}
          color="text-indigo-600"
          bg="bg-indigo-100"
        />
        <MetricCard 
          title="异常告警数" 
          value="24" 
          change="-5.4%" 
          isPositive={true} // fewer alerts is positive
          icon={AlertTriangle}
          color="text-rose-600"
          bg="bg-rose-100"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">近30天执行趋势</h2>
              <p className="text-sm text-slate-500">自动化任务执行量与产出价值对比</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                <TrendingUp className="w-4 h-4" />
                环比增长 15%
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorExecutions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="executions" name="执行量 (次)" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorExecutions)" />
                <Area type="monotone" dataKey="value" name="产出价值 (美元)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROI by Dept */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800">各部门 ROI 贡献</h2>
            <p className="text-sm text-slate-500">累计节省工时分布 (Top 5)</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="dept" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={60} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="hours" name="节省工时" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, isPositive, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  );
}
