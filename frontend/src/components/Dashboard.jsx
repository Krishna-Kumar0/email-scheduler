import { useState } from 'react'
import EmailRow from './EmailRow.jsx'
import { scheduledEmails, sentEmails } from '../data/mockData.js'

// Icons
const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
)

const RefreshIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
)

function LoadingState() {
  return (
    <div className="flex-1 p-4 space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3.5 animate-pulse">
          <div className="w-28 h-3.5 bg-gray-200 rounded-full" />
          <div className="w-14 h-5 bg-gray-100 rounded-full" />
          <div className="flex-1 h-3.5 bg-gray-100 rounded-full" />
          <div className="w-20 h-3 bg-gray-100 rounded-full" />
        </div>
      ))}
    </div>
  )
}

function EmptyState({ tab }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-24 px-6">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        {tab === 'scheduled' ? (
          <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        )}
      </div>
      <p className="text-gray-700 font-medium text-sm">No {tab} emails</p>
      <p className="text-gray-400 text-sm mt-1">
        {tab === 'scheduled'
          ? 'Schedule an email to see it here.'
          : 'Your sent emails will appear here.'}
      </p>
    </div>
  )
}

export default function Dashboard({ activeTab, onEmailClick }) {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const allEmails = activeTab === 'scheduled' ? scheduledEmails : sentEmails

  const filtered = search.trim()
    ? allEmails.filter(
        (e) =>
          e.to.toLowerCase().includes(search.toLowerCase()) ||
          e.subject.toLowerCase().includes(search.toLowerCase()) ||
          e.preview.toLowerCase().includes(search.toLowerCase())
      )
    : allEmails

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1200)
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        {/* Search */}
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-3.5 py-1.5">
          <SearchIcon />
          <input
            id="email-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
          />
        </div>

        {/* Filter */}
        <button
          id="filter-btn"
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Filter"
        >
          <FilterIcon />
        </button>

        {/* Refresh */}
        <button
          id="refresh-btn"
          onClick={handleRefresh}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Refresh"
        >
          <RefreshIcon />
        </button>
      </div>

      {/* Email list */}
      {isLoading ? (
        <LoadingState />
      ) : filtered.length === 0 && search.trim() ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-sm">No results for "{search}"</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <div className="flex-1 overflow-y-auto">
          {filtered.map((email) => (
            <EmailRow
              key={email.id}
              email={email}
              onClick={() => onEmailClick(email)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
