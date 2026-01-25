function HeaderGroup({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold leading-tight text-text-primary">
        {title}
      </h2>
      <p className="text-base leading-6 text-text-secondary">{description}</p>
    </div>
  )
}

export default HeaderGroup
