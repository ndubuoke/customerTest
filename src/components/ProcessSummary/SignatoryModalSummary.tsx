import { Close } from 'Assets/svgs'
import { SignatoryDetailsType } from 'Components/Form/Types/SignatoryTypes'
import React from 'react'
import { reverseCamelCase } from './reverseCamelCase'
// import SingleSection from './SingleSection'

type Props = {
  closeModalFunction: () => void
  singleSignatory: SignatoryDetailsType
}

const SignatoryModalSummary = ({ closeModalFunction, singleSignatory }: Props) => {
  return (
    <aside
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center py-16'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1100',
      }}
    >
      <section className='bg-white min-w-[700px]   w-full max-w-[1060px] min-h-[500px] h-full  max-h-[880px]  rounded-[11px] py-6 px-[40px] flex flex-col overflow-hidden'>
        <div>
          <div className='relative flex justify-between py-3 border-b'>
            <div className='font-bold text-[24px] leading-[29px] text-[#747373]'>Account Signatory Details</div>
            <button onClick={closeModalFunction} type='button' className=''>
              <img src={Close} width={20} height={20} alt='close' />
            </button>
          </div>

          <div className='  h-[680px] overflow-y-auto flex flex-col gap-4 pt-8 pb-16'>
            {Object.entries(singleSignatory).map((x: any, i: number) => {
              // console.log(x[1])
              return (
                <div key={i} className='flex gap-10'>
                  <div className='w-[300px] text-right text-[base] leading-[16px] font-medium'>{reverseCamelCase(x[0])}</div>
                  {/* <span>:</span> */}
                  <div className='text-[base] leading-[16px] font-normal'>
                    {x[0]?.toLowerCase().includes('upload') ? (x[1] ? 'Uploaded' : 'Not Uploaded') : x[1] ? x[1] : '-'}
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

export default SignatoryModalSummary
