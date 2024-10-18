import * as React from "react"

export interface ToastProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  action,
  open,
}) => {
  return (
    <div className={`toast ${open ? 'open' : ''}`}>
      {title && <div className="toast-title">{title}</div>}
      {description && <div className="toast-description">{description}</div>}
      {action && <div className="toast-action">{action}</div>}
    </div>
  )
}
