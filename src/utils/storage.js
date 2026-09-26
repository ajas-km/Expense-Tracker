const STORAGE_KEY = 'spendly-transactions';
const PROFILE_NAME_KEY = 'spendly-profile-name';

export function loadTransactions() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];
    const parsed = JSON.parse(saved);
    // Remove records seeded by a previous development version, but preserve real entries.
    return Array.isArray(parsed) ? parsed.filter((item) => !String(item.id).startsWith('demo-')) : [];
  } catch {
    return [];
  }
}

export function saveTransactions(transactions) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    // The app still works in memory if browser storage is unavailable.
  }
}

export function loadProfileName() {
  try {
    return window.localStorage.getItem(PROFILE_NAME_KEY)?.trim() ?? '';
  } catch {
    return '';
  }
}

export function saveProfileName(name) {
  try {
    window.localStorage.setItem(PROFILE_NAME_KEY, name.trim());
  } catch {
    // A name can still be used for the current session when storage is unavailable.
  }
}
