import { ReceiptText } from 'lucide-react';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ transactions, onEdit, onDelete, onAdd }) {
  return (
    <section className="transactions-section">
      <div className="section-heading"><div><p className="eyebrow">Detailed activity</p><h2>Transactions</h2></div><span className="transaction-count">{transactions.length} {transactions.length === 1 ? 'record' : 'records'}</span></div>
      {transactions.length ? <div className="table-scroll"><table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Type</th><th>Amount</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{transactions.map((transaction) => <ExpenseItem key={transaction.id} transaction={transaction} onEdit={onEdit} onDelete={onDelete} />)}</tbody></table></div> : <div className="empty-state"><span className="empty-icon"><ReceiptText size={26} /></span><h3>No transactions found</h3><p>Start tracking your spending by adding your first transaction.</p><button type="button" className="button button-primary" onClick={onAdd}>+ Add transaction</button></div>}
    </section>
  );
}
