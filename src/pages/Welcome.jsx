import { useState } from 'react';
import { ArrowRight, ChartNoAxesColumnIncreasing, CircleUserRound, WalletCards } from 'lucide-react';

export default function Welcome({ onContinue }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter the name you would like us to use.');
      return;
    }
    onContinue(trimmedName);
  }

  return (
    <main className="welcome-shell">
      <div className="landing-orb orb-top-left" />
      <div className="landing-orb orb-bottom-right" />
      <div className="flight-path path-left" />
      <div className="flight-path path-right" />
      <aside className="landing-visual visual-left" aria-hidden="true">
        <div className="visual-card chart-card-large float-slow"><span className="visual-line visual-line-one" /><span className="visual-line visual-line-two" /><div className="mock-chart"><span className="mock-bar bar-one" /><span className="mock-bar bar-two" /><span className="mock-bar bar-three" /><span className="mock-bar bar-four" /><span className="mock-bar bar-five" /><svg viewBox="0 0 290 125" preserveAspectRatio="none"><path d="M0 90 C35 47, 47 106, 83 70 S136 89, 167 43 S220 60, 290 12" /></svg></div></div>
        <div className="visual-card chart-card-small float-medium"><div className="mock-donut" /><div className="mock-list"><span /><span /><span /></div></div>
      </aside>
      <section className="welcome-content" aria-labelledby="welcome-title">
        <div className="welcome-logo"><ChartNoAxesColumnIncreasing size={25} strokeWidth={2.4} /></div>
        <h1 id="welcome-title">Welcome to <span>Spendly.</span></h1>
        <p className="welcome-copy">Track your expenses, understand your spending,<br />and take control of your finances.</p>
        <form className="welcome-form" onSubmit={submit} noValidate>
          <label className="sr-only" htmlFor="profile-name">What should we call you?</label>
          <div className="welcome-name-field"><CircleUserRound size={20} /><input id="profile-name" autoFocus value={name} onChange={(event) => { setName(event.target.value); setError(''); }} placeholder="Enter your first name" maxLength="40" /></div>
          {error && <p className="field-error welcome-error">{error}</p>}
          <button className="button button-primary welcome-submit" type="submit">Start tracking <ArrowRight size={18} /></button>
        </form>
      </section>
      <aside className="landing-visual visual-right" aria-hidden="true">
        <div className="visual-card wallet-card float-medium"><div className="wallet-icon"><WalletCards size={38} /></div><span className="wallet-copy wallet-copy-one" /><span className="wallet-copy wallet-copy-two" /></div>
        <div className="visual-card mini-report float-slow"><div className="mini-logo"><ChartNoAxesColumnIncreasing size={24} /></div><div className="mini-bars"><span /><span /><span /></div></div>
      </aside>
    </main>
  );
}
