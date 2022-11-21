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
            <div className='p-20'>
              <fieldset className='border px-10 py-8 mx-auto rounded-md'>
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
              </fieldset>
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
