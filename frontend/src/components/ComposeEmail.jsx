import { useState, useRef, useEffect } from 'react'
import RecipientChip from './RecipientChip.jsx'
import SendLaterPopover from './SendLaterPopover.jsx'
import { senderAccounts } from '../data/mockData.js'

// ── Toolbar icons (visual only) ───────────────────────────────────────────────
const ToolbarButton = ({ children, title }) => (
  <button
    type="button"
    title={title}
    className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors text-xs leading-none"
    onClick={(e) => e.preventDefault()}
  >
    {children}
  </button>
)

const Toolbar = () => (
  <div className="flex items-center gap-0.5 px-2 py-1.5 border-t border-gray-200 flex-wrap">
    <ToolbarButton title="Undo">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
    </ToolbarButton>
    <ToolbarButton title="Redo">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" /></svg>
    </ToolbarButton>
    <span className="w-px h-4 bg-gray-200 mx-1" />
    <ToolbarButton title="Text style"><span className="font-semibold text-[11px]">Tt</span></ToolbarButton>
    <ToolbarButton title="Font size"><span className="text-[10px]">A↕</span></ToolbarButton>
    <span className="w-px h-4 bg-gray-200 mx-1" />
    <ToolbarButton title="Bold"><span className="font-black text-[12px]">B</span></ToolbarButton>
    <ToolbarButton title="Italic"><span className="italic text-[12px]">I</span></ToolbarButton>
    <ToolbarButton title="Underline"><span className="underline text-[12px]">U</span></ToolbarButton>
    <span className="w-px h-4 bg-gray-200 mx-1" />
    <ToolbarButton title="Align">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" /></svg>
    </ToolbarButton>
    <ToolbarButton title="Line height">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m9 0L21 21m0 0l-4.5-4.5M21 21V7.5" /></svg>
    </ToolbarButton>
    <span className="w-px h-4 bg-gray-200 mx-1" />
    <ToolbarButton title="Ordered list">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
    </ToolbarButton>
    <ToolbarButton title="Unordered list">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
    </ToolbarButton>
    <ToolbarButton title="Increase indent">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M11.25 17.25h9M3.75 3v4.5M3.75 15v4.5" /></svg>
    </ToolbarButton>
    <ToolbarButton title="Decrease indent">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M11.25 17.25h9M3.75 3v4.5M3.75 15v4.5" /></svg>
    </ToolbarButton>
    <span className="w-px h-4 bg-gray-200 mx-1" />
    <ToolbarButton title="Blockquote"><span className="text-[13px] font-bold">"</span></ToolbarButton>
    <ToolbarButton title="Table">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 9.375v1.5m1.5-3.75C19.496 8.25 20 8.754 20 9.375v1.5m0 0v1.5c0 .621-.504 1.125-1.125 1.125m-1.5-3.75c.621 0 1.125.504 1.125 1.125v1.5m0-3.75h1.5" /></svg>
    </ToolbarButton>
    <ToolbarButton title="Strikethrough"><span className="line-through text-[12px]">S</span></ToolbarButton>
  </div>
)

