import React, { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/navbar'
import Library from '../page-components/library/library'

export default function HomePage() {
  const [selectedNavItem, setSelectedNavItem] = useState(0)

  const renderSelected = useMemo(() => {
    switch (selectedNavItem) {
      case 0:
        return <Library/>
      case 1:
        return <Library/>
    }
  }, [selectedNavItem])

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      <div className="grid grid-cols-12 w-full p-3">
        <div className="col-span-3">
          <Navbar selected={selectedNavItem} setSelected={setSelectedNavItem}/>
        </div>
        <div className="col-span-9 px-4">
          {renderSelected}
        </div>
      </div>
    </React.Fragment>
  )
}
