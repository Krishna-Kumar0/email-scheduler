// Sidebar icons
const ClockIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const SendIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-3 h-3 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

export default function Sidebar({ activeTab, onTabChange, onCompose }) {
  return (
    <aside className="w-48 h-screen border-r border-gray-200 flex flex-col flex-shrink-0 bg-white">
      {/* Logo */}
      <div className="px-5 pt-5 pb-3">
        <span className="text-[28px] font-black tracking-tight text-gray-900 leading-none">ONB</span>
      </div>

      {/* User profile */}
      <div className="px-3 pb-3">
        <button className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors text-left">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
            OB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800 truncate leading-tight">Oliver Brown</p>
            <p className="text-[10px] text-gray-400 truncate leading-tight">oliver.brown@domain.io</p>
          </div>
          <ChevronDownIcon />
        </button>
      </div>

      {/* Compose button */}
      <div className="px-3 pb-5">
        <button
          id="compose-btn"
          onClick={onCompose}
          className="w-full border border-green-500 text-green-600 text-sm font-medium py-1.5 rounded-full hover:bg-green-50 active:bg-green-100 transition-colors"
        >
          Compose
        </button>
      </div>

      {/* Nav */}
      <nav className="px-2 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 px-2 mb-2 font-semibold">
          CORE
        </p>

        {/* Scheduled */}
        <button
          id="nav-scheduled"
          onClick={() => onTabChange('scheduled')}
          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
            activeTab === 'scheduled'
              ? 'bg-green-50 text-green-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ClockIcon />
            <span className={activeTab === 'scheduled' ? 'font-semibold' : 'font-normal'}>
              Scheduled
            </span>
          </div>
          <span className={`text-xs tabular-nums ${activeTab === 'scheduled' ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
            12
          </span>
        </button>

        {/* Sent */}
        <button
          id="nav-sent"
          onClick={() => onTabChange('sent')}
          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-colors ${
            activeTab === 'sent'
              ? 'bg-green-50 text-green-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <SendIcon />
            <span className={activeTab === 'sent' ? 'font-semibold' : 'font-normal'}>
              Sent
            </span>
          </div>
          <span className={`text-xs tabular-nums ${activeTab === 'sent' ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
            785
          </span>
        </button>
      </nav>
    </aside>
  )
}
