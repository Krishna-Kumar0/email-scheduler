import { useState } from 'react'
import LoginScreen from './components/LoginScreen.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import ComposeEmail from './components/ComposeEmail.jsx'
import EmailDetail from './components/EmailDetail.jsx'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // 'dashboard' | 'compose' | 'emailDetail'
  const [view, setView] = useState('dashboard')
  // 'scheduled' | 'sent'
  const [activeTab, setActiveTab] = useState('sent')
  const [selectedEmail, setSelectedEmail] = useState(null)

  // ── Not logged in ────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  }

  // ── Compose view (full page, no sidebar) ─────────────────────────────────────
  if (view === 'compose') {
    return <ComposeEmail onBack={() => setView('dashboard')} />
  }

  // ── Email detail view (full page, no sidebar) ────────────────────────────────
  if (view === 'emailDetail' && selectedEmail) {
    return (
      <EmailDetail
        email={selectedEmail}
        onBack={() => {
          setSelectedEmail(null)
          setView('dashboard')
        }}
      />
    )
  }

  // ── Dashboard (sidebar + email list) ─────────────────────────────────────────
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onCompose={() => setView('compose')}
      />
      <Dashboard
        activeTab={activeTab}
        onEmailClick={(email) => {
          setSelectedEmail(email)
          setView('emailDetail')
        }}
      />
    </div>
  )
}
