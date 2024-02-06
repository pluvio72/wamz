import React, { useEffect, useReducer, useState } from 'react'

import { HiChevronLeft, HiChevronRight, HiMinus, HiPencil, HiPlay, HiPlus, HiXCircle } from 'react-icons/hi2'
import Dropdown from '../../../components/dropdown'
import Button from '../../../components/button'
import AddEpisodeModal from './add-episode-modal'
import { LibraryDb } from '../../../pages/library'
import { EpisodeInfo } from '../../../types'
import Link from 'next/link'
import clsx from 'clsx'

export default function SeriesInfo({ item }: Props) {
  if (!item.seasons) {
    return null
  }
  const [data, setData] = useState(item)
  const [state, setState] = useState<'editing' | 'new' | 'saved'>(item.new ? 'new' : 'saved')
  const [selectedSeason, setSelectedSeason] = useState(0)
  const [showAddEpisodeModal, setShowAddEpisodeModal] = useState(false)

  const onClickAddEpisode = () => setShowAddEpisodeModal(true)

  const saveNewEpisode = (info: EpisodeInfo) => {
    const _data = { ...data }
    _data.seasons[selectedSeason].episodes.push({
      ...info
    })
    LibraryDb.put({ ..._data }).then(val => {
      if (val.ok) {
        setData({
          ..._data,
          _rev: val.rev
        })
      }
    })
  }

  const startEditingSeries = () => {
    setState('editing')
    LibraryDb.put({
      ...item,
      new: false,
    }).then(val => {
      setData(prev => ({
        ...prev,
        _rev: val.rev
      }))
    })
  }

  const addSeason = () => {
    const _data = { ...data }
    _data.seasons.push({
      name: `Season ${data.seasons.length + 1}`,
      episodes: []
    })
    LibraryDb.put({ ..._data }).then(val => {
      setData({ ..._data, _rev: val.rev })
      setSelectedSeason(selectedSeason + 1)
      setState('editing')
    })
  }

  const removeSeason = () => {
    const _data = { ...data }
    _data.seasons.splice(selectedSeason, 1)
    LibraryDb.put({ ..._data }).then(val => {
      setData({ ..._data, _rev: val.rev })
      if (selectedSeason === _data.seasons.length) {
        setSelectedSeason(selectedSeason - 1)
      }
    })
  }

  const removeEpisode = (episodeIndex) => {
    const _data = { ...data }
    _data.seasons[selectedSeason].episodes.splice(episodeIndex, 1)
    LibraryDb.put({ ..._data }).then(val => {
      setData({ ..._data, _rev: val.rev })
    })
  }

  const save = () => {
    setState('saved')
  }

  const goToNextSeason = () => {
    if (selectedSeason < data.seasons.length - 1) {
      setSelectedSeason(selectedSeason + 1)
    }
  }
  const goToPreviousSeason = () => {
    if (selectedSeason > 0) {
      setSelectedSeason(selectedSeason - 1)
    }
  }

  return (
    <div>
      <div className="flex flex-col h-full">
        <p className="text-xl font-medium mt-4 ml-4 mb-4">
          <span className="flex items-center justify-between">
            <span className="text-2xl">{data.seasons[selectedSeason].name}</span>
            {state !== 'editing' &&
              <Dropdown items={[
                {
                  Icon: HiPencil,
                  onClick: () => setState('editing'),
                  title: "Edit season"
                },
                {
                  Icon: HiPlus,
                  onClick: addSeason,
                  title: "Add season"
                },
                {
                  Icon: HiMinus,
                  onClick: removeSeason,
                  title: "Remove season",
                }
              ]}/>
            }
            {state === 'editing' &&
              <Button color="green" className="!w-auto text-sm px-4" onClick={save}>Save</Button>
            }
          </span>
        </p>
        {state === 'new' &&
          <div className="my-auto mx-auto text-center">
            <p className="font-light text-md">Click to edit season</p>
            <Button color="gray" className="w-auto mt-2" onClick={startEditingSeries}>
              <span className="flex items-center justify-center text-sm"><HiPencil className="mr-2"/>Edit season</span>
            </Button>
          </div>
        }
        {data.seasons[selectedSeason].episodes.map((episode, index) => (
          <Link href={{
            pathname: state !== 'editing' ? "/video" : "",
            query: {
              videoPath: episode.videoPath
            }
          }}>
            <div className="bg-neutral-800 p-2 rounded-lg px-3 mb-1 flex items-center cursor-pointer transition hover:bg-neutral-700">
              {state === 'editing' ?
                <HiXCircle className="mr-3" color="red" size={20} onClick={() => removeEpisode(index)}/>
              :
                <HiPlay className="mr-4" />
              }
              <span className="font-medium">{episode.name}</span>
              <span className="ml-auto font-light text-sm">{episode.duration}</span>
            </div>
          </Link>
        ))}
        {state === 'editing' &&
          <Button color="gray" className="mt-2" onClick={onClickAddEpisode}>
            <span className="flex items-center justify-center">Add episode <HiPlus className="ml-2"/></span>
          </Button>
        }
        {data.seasons.length > 1 && 
          <div className="mt-auto flex items-center justify-evenly mr-2">
            <HiChevronLeft className={clsx(selectedSeason === 0 && "text-neutral-500", "transition hover:text-neutral-400 cursor-pointer")} onClick={goToPreviousSeason}/>
            <HiChevronRight className={clsx(selectedSeason === data.seasons.length - 1 && "text-neutral-600", "transition hover:text-neutral-400 cursor-pointer")} onClick={goToNextSeason}/>
          </div>
        }
      </div>
      <AddEpisodeModal open={showAddEpisodeModal} setOpen={setShowAddEpisodeModal} onAdd={saveNewEpisode}/>
    </div>
  )
}

interface Props {
  item: any
}