import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

const cardData = [
  { id: 'income', label: 'Total income', icon: ArrowDownLeft, tone: 'green', helper: 'All income received' },
  { id: 'expense', label: 'Total expenses', icon: ArrowUpRight, tone: 'red', helper: 'All spending recorded' },
  { id: 'balance', label: 'Current balance', icon: Wallet, tone: 'blue', helper: 'Income minus expenses' },
];

export default function SummaryCards() {
  const { calculateIncome, calculateExpenses, calculateBalance } = useExpenses();
  const values = { income: calculateIncome(), expense: calculateExpenses(), balance: calculateBalance() };

  return (
    <section className="summary-grid" aria-label="Financial summary">
      {cardData.map(({ id, label, icon: Icon, tone, helper }) => (
        <article className={`summary-card summary-card-${tone}`} key={id}>
          <div className="summary-heading">
            <span>{label}</span>
            <span className="summary-icon"><Icon size={19} /></span>
          </div>
          <strong>{formatCurrency(values[id])}</strong>
          <small>{helper}</small>
        </article>
      ))}
    </section>
  );
}
