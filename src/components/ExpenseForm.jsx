import { useEffect, useState } from 'react';
import { CalendarDays, IndianRupee, X } from 'lucide-react';
import { CATEGORIES, useExpenses } from '../context/ExpenseContext';

const today = () => new Date().toISOString().slice(0, 10);
const blankForm = () => ({ type: 'expense', title: '', amount: '', category: 'Food', date: today(), description: '' });

export default function ExpenseForm({ transaction, onClose }) {
  const { addTransaction, editTransaction } = useExpenses();
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(transaction);

  useEffect(() => {
    setForm(transaction ? { ...transaction, amount: String(transaction.amount), description: transaction.description ?? '' } : blankForm());
    setErrors({});
  }, [transaction]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Enter a title for this transaction.';
    if (!form.amount || Number(form.amount) <= 0) nextErrors.amount = 'Enter an amount greater than zero.';
    if (!form.date) nextErrors.date = 'Choose the transaction date.';
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);

    const data = {
      type: form.type,
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      description: form.description.trim(),
    };
    if (isEditing) editTransaction(transaction.id, data);
    else addTransaction(data);
    onClose();
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="transaction-modal" role="dialog" aria-modal="true" aria-labelledby="transaction-form-title">
        <div className="modal-header">
          <div>
            <p className="eyebrow">{isEditing ? 'Update a record' : 'Money in, money out'}</p>
            <h2 id="transaction-form-title">{isEditing ? 'Edit transaction' : 'Add transaction'}</h2>
          </div>
          <button type="button" className="icon-button" aria-label="Close form" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="type-toggle" aria-label="Transaction type">
            <button type="button" className={form.type === 'expense' ? 'active expense' : ''} onClick={() => update('type', 'expense')}>Expense</button>
            <button type="button" className={form.type === 'income' ? 'active income' : ''} onClick={() => update('type', 'income')}>Income</button>
          </div>

          <label className="field full">Title
            <input autoFocus value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="e.g. Weekly groceries" />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </label>
          <div className="form-grid">
            <label className="field">Amount
              <span className="input-with-icon"><IndianRupee size={16} /><input inputMode="decimal" value={form.amount} onChange={(event) => update('amount', event.target.value)} placeholder="0" /></span>
              {errors.amount && <span className="field-error">{errors.amount}</span>}
            </label>
            <label className="field">Category
              <select value={form.category} onChange={(event) => update('category', event.target.value)}>
                {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
          </div>
          <label className="field full">Date
            <span className="input-with-icon"><CalendarDays size={16} /><input type="date" value={form.date} onChange={(event) => update('date', event.target.value)} /></span>
            {errors.date && <span className="field-error">{errors.date}</span>}
          </label>
          <label className="field full">Description <span className="optional">Optional</span>
            <textarea rows="3" value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="Add a note to help you remember" />
          </label>
          <div className="modal-actions">
            <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">{isEditing ? 'Save changes' : 'Add transaction'}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
