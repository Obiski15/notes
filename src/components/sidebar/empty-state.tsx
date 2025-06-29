function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="space-y-1 px-5 py-6 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 w-full text-sm leading-[26px] text-foreground/60">
        {message}
      </p>
    </div>
  )
}

export default EmptyState
