function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="space-y-1 px-5 py-6 text-center">
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      <p className="mt-1 w-full text-sm leading-relaxed text-text-secondary">
        {message}
      </p>
    </div>
  )
}

export default EmptyState
