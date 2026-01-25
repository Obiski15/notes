import Link from "next/link"

function Footer({
  link,
  href,
  description,
}: {
  link: string
  href: string
  description: string
}) {
  return (
    <div className="text-center text-sm">
      <span className="text-text-secondary">{description}</span>{" "}
      <Link href={href} className="font-medium text-primary hover:underline">
        {link}
      </Link>
    </div>
  )
}

export default Footer
