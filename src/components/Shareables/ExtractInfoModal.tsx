import { GreenCheckBig } from 'Assets/svgs/GreenCheckBig'
import Spinner from './Spinner'

const ExtractInfoModal = () => {
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center`}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` min-h-[190px] min-w-[280px] bg-white  rounded-xl `}>
        <div className=' w-full  min-h-[190px] flex flex-col items-center justify-center'>
          <Spinner size={'large'} />
          <p className='text-[#636363] text-md mt-4'>Extracting Information</p>
        </div>
      </div>
    </div>
  )
}

export default ExtractInfoModal
