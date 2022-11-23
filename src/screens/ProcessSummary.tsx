import { ProcessDoneStateIcon, ProcessPendingStateIcon } from 'Assets/images'
import { ProcessStep, SterlingStepperImg } from 'Assets/svgs'
import GoBack from 'Components/MainScreenLayout/GoBack'
import ActivityLog from 'Components/Shareables/ActivityLog'
import { individualCustomerCreationData, smeCustomerCreationData } from 'src/data/customerCreationBreadcrumbs'

type Props = {
  headerText: string
  customerType: 'individual' | 'sme'
}

const ProcessSummary = ({ headerText, customerType }: Props) => {
  return (
    <>
      <h2>PROCESS SUMMARY</h2>
      <nav>
        <GoBack headerText={headerText} breadCrumbsList={[]} />
      </nav>

      <main className={`bg-background-dash relative flex mx-auto py-[20px] font-roboto px-[30px] gap-x-[20px] h-screen`}>
        <section className={`w-[75%]`}>
          <div className={`rounded-lg text-[#636363]font-[Inter] w-full h-full bg-white`}>
            <div className='pt-10'>
              <div className={`relative ml-20 mb-20 h-[108px] w-[60%] rounded-[20px] border border-[#d2d2d2] flex justify-center items-center`}>
                <div className={`w-[80%] flex justify-center items-center`}>
                  <div className={`absolute bg-white border-none -top-3 left-7`}>Processing Status:</div>
                  <div className={`w-[90%] relative h-[50px]`}>
                    <div className={`w-full m-auto absolute inset-0 bg-[#d9d9d9] h-[10px]`}></div>
                    <img className={`absolute m-auto inset-y-0 left-0 w-[36px] rounded-full`} src={ProcessDoneStateIcon} alt='' />
                    <div className={`absolute m-auto -bottom-[30px] -left-[50px] h-[30px] `}>Pending Submission</div>
                    <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />
                    <div className={`absolute m-auto -bottom-[30px] text-center -right-[60px] w-[150px] h-[30px]`}>Approval</div>
                  </div>
                </div>
              </div>
              {/* <fieldset className='border px-10 py-8 mx-auto rounded-md'>
                <legend>Processing Status</legend>
                <section className='flex'>
                  <div>
                    <img src={SterlingStepperImg} alt='' />
                    <p>submitted</p>
                  </div>
                  <div className='flex border-b-4 border-[#D9D9D9] w-[100%] self-center max-h-[4px]'></div>
                  <div>
                    <img src={SterlingStepperImg} alt='' />
                    <p>rejected</p>
                  </div>
                </section>
              </fieldset> */}
            </div>
          </div>
        </section>
        <section className={`w-[25%]`}>
          <div
            className={`rounded-lg text-[#636363] text-[16px] leading-6 font-medium font-[Inter] tracking-wide w-full h-full bg-white pt-[25px] px-[20px overflow-y-auto`}
          >
            <ActivityLog />
          </div>
        </section>
      </main>
    </>
  )
}

export default ProcessSummary
