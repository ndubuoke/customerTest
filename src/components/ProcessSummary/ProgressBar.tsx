import React from 'react'
import { CancelIcon, ModifyIcon, ProcessStep, sterlingLogoProcess, SterlingStepperImg, SubmitIcon, processSummaryStatus } from 'Assets/svgs'
import { ProcessDoneStateIcon, ProcessPendingStateIcon } from 'Assets/images'
import { FormModeType, StatusType, TimelineType } from 'Screens/ProcessSummary'

type Props = {
  mode: FormModeType
  docWaiverRequest?: TimelineType
  submitted?: boolean
  docWaiverStatus: StatusType
  eddStatus: StatusType
  eddRequest: TimelineType
}
// mode
const ProgressBar = ({
  mode = 'creation',
  docWaiverRequest = 'hide',
  submitted = false,
  docWaiverStatus = 'not approved',
  eddStatus = 'not approved',
  eddRequest = 'show',
}: Props) => {
  if (mode === 'creation') {
    return (
      <section
        className={`mb-8  w-full  max-w-[839px] h-[108px] mx-auto rounded-[20px] border border-[#d2d2d2] bg-transparent flex flex-col justify-center items-center relative`}
      >
        <div className={`absolute bg-white border-none -top-3 left-7 px-2  `}>Processing Status</div>

        <div className='relative w-full max-w-[700px] h-fit flex justify-between'>
          <div
            className=' h-[10px] w-[85%] bg-[#d9d9d9] absolute top-[30%] left-0 right-0 mx-auto opacity-60'
            style={{
              transform: `translateY('-50% ') `,
              zIndex: 9,
            }}
          ></div>

          <ImageText text='Pending Submission' />
          {docWaiverRequest === 'show' ? (
            <div className={`z-10 ${docWaiverStatus === 'approved' ? 'opacity-100' : 'opacity-70'}`}>
              <ImageText text='Documentation Waiver Approval' />
            </div>
          ) : null}

          {eddRequest === 'show' ? (
            <div className={`z-10 ${eddStatus === 'approved' ? 'opacity-100' : 'opacity-70'}`}>
              <ImageText text='Enhanced Due Diligence Check' />
            </div>
          ) : null}

          <div className={`z-10 ${submitted ? 'opacity-100' : 'opacity-70'}`}>
            <ImageText text={mode === 'creation' ? 'Customer Creation Approval' : 'Pending Submission'} />
          </div>
        </div>
      </section>
    )
  }
  return (
    <div className={`my-8 relative ml-20 mb-5 h-[108px] w-[60%] rounded-[20px] border border-[#d2d2d2] flex justify-center items-center`}>
      <div className={`w-[80%] flex justify-center items-center`}>
        <div className={`absolute bg-white border-none -top-3 left-7`}>Processing Status:</div>
        <div className={`w-[90%] relative h-[50px]`}>
          <div className={`w-full m-auto absolute inset-0 bg-[#d9d9d9] h-[10px]`}></div>
          <img className={`absolute m-auto inset-y-0 left-0 w-[36px] rounded-full border-[2rem] border-blue-500`} src={sterlingLogoProcess} alt='' />
          <div className={`absolute m-auto -bottom-[30px] -left-[50px] h-[30px] `}>Pending Submission</div>
          <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />
          <div className={`absolute m-auto -bottom-[30px] text-center -right-[60px] w-[150px] h-[30px]`}>Approval</div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar

type ImageTextType = {
  text: 'Pending Submission' | 'Documentation Waiver Approval' | 'Customer Creation Approval' | 'Enhanced Due Diligence Check'
}
const ImageText = ({ text = 'Pending Submission' }: ImageTextType) => {
  return (
    <div className='flex flex-col items-center gap-2 bg-transparent'>
      <div className='z-10'>
        <img src={sterlingLogoProcess} alt={text} height={36} width={36} />
      </div>
      <p className='text-[12px] leading-[13px] text-[#636363] font-bold'>{text}</p>
    </div>
  )
}
