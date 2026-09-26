import { LayoutDashboard, WalletCards } from 'lucide-react';

export default function Navbar({ onAdd }) {
  return (
    <header className="navbar">
      <a className="brand" href="/" aria-label="Spendly dashboard">
        <span className="brand-mark"><WalletCards size={21} strokeWidth={2.5} /></span>
        <span>spendly</span>
      </a>
      <div className="nav-center"><LayoutDashboard size={16} /> Dashboard</div>
      <button type="button" className="button button-primary nav-action" onClick={onAdd}>
        <span>+</span> Add transaction
      </button>
    </header>
  );
}
