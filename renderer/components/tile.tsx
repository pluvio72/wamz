import React, { MouseEvent } from 'react'

export default function Tile({ height, image, width, onClick, onContextMenu }: Props) {
  return (
    <div
      className="rounded-lg grid items-center justify-center hover:opacity-50 transition cursor-pointer"
      onContextMenu={onContextMenu}
      onClick={onClick}
      style={{ width, height }}
    >
      <img src={image} className="rounded-lg" />
    </div>
  )
}

interface Props {
  height?: number
  image: string
  width?: number
  onClick?: () => void
  onContextMenu?: (event: MouseEvent<HTMLDivElement>) => void
}