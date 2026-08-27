import { useState } from 'react'

const StarIcon = ({ filled }) => (
  <svg
    className={`w-4 h-4 transition-colors ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-none'}`}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
)

const statusConfig = {
  sent: { label: 'Sent', className: 'bg-green-50 text-green-700 border border-green-200' },
  scheduled: { label: 'Scheduled', className: 'bg-blue-50 text-blue-700 border border-blue-200' },
}

export default function EmailRow({ email, onClick }) {
  const [starred, setStarred] = useState(email.starred)
  const config = statusConfig[email.status] ?? statusConfig.sent

  return (
    <div
      id={`email-row-${email.id}`}
      onClick={onClick}
      className="flex items-center px-5 py-3.5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer group transition-colors"
    >
      {/* To name */}
      <div className="w-36 flex-shrink-0">
        <span className="text-sm font-semibold text-gray-800 truncate block">
          To: {email.to}
        </span>
      </div>

      {/* Status badge */}
      <div className="flex-shrink-0 mr-3">
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${config.className}`}>
          {config.label}
        </span>
      </div>

      {/* Subject + preview */}
      <div className="flex-1 min-w-0 flex items-center gap-1">
        <span className="text-sm font-medium text-gray-800 truncate flex-shrink-0 max-w-[200px]">
          {email.subject}
        </span>
        <span className="text-sm text-gray-400 truncate">
          · {email.preview}
        </span>
      </div>

      {/* Timestamp */}
      <div className="flex-shrink-0 text-xs text-gray-400 mx-4 hidden sm:block">
        {email.sentAt || email.scheduledFor}
      </div>

      {/* Star */}
      <button
        id={`star-${email.id}`}
        onClick={(e) => {
          e.stopPropagation()
          setStarred((s) => !s)
        }}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        aria-label={starred ? 'Unstar' : 'Star'}
      >
        <StarIcon filled={starred} />
      </button>
    </div>
  )
}
