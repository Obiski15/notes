import { ReactNode } from "react"

function Content<T>({
  data,
  cb,
}: {
  data: T[]
  cb: (value: T, index: number, array: T[]) => ReactNode
}) {
  return <div>{data.map(cb)}</div>
}

export default Content
