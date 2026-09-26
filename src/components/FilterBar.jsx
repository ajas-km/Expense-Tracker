import { Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../context/ExpenseContext';

export default function FilterBar({ filters, setFilters }) {
  function change(field, value) {
    setFilters((current) => ({ ...current, [field]: value }));
  }
  return (
    <section className="filter-bar" aria-label="Filter transactions">
      <div className="search-field"><Search size={18} /><input value={filters.search} onChange={(event) => change('search', event.target.value)} placeholder="Search transactions" /></div>
      <div className="filter-selects">
        <span className="filter-label"><SlidersHorizontal size={16} /> Filters</span>
        <select aria-label="Filter by category" value={filters.category} onChange={(event) => change('category', event.target.value)}>
          <option value="all">All categories</option>
          {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
        </select>
        <select aria-label="Filter by type" value={filters.type} onChange={(event) => change('type', event.target.value)}>
          <option value="all">All types</option><option value="income">Income</option><option value="expense">Expenses</option>
        </select>
        <select aria-label="Filter by date" value={filters.dateRange} onChange={(event) => change('dateRange', event.target.value)}>
          <option value="all">All time</option><option value="month">This month</option><option value="week">Last 7 days</option>
        </select>
      </div>
    </section>
  );
}
