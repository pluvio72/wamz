import React, { useLayoutEffect, useRef, useState } from 'react'
import Modal, { ModalProps } from '../../components/modal'
import { v4 as uuid4 } from 'uuid'
import Button from '../../components/button'
import TextInput from '../../components/text-input'
import { LibraryDb } from '../../pages/library'
import clsx from 'clsx'
import ImageSelect from '../../components/image-select'
import PouchDb from 'pouchdb'

export const ChannelDb = new PouchDb('channel')

export default function ChannelModal({ open, channelInfo, setOpen }: Props) {
  const [items, setItems] = useState<any[]>([])
  const [image, setImage] = useState<any>()
  const [name, setName] = useState('')
  const [filter, setFilter] = useState('')
  const [selectedItems, setSelectedItems] = useState([])

  const thumbnailFileInput = useRef<HTMLInputElement>()

  useLayoutEffect(() => {
    LibraryDb.allDocs({ include_docs: true }).then(docs => {
      setItems(docs.rows)
    })
  }, [])

  const isDisabled = () => selectedItems.length === 0 || name === '' || !image
  const chooseThumbnail = () => thumbnailFileInput.current.click()
  const isSelected = (idx) => selectedItems.find(e => e === idx)

  const handleFileChange = (e) => {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      if (typeof e.target.result === "string")
        setImage(e.target.result);
    });

    reader.readAsDataURL(e.target.files[0]);
  }

  const select = (item) => {
    if (!isSelected(item)) {
      setSelectedItems(prev => [...prev, item])
    } else {
      setSelectedItems(prev => {
        const newVal = [...prev]
        newVal.splice(newVal.indexOf(item), 1)
        return newVal
      })
    }
  }

  const saveChannel = () => {
    if (name && image && items.length > 0) {
      let data = {
        name,
        image,
        items
      }

      if (channelInfo) {
        data = {
          ...data,
          ...channelInfo
        }
      } else {
        data['_id'] = uuid4()
      }

      setName('')
      setImage(null)
      setItems([])
      setOpen(false)
      ChannelDb.put(data)
    }
  }

  return (
    <Modal open={open} setOpen={setOpen} belowContent={<Button disabled={isDisabled()} onClick={saveChannel} color="green">Save</Button>}>
      <div className="grid grid-cols-3 gap-x-4">
        <div className="flex flex-col justify-between">
          <ImageSelect image={image} openImageSelect={chooseThumbnail} height={350} width={250} />
          <div className="w-[250px]">
            <TextInput placeholder="Channel name" value={name} onChange={(newVal) => setName(newVal)} parentClassName='mt-3'/>
          </div>
        </div>
        <div className="col-span-2">
          <TextInput value={filter} onChange={setFilter} placeholder="Search..." parentClassName='mb-3'/>
          {items.map(item => {
            const active = isSelected(item)
            return (
              <div
                className={clsx("h-[255px] w-[170px] text-center rounded-lg transition cursor-pointer", active && "ring-4 ring-green-500")}
                onClick={() => select(item)}
              >
                <img src={item.doc.image} className={clsx("mb-1 hover:opacity-50 rounded-lg", active && "opacity-50")} />
              </div>
            )
          })}
        </div>
        <input type="file" ref={thumbnailFileInput} onChange={handleFileChange} hidden />
      </div>
    </Modal>
  )
}

interface Props extends ModalProps {
  channelInfo?: {
    _id: string
    _rev: string
    name: string
    image: string
    items: any[]
  }
}