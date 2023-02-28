import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react';

type searchBarType = {
  setSearchTerm: (e) => void
  searchTerm: string
}

const SearchBar = ({ setSearchTerm, searchTerm }: searchBarType) => {
  const [hideX, setHideX] = useState(true)
  const searchBarHandler = (e) => {
    setSearchTerm(e.target.value)
    setHideX(false)
  }
  useEffect(() => {
    if (searchTerm == '') {
      setHideX(true)
    }

  }, [searchTerm])
  return (
    <div className='relative w-[15.625rem]'>
      <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
        <svg
          aria-hidden='true'
          className='w-5 h-5 text-[#636363]  '
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
        </svg>
      </div>
      <input
        type='search'
        value={searchTerm}
        onChange={searchBarHandler}
        className='block border-b-2   py-1 pl-10 w-full text-sm text-gray-900 border border-gray-300 outline-none'
        placeholder='Search by customer name'
      />
      <div
        className='flex absolute inset-y-0 right-1 items-center  cursor-pointer'
        onClick={() => {
          setSearchTerm('')
          setHideX(true)
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className={`${hideX ? 'hidden' : ''} w-5 h-5`}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </div>
    </div>
  )
}

export default SearchBar
