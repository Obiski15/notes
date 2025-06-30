import { Settings as SettingsIcon } from "lucide-react"

import CustomIcon from "../shared/CustomIcon"

function Settings() {
  return (
    <div className="flex items-center justify-between gap-3">
      <CustomIcon Icon={SettingsIcon} />
    </div>
  )
}

export default Settings
