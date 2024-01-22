import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi2'
import ReactPlayer from 'react-player'
import { LibraryDb } from '../page-components/library/library'

export default function Video() {
  const { query } = useRouter()

  const [videoPath, setVideoPath] = useState<string>()

  useEffect(() => {
    if (query.videoPath) {
      setVideoPath(query.videoPath as string)
    }
  }, [query])

  return (
    <div className='player-wrapper'>
      <Link href={"/home"}>
        <HiChevronLeft size={24} className="absolute top-12 left-5 z-10 cursor-pointer"/>
      </Link>
      <ReactPlayer
        url={`file://${videoPath}`}
        width='100%'
        height='100%'
        className='react-player'
        controls
      />
    </div>
  )
}