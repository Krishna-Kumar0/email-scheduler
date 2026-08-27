import { sendLaterOptions } from '../data/mockData.js'

const CalendarIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

export default function SendLaterPopover({ selected, onSelect, onCancel, onConfirm }) {
  return (
    /* Overlay */
    <div className="fixed inset-0 z-40" onClick={onCancel}>
      {/* Popover panel */}
      <div
        className="absolute right-6 top-14 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Send Later</h3>

          {/* Date & time picker trigger */}
          <button
            id="send-later-datepicker"
            className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 hover:border-green-400 transition-colors mb-3"
          >
            <span>Pick date &amp; time</span>
            <CalendarIcon />
          </button>

          {/* Quick-select options */}
          <div className="space-y-0.5">
            {sendLaterOptions.map((option) => (
              <button
                key={option.value}
                id={`send-later-${option.value}`}
                onClick={() => onSelect(option)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selected?.value === option.value
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-gray-100 mt-2">
          <button
            id="send-later-cancel"
            onClick={onCancel}
            className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            id="send-later-done"
            onClick={onConfirm}
            disabled={!selected}
            className="border border-green-500 text-green-600 text-sm font-medium px-4 py-1.5 rounded-full hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
