"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import {
  Bell,
  Keyboard,
  Lock,
  LogOut,
  Palette,
  Settings as SettingsIcon,
  User,
} from "lucide-react"

import { useUser } from "@/hooks/react-query/user/useUser"

import CustomIcon from "../shared/CustomIcon"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Switch } from "../ui/switch"

function SettingsPanel({ showLabel = false }: { showLabel?: boolean }) {
  const { theme, setTheme } = useTheme()
  const { user } = useUser()
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={`flex items-center justify-start gap-3 rounded-md transition-all duration-200 ${
            showLabel
              ? "w-full px-5 py-2.5 hover:bg-state-hover active:bg-state-active"
              : "p-2 hover:bg-state-hover active:bg-state-active"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus`}
          aria-label="Open settings"
        >
          <CustomIcon
            Icon={SettingsIcon}
            className="text-text-tertiary transition-colors hover:text-text-primary"
          />
          {showLabel && (
            <span className="font-medium text-text-secondary">Settings</span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-y-auto border-border bg-surface-elevated sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-text-primary">Settings</SheetTitle>
          <SheetDescription className="text-text-secondary">
            Manage your account settings and preferences
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Account Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CustomIcon Icon={User} className="text-primary" />
              <h3 className="text-base font-semibold text-text-primary">
                Account
              </h3>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-text-secondary">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={"username"}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-text-secondary">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.data.user.email || ""}
                  placeholder="your.email@example.com"
                  disabled
                  className="disabled:text-text-secondary disabled:opacity-100"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Appearance Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CustomIcon Icon={Palette} className="text-primary" />
              <h3 className="text-base font-semibold text-text-primary">
                Appearance
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium text-text-primary">
                    Theme
                  </Label>
                  <p className="text-xs text-text-tertiary">
                    Choose your interface theme
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-col items-center gap-2 rounded-md border p-3 transition-all duration-200 ${
                    theme === "light"
                      ? "border-primary bg-state-active"
                      : "border-border hover:bg-state-hover"
                  }`}
                >
                  <div className="h-8 w-8 rounded-md bg-white" />
                  <span className="text-xs font-medium text-text-secondary">
                    Light
                  </span>
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center gap-2 rounded-md border p-3 transition-all duration-200 ${
                    theme === "dark"
                      ? "border-primary bg-state-active"
                      : "border-border hover:bg-state-hover"
                  }`}
                >
                  <div className="h-8 w-8 rounded-md bg-black" />
                  <span className="text-xs font-medium text-text-secondary">
                    Dark
                  </span>
                </button>

                <button
                  onClick={() => setTheme("system")}
                  className={`flex flex-col items-center gap-2 rounded-md border p-3 transition-all duration-200 ${
                    theme === "system"
                      ? "border-primary bg-state-active"
                      : "border-border hover:bg-state-hover"
                  }`}
                >
                  <div className="flex h-8 w-8 rounded-md">
                    <div className="h-full w-1/2 rounded-l-md bg-white" />
                    <div className="h-full w-1/2 rounded-r-md bg-black" />
                  </div>
                  <span className="text-xs font-medium text-text-secondary">
                    System
                  </span>
                </button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Preferences Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CustomIcon Icon={Bell} className="text-primary" />
              <h3 className="text-base font-semibold text-text-primary">
                Preferences
              </h3>
            </div>

            <div className="space-y-3">
              <div className="bg-surface-surface flex items-center justify-between rounded-md border border-border p-3">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="notifications"
                    className="text-sm font-medium text-text-primary"
                  >
                    Notifications
                  </Label>
                  <p className="text-xs text-text-tertiary">
                    Receive notifications about updates
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="bg-surface-surface flex items-center justify-between rounded-md border border-border p-3">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="autosave"
                    className="text-sm font-medium text-text-primary"
                  >
                    Auto-save
                  </Label>
                  <p className="text-xs text-text-tertiary">
                    Automatically save your changes
                  </p>
                </div>
                <Switch
                  id="autosave"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Security Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CustomIcon Icon={Lock} className="text-primary" />
              <h3 className="text-base font-semibold text-text-primary">
                Security
              </h3>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Two-Factor Authentication
              </Button>
            </div>
          </div>

          <Separator />

          {/* Shortcuts Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CustomIcon Icon={Keyboard} className="text-primary" />
              <h3 className="text-base font-semibold text-text-primary">
                Keyboard Shortcuts
              </h3>
            </div>

            <div className="bg-surface-surface space-y-2 rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">New Note</span>
                <Badge variant="outline" className="font-mono text-xs">
                  Ctrl + N
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Search</span>
                <Badge variant="outline" className="font-mono text-xs">
                  Ctrl + K
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">
                  Toggle Sidebar
                </span>
                <Badge variant="outline" className="font-mono text-xs">
                  Ctrl + B
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Logout Section */}
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 text-error hover:bg-error/10 hover:text-error"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <CustomIcon Icon={LogOut} className="text-error" />
              Logout
            </Button>
          </div>

          <Separator />

          {/* Danger Zone */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-error">Danger Zone</h3>

            <div className="space-y-2 rounded-md border border-error/50 bg-error/5 p-3">
              <p className="text-sm text-text-secondary">
                Deleting your account is permanent and cannot be undone. All
                your notes and data will be permanently removed.
              </p>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SettingsPanel
