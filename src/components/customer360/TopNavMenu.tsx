import MiniButton from 'Components/Shareables/MiniButton'
import { useNavigate, useParams } from 'react-router-dom'
import { sterlinCombinedLogo } from 'Assets/svgs'
import { customer360Text } from 'Assets/svgs'
import TopNavProfile from './TopNavProfile'
import TopMenuUserSummary from './TopMenuUserSummary'

type Props = {}

const TopNavMenu = (props: Props) => {
  const navigate = useNavigate()
  const { customerId } = useParams()

  const handleReachClick = (e: Event) => {
    console.log(e)
  }

  const assignProductHandler = ()=>{
    navigate(`/customer-management/product-assignment/${customerId}`)
 }

  return (
    <section>
      <div className='bg-[#fff] flex justify-between py-2 border-2 border-white'>
        <div className='flex items-center gap-[1.3125rem] '>
          <img src={sterlinCombinedLogo} alt='customer360 logo' />
          <img src={customer360Text} alt='customer360 text' className='text-[1rem]' />
        </div>
        <div className='flex gap-[1rem] '>
            <MiniButton text="Assign Product" onClick={assignProductHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" fill="none"><g filter="url(#a)">
                <circle cx="12.819" cy="13" r="8.182" fill="#636363"/></g><path stroke="#fff" d="M11.91 12.092H7.09v1h4.818v4.818h1v-4.818h4.819v-1h-4.819V7.273h-1v4.819Z"/><defs><filter id="a" width="24.364" height="24.363" x=".637" y=".818" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_30277_566449"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_30277_566449" result="shape"/></filter></defs>
              </svg>
            </MiniButton>
            <MiniButton text="Add Customer to Group" onClick={() => handleReachClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                <g clipPath="url(#a)"><path fill="#636363" d="M6.178 9.833c-1.125.035-2.046.48-2.76 1.334H2.02c-.57 0-1.048-.141-1.437-.422C.194 10.464 0 10.052 0 9.51 0 7.06.431 5.833 1.292 5.833c.042 0 .193.073.453.22.26.145.6.292 1.016.442.417.15.83.224 1.24.224.465 0 .927-.08 1.385-.24a4.587 4.587 0 0 0 .792 3.354Zm11.156 6.636c0 .833-.254 1.491-.76 1.974-.508.482-1.181.724-2.021.724H5.448c-.84 0-1.513-.242-2.02-.724-.507-.483-.76-1.14-.76-1.974 0-.368.011-.728.036-1.078.024-.351.073-.73.145-1.136a8.83 8.83 0 0 1 .276-1.13c.112-.347.26-.686.448-1.016.188-.33.403-.61.646-.843.243-.233.54-.419.89-.558.352-.139.739-.208 1.162-.208.07 0 .22.075.448.224.23.15.483.316.76.5.278.184.65.35 1.115.5.466.15.934.224 1.407.224.472 0 .94-.075 1.406-.224.465-.15.836-.316 1.114-.5l.76-.5c.23-.15.38-.224.449-.224.423 0 .81.07 1.161.208.35.14.648.325.89.558.244.232.46.514.647.843.187.33.336.669.447 1.016.112.347.204.724.276 1.13.073.406.122.785.146 1.136.025.35.037.71.037 1.078ZM6.667 3.167a2.57 2.57 0 0 1-.781 1.885A2.57 2.57 0 0 1 4 5.833a2.57 2.57 0 0 1-1.885-.78 2.57 2.57 0 0 1-.781-1.886c0-.736.26-1.365.781-1.886A2.57 2.57 0 0 1 4 .5c.737 0 1.365.26 1.886.781.52.521.781 1.15.781 1.886Zm7.334 4c0 1.104-.391 2.047-1.172 2.828A3.854 3.854 0 0 1 10 11.167a3.854 3.854 0 0 1-2.828-1.172A3.854 3.854 0 0 1 6 7.167c0-1.104.391-2.047 1.172-2.828a3.854 3.854 0 0 1 2.829-1.172c1.104 0 2.046.39 2.828 1.172A3.854 3.854 0 0 1 14 7.167Zm6 2.343c0 .542-.195.954-.584 1.235-.389.281-.868.422-1.437.422h-1.396c-.716-.854-1.636-1.299-2.76-1.334a4.587 4.587 0 0 0 .791-3.354c.458.16.92.24 1.385.24.41 0 .823-.075 1.24-.224.417-.15.755-.297 1.016-.443.26-.146.411-.219.453-.219.86 0 1.291 1.226 1.291 3.677Zm-1.334-6.343a2.57 2.57 0 0 1-.781 1.885A2.57 2.57 0 0 1 16 5.833a2.57 2.57 0 0 1-1.885-.78 2.569 2.569 0 0 1-.781-1.886c0-.736.26-1.365.781-1.886A2.57 2.57 0 0 1 16 .5c.737 0 1.365.26 1.886.781.52.521.781 1.15.781 1.886Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 .5h20v18.667H0z"/></clipPath></defs>
              </svg>
            </MiniButton>
            <MiniButton text="Open Support Ticket" onClick={() => handleReachClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" fill="none">
                <path fill="#636363" d="M8.5 0C3.81 0 0 3.81 0 8.5 0 13.19 3.81 17 8.5 17H9v3c4.86-2.34 8-7 8-11.5C17 3.81 13.19 0 8.5 0Zm1 14.5h-2v-2h2v2Zm0-3.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5Z"/>
              </svg>
            </MiniButton>
        </div>
      </div>
    </section>
  )
}

export default TopNavMenu
