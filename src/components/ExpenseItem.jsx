import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from './SummaryCards';

function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`));
}

export default function ExpenseItem({ transaction, onEdit, onDelete }) {
  return (
    <tr>
      <td data-label="Date" className="date-cell">{formatDate(transaction.date)}</td>
      <td data-label="Description"><strong className="transaction-title">{transaction.title}</strong>{transaction.description && <span className="transaction-note">{transaction.description}</span>}</td>
      <td data-label="Category"><span className="category-pill">{transaction.category}</span></td>
      <td data-label="Type"><span className={`type-pill ${transaction.type}`}>{transaction.type}</span></td>
      <td data-label="Amount" className={`amount-cell ${transaction.type}`}>{transaction.type === 'expense' ? '− ' : '+ '}{formatCurrency(transaction.amount)}</td>
      <td className="actions-cell"><button className="table-action" title="Edit transaction" aria-label={`Edit ${transaction.title}`} onClick={() => onEdit(transaction)}><Pencil size={16} /></button><button className="table-action delete" title="Delete transaction" aria-label={`Delete ${transaction.title}`} onClick={() => onDelete(transaction)}><Trash2 size={16} /></button></td>
    </tr>
  );
}
