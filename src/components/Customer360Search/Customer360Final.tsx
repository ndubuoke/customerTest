import { customer360Text, profileAvatarSingle, sterlinCombinedLogo } from 'Assets/svgs'
import React, { useState } from 'react'

type Props = {}

const Customer360Final = (props: Props) => {
  const [search, setSearch] = useState<string>('')
  const [name, setName] = useState<string>('Temotope Yusuf Chukwuma')
  const [id, setId] = useState<string>('1234567890')
  const [bvn, setBvn] = useState<string>('1234567890')
  const [phoneNumber, setPhoneNumber] = useState<string>('09012345678')
  const [savingsTier1, setSavingsTier1] = useState<string>('3456278910')
  const [currentTier1, setCurentTier1] = useState<string>('1234567819')
  const [temDeposit, setTemDeposit] = useState<string>('1345678920')
  const [curDeposit, setCurDeposit] = useState<string>('1315671890')
  const [searchResult, setSearchResult] = useState<Number>(1)
  return (
    <div className='bg-white h-[44.0625rem]  flex justify-center flex-col items-center'>
      {/* logo */}

      <div className='flex items-center gap-[1.3125rem] mb-[2.125rem] '>
        <img src={sterlinCombinedLogo} alt='customer360 logo' />
        <img src={customer360Text} alt='customer360 text' className='text-[1rem]' />
      </div>

      {/* logo end */}

      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-[30.875rem] border-[.125rem] border-[rgba(207,42,42,0.22)] rounded-[.5rem] pl-3 cursor-pointer py-1'
      />

      {/* search result */}

      <section className='w-[77.625rem]  '>
        <p className='text-[#636363] text-[1rem] mb-[1.8125rem]'>Search result(s)</p>
        <div className='pl-[1rem] border-l border-b border-[rgba(170,170,170,0.79)] flex items-center gap-[2rem]  '>
          {/* image section */}
          <div className='w-[3rem] h-[3rem] rounded-[50%] border-[.1875rem] border-[#AAAAAA] flex items-center justify-center mb-1 '>
            <img src={profileAvatarSingle} alt='profile image' />
          </div>
          {/* end of image section */}
          <div className='truncate'>
            <p className='font-medium text-[#636363]'>{name}</p>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>ID</span>: {id}
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>BVN</span>: {bvn}
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>PHONE</span>: {phoneNumber}
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>SAVINGS TIER 1</span>: {savingsTier1}
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>CURRENT TIER 1</span>: {currentTier1}
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>TEM DEPOSIT PD</span>: {temDeposit}
            </span>{' '}
            <span className=' px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>CUR DEPOSIT</span>: {curDeposit}
            </span>{' '}
          </div>
        </div>
      </section>
      {/* end of result section */}

      <p className=' w-[77.625rem] mt-[11.75rem] text-end text-[#636363]'>{searchResult} result(s) found</p>
    </div>
  )
}

export default Customer360Final
