import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ModalProps } from '../../../components/modal'
import { Capitalize } from '../../../util/string'
import SeriesInfo from './series-info'

export default function LibraryItemInfoModal({ item, open, setOpen }: Props) {
  if (!item) {
    return null
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
                  <div className="grid grid-cols-2 gap-x-4">
                    {item.type === "series" &&
                      <SeriesInfo item={item} />
                    }
                    <div>
                      <img className="w-[350px] h-[525px] rounded-lg mb-3" src={item.image} />
                      <p className="ml-2 font-medium text-xl">{item.name}</p>
                      <span className="ml-2 font-light text-md text-neutral-400">{Capitalize(item.type)}</span>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

interface Props extends ModalProps {
  item: any
}