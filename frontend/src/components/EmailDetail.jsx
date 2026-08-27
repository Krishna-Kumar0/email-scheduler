import { useState } from 'react'
import { emailDetails } from '../data/mockData.js'

const StarIcon = ({ filled }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const ArchiveIcon = () => (
  <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
)

const DeleteIcon = () => (
  <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

function AttachmentThumb({ name }) {
  return (
    <div className="w-40 rounded-xl overflow-hidden border border-gray-200">
      <div className="w-full h-28 bg-gradient-to-br from-blue-200 via-teal-100 to-blue-300 flex items-center justify-center">
        <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>
      <div className="px-2 py-1.5">
        <p className="text-xs text-gray-700 font-medium truncate">{name}</p>
        <p className="text-[10px] text-gray-400">1.2 MB</p>
      </div>
    </div>
  )
}

function EmailBody({ body }) {
  return (
    <div className="text-sm text-gray-800 space-y-3 leading-relaxed">
      {body.map((block, i) => {
        if (block.type === 'highlight') {
          return (
            <div key={i} className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 rounded-r-lg space-y-1">
              {block.content.map((line, j) => (
                <p key={j} className="font-semibold text-gray-800">{line}</p>
              ))}
            </div>
          )
        }
        if (block.type === 'italic') {
          return <p key={i} className="italic text-gray-600">{block.content}</p>
        }
        return <p key={i}>{block.content}</p>
      })}
    </div>
  )
}

export default function EmailDetail({ email, onBack }) {
  const [starred, setStarred] = useState(email.starred ?? false)
  const detail = emailDetails[email.id]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <button
            id="detail-back-btn"
            onClick={onBack}
            className="text-gray-500 hover:text-gray-800 transition-colors flex-shrink-0"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-gray-900 truncate">
            {detail?.subject ?? email.subject}
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <button
            id="star-detail-btn"
            onClick={() => setStarred((s) => !s)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <StarIcon filled={starred} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <ArchiveIcon />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <DeleteIcon />
          </button>
          <div className="w-px h-5 bg-gray-200 mx-1" />
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold">
            OB
          </div>
        </div>
      </div>

      {/* Email content */}
      <div className="max-w-3xl mx-auto w-full px-6 py-6">
        {detail ? (
          <>
            {/* Sender row */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-start gap-3">
                {/* Sender avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: detail.fromColor }}
                >
                  {detail.fromInitial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {detail.from}{' '}
                    <span className="font-normal text-gray-400 text-xs">&lt;{detail.fromEmail}&gt;</span>
                  </p>
                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mt-0.5 transition-colors">
                    to me <ChevronDownIcon />
                  </button>
                </div>
              </div>
              <span className="text-xs text-gray-400 mt-0.5">{detail.date}</span>
            </div>

            {/* Body */}
            <div className="ml-12">
              <EmailBody body={detail.body} />

              {/* Attachments */}
              {detail.attachments.length > 0 && (
                <div className="mt-6">
                  <div className="flex gap-3 flex-wrap">
                    {detail.attachments.map((att) => (
                      <AttachmentThumb key={att.name} name={att.name} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Fallback for emails without detail data */
          <div className="text-center py-16 text-gray-400 text-sm">
            <p>No content available for this email.</p>
          </div>
        )}
      </div>
    </div>
  )
}
