import React from 'react'

type Props = {
  type: 'bvn' | 'phone number' | 'email address' | 'relationship manager'
  heading: string
  Id: any
  // emailId: any
  // relationshipId: any
  // phoneNumber: any
  text: string
  subHeader: string
}

const TopNavReusable = ({ type, heading, Id, text, subHeader }: Props) => {
  return (
    <article>
      <header className='mb-[.8125rem] text-[#636363] text-[1rem] font-roboto tracking-[.0156rem]'>
        <h3>{heading}</h3>
        <p>{Id}</p>
      </header>
      <footer>
        <h4>{subHeader}</h4>

        {type === 'bvn' ? (
          <p className='font-roboto text-[1rem] tracking-[.0156rem] text-[#3FA2F7] capitalize'>{text}(HNI)</p>
        ) : type === 'email address' ? (
          <div className='flex items-center gap-[.5625rem]'>
            <div className='bg-[#2FB755] w-[13px] h-[13px] rounded-[50%]'></div>{' '}
            <span className='font-roboto text-[1rem] tracking-[.0156rem] text-[#636363] capitalize'>{text}</span>
          </div>
        ) : type === 'relationship manager' ? (
          <p className='text-[#2FB755] tracking-[.0156rem] font-roboto uppercase'>{text}</p>
        ) : (
          <p className='font-roboto text-[1rem] tracking-[.0156rem] text-[#636363] capitalize'>{text}</p>
        )}
      </footer>
    </article>
  )
}

export default TopNavReusable
