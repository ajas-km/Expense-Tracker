import { useMemo, useState } from 'react';
import { ArrowUpRight, CircleAlert, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import FilterBar from '../components/FilterBar';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenses } from '../context/ExpenseContext';

const initialFilters = { search: '', category: 'all', type: 'all', dateRange: 'all' };

export default function Dashboard({ userName }) {
  const { filterTransactions, deleteTransaction, transactions } = useExpenses();
  const [filters, setFilters] = useState(initialFilters);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const filteredTransactions = useMemo(() => filterTransactions(filters).sort((a, b) => new Date(b.date) - new Date(a.date)), [filterTransactions, filters]);

  function openAdd() {
    setActiveTransaction(null);
    setIsFormOpen(true);
  }

  function openEdit(transaction) {
    setActiveTransaction(transaction);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setActiveTransaction(null);
  }

  function confirmDelete() {
    deleteTransaction(deleteTarget.id);
    setDeleteTarget(null);
  }

  const hasFilters = Object.values(filters).some((value) => value !== 'all' && value !== '');
  return (
    <main className="min-h-screen app-shell">
      <Navbar onAdd={openAdd} />
      <div className="page-content">
        <section className="hero"><div><p className="eyebrow">PERSONAL FINANCE</p><h1>Welcome back, <span>{userName}.</span></h1><p className="hero-copy">Here’s a clear view of your money today.</p></div><div className="hero-status"><span className="status-dot" /> Your finances are up to date <ArrowUpRight size={16} /></div></section>
        <SummaryCards />
        <Charts />
        <FilterBar filters={filters} setFilters={setFilters} />
        {hasFilters && <div className="filter-notice"><span>Showing {filteredTransactions.length} of {transactions.length} transactions</span><button type="button" onClick={() => setFilters(initialFilters)}>Clear filters</button></div>}
        <ExpenseList transactions={filteredTransactions} onEdit={openEdit} onDelete={setDeleteTarget} onAdd={openAdd} />
      </div>
      {isFormOpen && <ExpenseForm transaction={activeTransaction} onClose={closeForm} />}
      {deleteTarget && <div className="modal-backdrop" role="presentation"><section className="confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><button type="button" className="icon-button confirm-close" aria-label="Cancel deletion" onClick={() => setDeleteTarget(null)}><X size={19} /></button><span className="danger-icon"><CircleAlert size={23} /></span><h2 id="delete-title">Delete this transaction?</h2><p>“{deleteTarget.title}” will be permanently removed from your tracker.</p><div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setDeleteTarget(null)}>Keep it</button><button type="button" className="button button-danger" onClick={confirmDelete}>Delete transaction</button></div></section></div>}
    </main>
  );
}
