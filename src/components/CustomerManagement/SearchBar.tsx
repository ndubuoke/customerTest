import React from 'react'
import { useState } from 'react'

type searchBarType = {
  setSearchTerm: (e) => void
  searchTerm: string
}

const SearchBar = ({ setSearchTerm, searchTerm }: searchBarType) => {
  const searchBarHandler = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div className='relative w-[250px]'>
      <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
        <svg
          aria-hidden='true'
          className='w-5 h-5 text-gray-500 '
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
        </svg>
      </div>
      <input
        type='search'
        value={searchTerm}
        onChange={searchBarHandler}
        className='block border-b-2  py-1 pl-10 w-full text-sm text-gray-900 border border-gray-300'
        placeholder='Search by customer name or id'
      />
    </div>
  )
}

export default SearchBar
