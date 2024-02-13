import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi2'
import ReactPlayer from 'react-player'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { removeFromQueue } from '../redux/slices/queueSlice'
import { Episode } from '../types'

export default function Video() {
  const playerRef = useRef<ReactPlayer>()
  const [curItem, setCurItem] = useState<Episode>()
  const queue = useAppSelector(state => state.queue)
  const dispatch = useAppDispatch()

  useEffect(() => {
    playNextItem()
  }, [])

  const playNextItem = () => {
    console.log("Queue:", queue)
    if (queue.length > 0) {
      const itemToPlay = queue[0]
      setCurItem(itemToPlay)
      dispatch(removeFromQueue())
    }
  }

  const onMediaEnd = () => {
    console.log("Media endeed")
    playNextItem()
    playerRef.current.seekTo(0)
  }

  return (
    <div className='player-wrapper'>
      <Link href={"/home"}>
        <HiChevronLeft size={24} className="absolute top-12 left-5 z-10 cursor-pointer"/>
      </Link>
      {curItem ?
        <ReactPlayer
          ref={playerRef}
          url={`file://${curItem.videoPath}`}
          width='100%'
          height='100%'
          className='react-player'
          controls
          playing={true}
          onEnded={onMediaEnd}
        />:
        <></>
      }
    </div>
  )
}