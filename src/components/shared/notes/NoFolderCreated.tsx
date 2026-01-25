import { SelectItem } from "@/components/ui/select"

function NoFolderCreated() {
  return (
    <SelectItem
      value="none"
      disabled
      className="text-muted-foreground opacity-70"
    >
      No folders created yet
    </SelectItem>
  )
}

export default NoFolderCreated
