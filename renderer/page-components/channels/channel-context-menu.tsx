import React, { useEffect } from 'react'
import { HiPencil } from 'react-icons/hi2';

export default function ChannelContextMenu({ actions, pos, close }: Props) {

  useEffect(() => {
    window.addEventListener('click', close)

    return () => {
      window.removeEventListener('click', close)
    }
  })

  return (
    <div className="absolute bg-neutral-800 rounded-lg py-2" style={{ top: pos.y, left: pos.x }}>
      <span className="flex items-center cursor-pointer hover:bg-neutral-700 pl-3 pr-4 py-2" onClick={actions.editChannel}>
        <HiPencil className="mr-2"/> Edit playlist
      </span>
    </div>
  )
}

interface Props {
  actions: { editChannel: any }
  pos: { x: number; y: number; }
  close: () => void;
}