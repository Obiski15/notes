import crypto from "crypto"

export default function createHash(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex")
}
