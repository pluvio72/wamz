import React, { MouseEvent, PropsWithChildren } from 'react'

import clsx from 'clsx'

export default function Button({ className, children, disabled, color = "green", onClick }: PropsWithChildren<Props>) {
  const _onClick = (event: MouseEvent) => {
    event.stopPropagation()
    onClick()
  }

  return (
    <button
      className={clsx(disabled ? DISABLED_BTN_COLORS[color] : BTN_COLORS[color] + ' text-white', className + ' text-neutral-300', 'py-2 px-2 rounded-lg font-medium w-full')}
      onClick={_onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

interface Props {
  className?: string
  color?: keyof typeof BTN_COLORS
  disabled?: boolean
  onClick?: () => void
}

export const BTN_COLORS = {
  'black': 'bg-black',
  'gray': 'bg-neutral-800',
  'light-gray': 'bg-neutral-400',
  'white': 'bg-neutral-200',
  'green': 'bg-green-500'
}

const DISABLED_BTN_COLORS = {
  'black': 'bg-neutral-800',
  'gray': 'bg-neutral-700',
  'light-gray': 'bg-neutral-300',
  'white': 'bg-neutral-300',
  'green': 'bg-green-700'
}