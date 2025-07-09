import { Metadata } from "next"

import HomeComponent from "@/components/main/HomeComponent"

export const metadata: Metadata = {
  title: "Home",
}

export default function Home() {
  return <HomeComponent />
}
