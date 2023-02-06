import React, { useState } from 'react'
import { profileImage2 } from 'Assets/svgs'
import { modifyVector } from 'Assets/svgs'
import { disableVector } from 'Assets/svgs'

type Props = {}

const TopNavProfile = (props: Props) => {
  // below values will be dispatch from redux
  const [profileImage, setProfileImage] = useState<string>(profileImage2)
  const [id, setId] = useState<Number>(1022245678)
  const [firstName, setFirstName] = useState<string>('Temitope')
  const [lastName, setLastName] = useState<string>('Yusuf')
  const [otherName, setOtherName] = useState<string>('chukwuma')
  return (
    <div className='flex gap-[20px] items-center'>
      <div className=' w-[9.375rem] h-[9.375rem] p-[1.6744rem] border-[.1875rem] border-[#AAAAAA] rounded-[50%]  flex items-center justify-center'>
        <img src={profileImage} alt='profile image' className='w-[5.5806rem] h-[5.7062rem]' />
      </div>
      <div>
        <p className='text-[1rem] font-roboto text-[#636363] font-bold'>
          {firstName} {lastName} <br /> {otherName}
        </p>
        <span className='text-[1rem]'>ID :{id} </span>

        <section className='flex gap-[1.8125rem] mt-[.8975rem]'>
          <div className='flex items-center gap-[.75rem] cursor-pointer'>
            <img src={modifyVector} alt='modify vector' className='w-[1.1869rem] h-[1.1869rem]' />{' '}
            <span className='text-[1rem] tracking-wider capitalize '>modify</span>
          </div>
          <div className='flex items-center gap-[.75rem] cursor-pointer'>
            <img src={disableVector} alt='disable vector' className='w-[1.1869rem] h-[1.1869rem]' />{' '}
            <span className='text-[1rem]  capitalize '>disabled</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TopNavProfile
