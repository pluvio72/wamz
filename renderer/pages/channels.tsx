import React, { MouseEvent, useLayoutEffect, useState } from 'react'
import AddChannelModal, { ChannelDb } from '../page-components/tv/add-channel-modal/add-channel-modal'
import { HiPencil } from 'react-icons/hi2'

export default function Channels() {
  const [channels, setChannels] = useState([])
  const [showAddChannelModal, setShowAddChannelModal] = useState(false)
  const [showChannelOptions, setShowChannelOptions] = useState(false)
  const [channelOptionPos, setChannelOptionPos] = useState({ x: 0, y: 0 })

  const openAddChannelModal = () => setShowAddChannelModal(true)

  useLayoutEffect(() => {
    ChannelDb.allDocs({ include_docs: true }).then(docs => {
      setChannels(docs.rows)
    })
  }, [])

  const openChannelOptions = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setChannelOptionPos({ x: e.pageX, y: e.pageY })
    console.log(`x: ${e.pageX}, y: ${e.pageY}`)
    setShowChannelOptions(true)
  }

  return (
    <div className='grid grid-cols-4'>
      <div className='h-[255px] w-[170px] flex flex-col items-center justify-center bg-neutral-500 rounded-lg cursor-pointer hover:bg-neutral-600 transition' onClick={openAddChannelModal}>
        <p className='font-light text-md animate-pulse text-neutral-100'>Click to add channel</p>
      </div>
      {channels.map(channel => (
        <div className="rounded-lg" onContextMenu={openChannelOptions}>
          <img src={channel.doc.image} className="rounded-lg" />
        </div>
      ))}
      {showChannelOptions &&
        <div className='absolute py-2 bg-neutral-800 rounded-lg' style={{ top: channelOptionPos.y, left: channelOptionPos.x }}>
          <div>
            <span className="px-4 pr-6 py-2 flex items-center cursor-pointer transition hover:bg-neutral-700">
              <HiPencil className="mr-2" /> Edit channel
              </span>
          </div>
        </div>
      }
      <AddChannelModal open={showAddChannelModal} setOpen={setShowAddChannelModal}/>
    </div>
  )
}