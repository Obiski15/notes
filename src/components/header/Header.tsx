import Image from "next/image"

function Header() {
  const image = ""

  return (
    <div className="flex items-center justify-between p-3">
      <p>folder name</p>

      <div className="flex items-center justify-between gap-3">
        <p>Welcome, Emmanuel</p>
        <div className="relative flex size-10 items-center justify-center rounded-full bg-red-500 uppercase">
          {!image ? <p>AB</p> : <Image src="" alt="profile" fill />}
        </div>
      </div>
    </div>
  )
}

export default Header
