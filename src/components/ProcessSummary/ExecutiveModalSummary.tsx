import { Close } from 'Assets/svgs'
import { ExecutiveDetailsType } from 'Components/Form/Types/ExecutiveTypes'
import React from 'react'
import { reverseCamelCase } from './reverseCamelCase'
// import SingleSection from './SingleSection'

type Props = {
  closeModalFunction: () => void
  singleExecutive: ExecutiveDetailsType
}

const ExecutiveModalSummary = ({ closeModalFunction, singleExecutive }: Props) => {
  return (
    <aside
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center py-16'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1100',
      }}
    >
      <section className='bg-white min-w-[43.75rem]   w-full max-w-[66.25rem] min-h-[31.25rem] h-full  max-h-[55rem]  rounded-[.6875rem] py-6 px-[2.5rem] flex flex-col overflow-hidden'>
        <div>
          <div className='relative flex justify-between py-3 border-b'>
            <div className='font-bold text-[24px] leading-[29px] text-[#747373]'>Executive/Directors Details</div>
            <button onClick={closeModalFunction} type='button' className=''>
              <img src={Close} width={20} height={20} alt='close' />
            </button>
          </div>

          <div className='  h-[42.5rem] overflow-y-auto flex flex-col gap-4 pt-8 pb-16'>
            {Object.entries(singleExecutive).map((x: any, i: number) => {
              // console.log(x[1])
              return (
                <div key={i} className='flex gap-10'>
                  <div className='w-[300px] text-right text-[base] leading-[16px] font-medium'>{reverseCamelCase(x[0])}</div>
                  {/* <span>:</span> */}
                  <div className='text-[base] leading-[16px] font-normal'>
                    {typeof x[1] === 'string' ? <div>{x[1] || '-'}</div> : null}
                    {typeof x[1] === 'boolean' ? <div>{x[1] ? 'True' : 'False'}</div> : null}
                    {typeof x[1] === 'number' ? <div>{x[1]}</div> : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </aside>
  )
}

export default ExecutiveModalSummary
