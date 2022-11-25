import { ProcessDoneStateIcon, ProcessPendingStateIcon } from 'Assets/images'
import { CancelIcon, ModifyIcon, ProcessStep, sterlingLogoProcess, SterlingStepperImg, SubmitIcon } from 'Assets/svgs'
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
          <div className={`relative rounded-lg text-[#636363] font-[Inter] w-full h-full  min:h-full max:h-full overflow-auto bg-white pt-20`}>
            <div className={`relative ml-20 mb-5 h-[108px] w-[60%] rounded-[20px] border border-[#d2d2d2] flex justify-center items-center`}>
              <div className={`w-[80%] flex justify-center items-center`}>
                <div className={`absolute bg-white border-none -top-3 left-7`}>Processing Status:</div>
                <div className={`w-[90%] relative h-[50px]`}>
                  <div className={`w-full m-auto absolute inset-0 bg-[#d9d9d9] h-[10px]`}></div>
                  <img className={`absolute m-auto inset-y-0 left-0 w-[36px] rounded-full`} src={sterlingLogoProcess} alt='' />
                  <div className={`absolute m-auto -bottom-[30px] -left-[50px] h-[30px] `}>Pending Submission</div>
                  <img className={`absolute m-auto inset-y-0 right-0 w-[36px] rounded-full`} src={ProcessPendingStateIcon} alt='' />
                  <div className={`absolute m-auto -bottom-[30px] text-center -right-[60px] w-[150px] h-[30px]`}>Approval</div>
                </div>
              </div>
            </div>
            <div className={`px-20 mt-5 max-h-[400px] overflow-auto`}>
              <div>
                <h3 className='text-[24px]'>Individual Customer Details</h3>
                <div>
                  <h5 className='ml-5 text-md'>Section-[Number]/page</h5>
                  <div className='flex'>
                    <div className='ml-20 text-right'>
                      <p className='text-sm mb-3'>title</p>
                      <p className='text-sm mb-3'>first name</p>
                      <p className='text-sm mb-3'>Mothers Maiden Name</p>
                      <p className='text-sm mb-3'>Other Names</p>
                    </div>
                    <div className='ml-[70px] '>
                      <p className='text-sm mb-3'>Mr</p>
                      <p className='text-sm mb-3'>Adeshina</p>
                      <p className='text-sm mb-3'>Oluwaseun</p>
                      <p className='text-sm mb-3'>Oluwakemi</p>
                    </div>
                  </div>
                </div>
                {/* each section or page and we will map through */}
                <div>
                  <h5 className='ml-5 text-md'>Account Information</h5>
                  <div className='flex'>
                    <div className='ml-20 text-right'>
                      <p className='text-sm mb-3'>title</p>
                      <p className='text-sm mb-3'>first name</p>
                      <p className='text-sm mb-3'>Mothers Maiden Name</p>
                      <p className='text-sm mb-3'>Other Names</p>
                    </div>
                    <div className='ml-[70px] '>
                      <p className='text-sm mb-3'>Mr</p>
                      <p className='text-sm mb-3'>Adeshina</p>
                      <p className='text-sm mb-3'>Oluwaseun</p>
                      <p className='text-sm mb-3'>Oluwakemi</p>
                    </div>
                  </div>
                </div>
                {/*end of each section */}
                {/* each section or page and we will map through */}
                <div>
                  <h5 className='ml-5 text-md'>Documentation</h5>
                  <div className='flex'>
                    <div className='ml-20 text-right'>
                      <p className='text-sm mb-3'>title</p>
                      <p className='text-sm mb-3'>first name</p>
                      <p className='text-sm mb-3'>Mothers Maiden Name</p>
                      <p className='text-sm mb-3'>Other Names</p>
                    </div>
                    <div className='ml-[70px] '>
                      <p className='text-sm mb-3'>Mr</p>
                      <p className='text-sm mb-3'>Adeshina</p>
                      <p className='text-sm mb-3'>Oluwaseun</p>
                      <p className='text-sm mb-3'>Oluwakemi</p>
                    </div>
                  </div>
                </div>
                {/*end of each section */}
              </div>
            </div>

            <div
              className={`bg-white absolute m-auto bottom-2 right-2 min-w-[300px] min-h-[64px] flex justify-evenly items-center rounded-lg shadow-md`}
            >
              <button className={`flex flex-col justify-center items-center`}>
                <ModifyIcon />
                <p className='text-sm'>Modify</p>
              </button>
              <button className={`flex flex-col justify-center items-center`}>
                <CancelIcon />
                <p className='text-sm'>Cancel</p>
              </button>
              <button className={`flex flex-col justify-center items-center`}>
                <SubmitIcon />
                <p className='text-sm'>
                  Request for waiver <br /> & submit form
                </p>
              </button>
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
