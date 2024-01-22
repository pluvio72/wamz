import React, { Fragment, ReactNode } from 'react'

import { Menu, Transition } from '@headlessui/react'
import { HiChevronDown, HiPencil } from 'react-icons/hi2'
import clsx from 'clsx'
import { IconType } from 'react-icons'

export default function Dropdown({ items }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-neutral-700 px-3 py-2 text-sm text-neutral-300 font-semibold shadow-sm hover:bg-neutral-600 transition">
          Options
          <HiChevronDown className="-mr-1 h-5 w-5 text-neutral-300" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-700 shadow-lg focus:outline-none">
          <div className="py-1">
            {items.map(item => (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={item.onClick}
                    className={clsx(
                      active ? 'bg-neutral-600 text-neutral-400' : 'text-neutral-300',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <span className="flex items-center"><item.Icon className="mr-2"/> {item.title}</span>
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

interface Props {
  items: Array<{
    Icon: IconType
    title: string;
    onClick: () => void;
  }>
}