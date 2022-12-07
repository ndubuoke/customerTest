import { FormSectionType } from 'Components/types/FormStructure.types'
import React from 'react'
import { reverseCamelCase } from './reverseCamelCase'

type Props = {
  section: FormSectionType
}

const SingleSection = ({ section }: Props) => {
  return (
    <div className='text-[#636363]'>
      <h3 className='font-roboto font-bold text-[18px] leading-[16px] pt-6 pb-4  ml-12'>{reverseCamelCase(section.sectionName).split('-')[0]}</h3>
      <div className='flex gap-4 flex-col mx-6 '>
        {Object.entries(section?.data).map((x: any, i: number) => {
          // console.log(x[1])
          return (
            <div key={i} className='flex gap-10'>
              <div className='w-[300px] text-right text-[base] leading-[16px] font-medium'>{reverseCamelCase(x[0])}</div>
              {/* <span>:</span> */}
              <div className='text-[base] leading-[16px] font-normal'>
                {typeof x[1] === 'object' ? <div>{x[1]?.signedUrl ? 'Uploaded' : 'Not uploaded'}</div> : null}
                {typeof x[1] === 'string' ? <div>{x[1] || '-'}</div> : null}
                {typeof x[1] === 'boolean' ? <div>{x[1] ? 'True' : 'False'}</div> : null}
                {typeof x[1] === 'number' ? <div>{x[1]}</div> : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleSection
