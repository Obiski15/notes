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
    <div className="space-x-1 text-center">
      <span>{description}</span>
      <Link href={href} className="text-primary hover:underline">
        {link}
      </Link>
    </div>
  )
}

export default Footer
