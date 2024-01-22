import React, { ChangeEvent, Fragment, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

import { ModalProps } from '../../components/modal'
import { Dialog, Transition } from '@headlessui/react'
import { HiPencil } from "react-icons/hi2"

import TextInput from '../../components/text-input'
import Select from '../../components/select'
import Button from '../../components/button'
import { LibraryDb } from './library'

export default function AddLibraryItemModal({ open, setOpen }: Props) {
  const [type, setType] = useState<typeof TYPES[keyof typeof TYPES]>('Series')
  const [image, setImage] = useState<string>()
  const [imagePath, setImagePath] = useState<string>()
  const [name, setName] = useState('')

  const chooseThumbnail = () => {
    document.getElementById("videoThumbnail").click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagePath(e.target.files[0].path)

      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        if (typeof e.target.result === "string")
          setImage(e.target.result);
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onSave = async () => {
    const data: any = { name, type: TYPES[type], image, new: true }
    
    if (type === 'Series') {
      data.seasons = [
        {
          name: 'Season 1',
          episodes: []
        }
      ]
    }

    LibraryDb.post({
      _id: uuidv4(),
      ...data
    })
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-black p-4">
                  {image ?
                    <img src={image} className="h-[525px] w-[350px] m-0 mb-1 rounded-lg"/>
                    :
                    <div className="mb-1 cursor-pointer hover:bg-neutral-600 transition h-[525px] w-[350px] relative bg-neutral-500 grid items-center justify-center rounded-lg" onClick={chooseThumbnail}>
                      <span className="animate-pulse">Click to upload thumbnail</span>
                      <div className="absolute top-4 end-4">
                        <HiPencil />
                      </div>
                    </div>
                  }
                  <div className="w-[350px] mb-3">
                    <TextInput placeholder="Name" value={name} onChange={(newVal) => setName(newVal)} parentClassName='mt-3 mb-2'/>
                    <Select options={Object.keys(TYPES)} setSelected={(newVal) => setType(newVal)} selected={type}/>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <Button color="light-gray">Cancel</Button>
                    <Button onClick={onSave}>
                      Save
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        <input type="file" id="videoThumbnail" hidden onChange={handleFileChange} />
      </Dialog>
    </Transition.Root>
  )
}

const TYPES = {
  Series: 'series',
  Movie: 'movie'
}

interface Props extends ModalProps { }