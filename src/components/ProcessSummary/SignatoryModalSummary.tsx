import { Close } from 'Assets/svgs'
import React from 'react'

type Props = {
  closeModalFunction: () => void
}

const SignatoryModalSummary = ({ closeModalFunction }: Props) => {
  return (
    <aside
      className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center py-16'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '1100',
      }}
    >
      <section className='bg-white min-w-[700px]   w-full max-w-[1060px] min-h-[500px] h-full  max-h-[880px]  rounded-[11px] py-6 px-[40px] flex flex-col overflow-y-auto'>
        <div>
          <div className='relative flex justify-between py-3 border-b'>
            <div className='font-bold text-[24px] leading-[29px] text-[#747373]'>Signatory Details</div>
            <button onClick={closeModalFunction} type='button' className=''>
              <img src={Close} width={20} height={20} alt='close' />
            </button>
          </div>
        </div>
      </section>
    </aside>
  )
}

export default SignatoryModalSummary
