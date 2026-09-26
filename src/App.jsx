import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import { loadProfileName, saveProfileName } from './utils/storage';

export default function App() {
  const [profileName, setProfileName] = useState(loadProfileName);

  function startTracking(name) {
    const trimmedName = name.trim();
    saveProfileName(trimmedName);
    setProfileName(trimmedName);
  }

  if (!profileName) return <Welcome onContinue={startTracking} />;

  return (
    <Routes>
      <Route path="*" element={<Dashboard userName={profileName} />} />
    </Routes>
  );
}
