import { Close, quicklink, times } from 'Assets/svgs'
import React from 'react'
import { Link } from 'react-router-dom';
type quickLinksProps = {
  links: { urlName: string; url: string }[]
}

const QuickLinks = ({ links }: quickLinksProps) => {
  return (
    <div className=' w-[15.625rem] h-[100%] bg-white p-2 rounded-md'>
      <div className='border-b border-b-line-faint-background p-2'>
        <h1 className='text-text-secondary font-normal text-[1.5rem]'>Quick Links</h1>
      </div>

      <div className=' mt-2 h-[7rem] bg-warning-main p-4 rounded-md'>
        <div className='flex justify-between'>
          <h6 className='text-sm text-[#252C32]'>Suggested from your activity</h6>
          <img src={Close} className='w-2' />
        </div>
        <div className='text-[.875rem] text-[#5B6871] mt-2 w-[90%]'>As you use the application, suggested items will automatically show up here.</div>
      </div>
      <div className=' flex flex-wrap justify-between py-4 px-6 gap-4'>
        {links.map((link) => (
          <div key={link.urlName} className=' flex flex-col justify-center items-center'>
            <img src={quicklink} alt='' className='w-20' />
            <span>{link.urlName}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickLinks
