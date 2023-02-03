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
      <div className='border-[.1875rem] rounded-[50%] w-[10rem] h-[10rem] flex items-center justify-center'>
        <img src={profileImage} alt='profile image' />
      </div>
      <div>
        <h2 className='text-[1.5rem] font-roboto text-[#636363]'>
          {firstName} {lastName} <br /> {otherName}
        </h2>
        <span>ID :{id} </span>

        <section className='flex gap-[1.8125rem] mt-[.8975rem]'>
          <div className='flex items-center gap-[.75rem]'>
            <img src={modifyVector} alt='modify vector' className='w-[1.1869rem] h-[1.1869rem]' /> <span>modify</span>
          </div>
          <div className='flex items-center gap-[.75rem]'>
            <img src={disableVector} alt='disable vector' className='w-[1.1869rem] h-[1.1869rem]' /> <span>disabled</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TopNavProfile
