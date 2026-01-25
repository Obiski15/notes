import { Settings as SettingsIcon } from "lucide-react"

import CustomIcon from "../shared/CustomIcon"

function Settings() {
  return (
    <button
      className="rounded-md p-2 transition-all duration-200 hover:bg-state-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus active:bg-state-active"
      aria-label="Open settings"
    >
      <CustomIcon
        Icon={SettingsIcon}
        className="text-text-tertiary transition-colors hover:text-text-primary"
      />
    </button>
  )
}

export default Settings
