"use client"

import SettingsPanel from "./SettingsPanel"

function Settings({ showLabel = false }: { showLabel?: boolean }) {
  return <SettingsPanel showLabel={showLabel} />
}

export default Settings
