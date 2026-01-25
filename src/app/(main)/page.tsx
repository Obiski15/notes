import { Metadata } from "next"

import MainComponent from "@/components/main/MainComponent"
import SelectNote from "@/components/shared/notes/SelectNote"

export const metadata: Metadata = {
  title: "Home",
}

export default function Home() {
  return (
    <MainComponent>
      <SelectNote />
    </MainComponent>
  )
}
