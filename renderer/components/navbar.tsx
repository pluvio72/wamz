import React, { useMemo, useState } from "react"
import clsx from 'clsx'

import { LuLibrary } from "react-icons/lu"
import { MdPlaylistAdd } from "react-icons/md"
import { HiTv } from "react-icons/hi2"

interface Props {
  selected: Number
  setSelected: (newSelected: number) => void
}

export default function Navbar({ selected, setSelected }: Props) {
  const renderItems = useMemo(() => {
    const content = []

    for (let i = 0; i < ITEMS.length; i++) {
      content.push(
        <div className={clsx("flex items-center justiify-center p-4 cursor-pointer hover:text-gray-400 transition", selected === i && "text-gray-400")} onClick={() => setSelected(i)}>
          {ITEMS[i].icon}
          <span className="mx-2 font-bold">{ITEMS[i].text}</span>
        </div>
      )
    }

    return content
  }, [selected])

  return (
    <div className="grid items-center justify-start bg-neutral-800 rounded-lg">
      {renderItems}
    </div>
  )
}

const ITEMS = [
  {
    text: "TV",
    icon: <HiTv size={20} />
  },
  {
    text: "Library",
    icon: <LuLibrary/>
  }
]