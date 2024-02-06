import clsx from 'clsx'
import React from 'react'
import { HiPencil } from 'react-icons/hi2'

export default function ImageSelect({ height, image, width, openImageSelect }: Props) {
  if (image) {
    return (
      <div className="relative">
        <img src={image} className={clsx((height && width) && `h-[${height}px] w-[${width}px]`, "m-0 mb-1 rounded-lg hover:opacity-50 cursor-pointer transition")} onClick={openImageSelect} />
        <div className="absolute top-4 end-4">
          <HiPencil />
        </div>
      </div>
    )
  } else {
    return (
      <div className={clsx((height && width) && `h-[${height}px] w-[${width}px]` ,"mb-1 cursor-pointer hover:bg-neutral-600 transition relative bg-neutral-500 grid items-center justify-center rounded-lg")} onClick={openImageSelect}>
        <span className="animate-pulse">Click to upload</span>
        <div className="absolute top-4 end-4">
          <HiPencil/>
        </div>
      </div>
    )
  }
}

interface Props {
  image: string
  width?: number
  height?: number
  openImageSelect: () => void
}