// ── Main component ─────────────────────────────────────────────────────────────
export default function ComposeEmail({ onBack }) {
  const [from, setFrom] = useState(senderAccounts[0])
  const [toInput, setToInput] = useState('')
  const [recipients, setRecipients] = useState([])
  const [subject, setSubject] = useState('')
  const [delay, setDelay] = useState('')
  const [hourlyLimit, setHourlyLimit] = useState('')
  const [body, setBody] = useState('')
  const [showSendLater, setShowSendLater] = useState(false)
  const [sendLaterSelected, setSendLaterSelected] = useState(null)
  const [showFromDropdown, setShowFromDropdown] = useState(false)

  const toInputRef = useRef(null)
  const MAX_VISIBLE_CHIPS = 3

  const addRecipient = (email) => {
    const trimmed = email.trim()
    if (trimmed && !recipients.includes(trimmed)) {
      setRecipients((prev) => [...prev, trimmed])
    }
    setToInput('')
  }

  const removeRecipient = (email) => {
    setRecipients((prev) => prev.filter((r) => r !== email))
  }

  const handleToKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && toInput.trim()) {
      e.preventDefault()
      addRecipient(toInput)
    } else if (e.key === 'Backspace' && !toInput && recipients.length > 0) {
      setRecipients((prev) => prev.slice(0, -1))
    }
  }

  const visibleChips = recipients.slice(0, MAX_VISIBLE_CHIPS)
  const hiddenCount = recipients.length - MAX_VISIBLE_CHIPS

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            id="compose-back-btn"
            onClick={onBack}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-gray-900">Compose New Email</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Attachment */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500" title="Attach file">
            <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
          </button>

          {/* Schedule */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500" title="Schedule">
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Send Later / Send button */}
          <div className="relative">
            <button
              id="send-later-btn"
              onClick={() => setShowSendLater((v) => !v)}
              className="border border-green-500 text-green-600 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-green-50 transition-colors"
            >
              {sendLaterSelected ? sendLaterSelected.label : 'Send Later'}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl w-full mx-auto px-6 flex-1 flex flex-col">
        {/* From */}
        <div className="flex items-center border-b border-gray-100 py-3 relative">
          <span className="w-16 text-sm text-gray-400 flex-shrink-0">From</span>
          <button
            id="from-dropdown-btn"
            onClick={() => setShowFromDropdown((v) => !v)}
            className="flex items-center gap-1.5 text-sm text-gray-800 bg-gray-100 rounded-lg px-3 py-1 hover:bg-gray-200 transition-colors"
          >
            {from}
            <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showFromDropdown && (
            <div className="absolute top-full left-16 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-30 overflow-hidden">
              {senderAccounts.map((acc) => (
                <button
                  key={acc}
                  onClick={() => { setFrom(acc); setShowFromDropdown(false) }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${from === acc ? 'text-green-600 font-medium' : 'text-gray-700'}`}
                >
                  {acc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To */}
        <div className="flex items-center border-b border-gray-100 py-3 gap-2">
          <span className="w-16 text-sm text-gray-400 flex-shrink-0">To</span>
          <div
            className="flex-1 flex items-center flex-wrap gap-1.5 cursor-text"
            onClick={() => toInputRef.current?.focus()}
          >
            {visibleChips.map((email) => (
              <RecipientChip key={email} email={email} onRemove={removeRecipient} />
            ))}
            {hiddenCount > 0 && (
              <span className="inline-flex items-center border border-green-400 text-green-700 text-xs rounded-full px-2.5 py-0.5 bg-white font-medium">
                +{hiddenCount}
              </span>
            )}
            <input
              ref={toInputRef}
              id="to-input"
              type="email"
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
              onKeyDown={handleToKeyDown}
              onBlur={() => toInput.trim() && addRecipient(toInput)}
              placeholder={recipients.length === 0 ? 'recipient@example.com' : ''}
              className="outline-none text-sm text-gray-700 placeholder-gray-300 min-w-[180px] flex-1"
            />
          </div>

          {/* Upload List */}
          <button
            id="upload-list-btn"
            className="flex items-center gap-1.5 text-green-600 text-xs font-medium hover:text-green-700 flex-shrink-0 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload List
          </button>
        </div>

        {/* Subject */}
        <div className="flex items-center border-b border-gray-100 py-3">
          <span className="w-16 text-sm text-gray-400 flex-shrink-0">Subject</span>
          <input
            id="subject-input"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-300"
          />
        </div>

        {/* Delay & Hourly Limit */}
        <div className="flex items-center gap-6 border-b border-gray-100 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Delay between 2 emails</span>
            <input
              id="delay-input"
              type="number"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              placeholder="00"
              min="0"
              className="w-14 border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 text-center outline-none focus:border-green-400 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Hourly Limit</span>
            <input
              id="hourly-limit-input"
              type="number"
              value={hourlyLimit}
              onChange={(e) => setHourlyLimit(e.target.value)}
              placeholder="00"
              min="0"
              className="w-14 border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 text-center outline-none focus:border-green-400 transition-colors"
            />
          </div>
        </div>

        {/* Rich text area */}
        <div className="flex-1 border border-gray-200 rounded-xl my-4 flex flex-col overflow-hidden">
          <textarea
            id="email-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type Your Reply..."
            className="flex-1 resize-none outline-none text-sm text-gray-700 placeholder-gray-300 p-4 min-h-[220px]"
          />
          <Toolbar />
        </div>
      </div>

      {/* Send Later Popover */}
      {showSendLater && (
        <SendLaterPopover
          selected={sendLaterSelected}
          onSelect={setSendLaterSelected}
          onCancel={() => setShowSendLater(false)}
          onConfirm={() => setShowSendLater(false)}
        />
      )}
    </div>
  )
}
