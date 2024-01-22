import React, { MouseEvent, PropsWithChildren } from 'react'

import clsx from 'clsx'

export default function Button({ className, children, color = "green", onClick }: PropsWithChildren<Props>) {
  const _onClick = (event: MouseEvent) => {
    event.stopPropagation()
    onClick()
  }

  return (
    <button className={clsx(BTN_COLORS[color], className, 'text-white py-2 px-2 rounded-lg font-medium w-full')} onClick={_onClick}>
      {children}
    </button>
  )
}

interface Props {
  className?: string
  color?: keyof typeof BTN_COLORS
  onClick?: () => void
}

export const BTN_COLORS = {
  'black': 'bg-black',
  'gray': 'bg-neutral-800',
  'light-gray': 'bg-neutral-400',
  'white': 'bg-neutral-200',
  'green': 'bg-green-500'
}