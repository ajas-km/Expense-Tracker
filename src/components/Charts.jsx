import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartNoAxesCombined } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from './SummaryCards';

const COLORS = ['#7c3aed', '#14b8a6', '#f59e0b', '#f43f5e', '#3b82f6', '#a855f7', '#84cc16', '#64748b'];
const shortCurrency = (value) => new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

function EmptyChart() {
  return <div className="empty-chart"><ChartNoAxesCombined size={25} /><span>Add transactions to reveal your spending patterns.</span></div>;
}

function Card({ title, subtitle, children, className = '' }) {
  return <article className={`chart-card ${className}`}>
    <div className="chart-title"><div><h3>{title}</h3><p>{subtitle}</p></div></div>
    {children}
  </article>;
}

export default function Charts() {
  const { transactions } = useExpenses();
  const expenses = transactions.filter((item) => item.type === 'expense');
  const categoryData = Object.values(expenses.reduce((groups, item) => {
    groups[item.category] = groups[item.category] || { name: item.category, value: 0 };
    groups[item.category].value += Number(item.amount);
    return groups;
  }, {})).sort((a, b) => b.value - a.value);

  const monthlyData = buildMonthlyData(transactions);
  const trendData = buildTrendData(expenses);

  return (
    <section className="charts-layout" aria-label="Spending analytics">
      <Card title="Spending by category" subtitle="Where your money is going" className="category-chart">
        {categoryData.length ? (
          <div className="donut-layout">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={63} outerRadius={93} paddingAngle={3} stroke="none">
                  {categoryData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="chart-legend">
              {categoryData.slice(0, 5).map((entry, index) => <li key={entry.name}><span style={{ backgroundColor: COLORS[index % COLORS.length] }} />{entry.name}<strong>{formatCurrency(entry.value)}</strong></li>)}
            </ul>
          </div>
        ) : <EmptyChart />}
      </Card>
      <Card title="Income vs. expenses" subtitle="Last 6 months" className="monthly-chart">
        {transactions.length ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} barGap={5} margin={{ top: 16, right: 2, bottom: 0, left: -18 }}>
              <CartesianGrid vertical={false} stroke="#edf0f5" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#7b8794', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={shortCurrency} tick={{ fill: '#7b8794', fontSize: 11 }} />
              <Tooltip formatter={(value) => formatCurrency(value)} cursor={{ fill: '#f8fafc' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              <Bar dataKey="Income" fill="#14b8a6" radius={[5, 5, 0, 0]} maxBarSize={28} />
              <Bar dataKey="Expenses" fill="#f97316" radius={[5, 5, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        ) : <EmptyChart />}
      </Card>
      <Card title="Spending trend" subtitle="Your daily expense activity" className="trend-chart">
        {trendData.some((item) => item.Spending > 0) ? (
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={trendData} margin={{ top: 14, right: 6, bottom: 0, left: -18 }}>
              <defs><linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity=".22" /><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" /></linearGradient></defs>
              <CartesianGrid vertical={false} stroke="#edf0f5" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7b8794', fontSize: 11 }} minTickGap={30} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={shortCurrency} tick={{ fill: '#7b8794', fontSize: 11 }} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="Spending" stroke="#7c3aed" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 3, fill: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        ) : <EmptyChart />}
      </Card>
    </section>
  );
}

function buildMonthlyData(transactions) {
  const now = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    const month = monthDate.toLocaleString('en-IN', { month: 'short' });
    const key = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`;
    const values = transactions.filter((item) => item.date?.startsWith(key));
    return {
      month,
      Income: values.filter((item) => item.type === 'income').reduce((sum, item) => sum + Number(item.amount), 0),
      Expenses: values.filter((item) => item.type === 'expense').reduce((sum, item) => sum + Number(item.amount), 0),
    };
  });
}

function buildTrendData(expenses) {
  const now = new Date();
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 13 + index);
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return {
      day: date.toLocaleString('en-IN', { day: 'numeric', month: 'short' }),
      Spending: expenses.filter((item) => item.date === iso).reduce((sum, item) => sum + Number(item.amount), 0),
    };
  });
}
