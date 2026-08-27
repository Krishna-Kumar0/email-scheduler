export default function RecipientChip({ email, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 border border-green-400 text-green-700 text-xs rounded-full px-2.5 py-0.5 bg-white">
      {email}
      {onRemove && (
        <button
          onClick={() => onRemove(email)}
          className="ml-0.5 hover:text-green-900 transition-colors leading-none"
          aria-label={`Remove ${email}`}
        >
          ×
        </button>
      )}
    </span>
  )
}
