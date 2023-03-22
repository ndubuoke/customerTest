import { FormSectionType } from 'Components/types/FormStructure.types'
import React, { useEffect, useState } from 'react'
import { reverseCamelCase } from './reverseCamelCase'

type Props = {
  section: FormSectionType
  name: string
}

const SingleSection = ({ section, name }: Props) => {
  return (
    <div className='text-[#636363]'>
      <h3 className='font-roboto font-bold text-[1.125rem] leading-[1rem] pt-4 pb-4  ml-[2.5rem]'>
        {reverseCamelCase(section.sectionName).split('-')[0]}
      </h3>
      <div className='flex flex-col gap-4  '>
        {Object.entries(section?.data).map((x: any, i: number) => {
          // console.log(x[1])
          return (
            <div key={i} className='flex gap-10 ml-[2.5rem]'>
              <div className='w-[13rem] text-left  leading-[1rem] font-medium'>{reverseCamelCase(x[0])}</div>
              {/* <span>:</span> */}
              <div className='text-[base] leading-[1rem] font-normal'>
                {name.toLowerCase().includes('documentation') ? (
                  <>{x[1] ? 'Uploaded' : 'Not Uploaded'}</>
                ) : (
                  <>
                    {typeof x[1] === 'object' ? <div>{x[1]?.signedUrl ? 'Uploaded' : 'Not uploaded'}</div> : null}
                    {typeof x[1] === 'string' ? <div>{x[1] || '-'}</div> : null}
                    {typeof x[1] === 'boolean' ? <div>{x[1] ? 'True' : 'False'}</div> : null}
                    {typeof x[1] === 'number' ? <div>{x[1]}</div> : null}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SingleSection
