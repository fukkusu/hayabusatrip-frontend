import React from 'react'

type DropdownMenuButtonProps = {
  onClick: () => void
  label: string
  className?: string
}

export const DropdownMenuButton: React.FC<DropdownMenuButtonProps> = ({
  onClick,
  label,
  className,
}) => {
  const defaultClassName =
    'whitespace-nowrap p-3 text-left rounded hover:bg-gray-100 transition-colors cursor-pointer'
  const appliedClassName = className
    ? `${defaultClassName} ${className}`
    : defaultClassName

  return (
    <button onClick={onClick} className={appliedClassName}>
      {label}
    </button>
  )
}
