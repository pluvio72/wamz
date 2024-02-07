import React, { useEffect, useState } from 'react'

import PouchDB from 'pouchdb'
export const LibraryDb = new PouchDB('library')

import { HiOutlinePlus } from "react-icons/hi2"
import AddLibraryItemModal from '../page-components/library/add-library-item-modal';
import LibraryItemInfoModal from '../page-components/library/info-modal/library-item-info-modal';
import Tile from '../components/tile';

export default function Library() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [library, setLibrary] = useState<any[]>([])
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>()

  useEffect(() => {
    // LibraryDb.remove({ _id: "f21ec816-cee5-4e82-93ab-19d6d23b911f", _rev: "5-665e0d8e378dba63c76d8e72dbf792c8"})
    LibraryDb.allDocs({ include_docs: true }).then(docs => {
      if (docs.rows.length > 0) {
        setLibrary(docs.rows)
      }
    })
  }, [])

  const openLibraryModal = () => {
    setShowAddModal(true)
  }

  const openInfoModal = (_item) => {
    setSelectedItem(_item.doc)
    setShowInfoModal(true)
  }
  console.log("Library:", library)

  return (
    <div className='grid grid-cols-4'>
      <div className='h-[255px] w-[170px] grid items-center justify-center bg-neutral-500 rounded-lg cursor-pointer hover:bg-neutral-600 transition' onClick={openLibraryModal}>
        <HiOutlinePlus size={60} />
      </div>
      {library.length > 0 && library.map(item => (
        <Tile
          width={170}
          height={250}
          image={item.doc.image}
          onClick={() => openInfoModal(item)}
        />
      ))}
      <AddLibraryItemModal open={showAddModal} setOpen={setShowAddModal} />
      <LibraryItemInfoModal item={selectedItem} open={showInfoModal} setOpen={setShowInfoModal}/>
    </div>
  )
}