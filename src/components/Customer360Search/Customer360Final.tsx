import { customer360Text, profileAvatarSingle, sterlinCombinedLogo } from 'Assets/svgs'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { customer360SearchAction } from 'Redux/actions/Customer360.actions'

type Props = {}

const Customer360Final = (props: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [search, setSearch] = useState<string>('')
  // const [name, setName] = useState<string>('Temotope Yusuf Chukwuma')
  // const [id, setId] = useState<string>('1234567890')
  // const [bvn, setBvn] = useState<string>('1234567890')
  // const [phoneNumber, setPhoneNumber] = useState<string>('09012345678')
  // const [savingsTier1, setSavingsTier1] = useState<string>('3456278910')
  // const [currentTier1, setCurentTier1] = useState<string>('1234567819')
  // const [temDeposit, setTemDeposit] = useState<string>('1345678920')
  // const [curDeposit, setCurDeposit] = useState<string>('1315671890')
  const [customer360Data, setCustomer360Data] = useState([])
  const [searchResult, setSearchResult] = useState<Number>(customer360Data?.length)

  const {
    loading: customer360Loading,
    success: customer360Success,
    serverResponse: customerData,
    serverError: customer360Error,
  } = useSelector((store: any) => store.customer360Search)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    dispatch(customer360SearchAction(search) as any)
  }

  useEffect(() => {
    if (customerData) {
      setCustomer360Data(customerData?.data)
      const dataLength = customerData?.data?.length
      setSearchResult(dataLength)
      console.log(customer360Data)
    }
  }, [customer360Success])

  const NavigateToSingleUserScreen = (id) => {
    navigate(`/customer-management/customer-360/${id}`)
  }

  return (
    <div className='bg-white h-[80vh]  flex justify-center flex-col items-center'>
      {/* logo */}

      <div className='flex items-center gap-[1.3125rem] mb-[2.125rem] '>
        <img src={sterlinCombinedLogo} alt='customer360 logo' />
        <img src={customer360Text} alt='customer360 text' className='text-[1rem]' />
      </div>

      {/* logo end */}

      <form onSubmit={handleSubmit}>
        <div> {customer360Loading ? <span>Loading...</span> : null}</div>
        {/* <div> {customer360Success ? <span>{customer360Data?.name}</span> : null}</div> */}
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-[30.875rem] border-[.125rem] border-[rgba(207,42,42,0.22)] rounded-[.5rem] pl-3 cursor-pointer py-1 mb-[3rem]'
        />
      </form>

      {/* search result */}

      <section className='w-[77.625rem]   '>
        <p className='text-[#636363] text-[1rem] mb-[1.8125rem]'>Search result(s)</p>
        <div className='pl-[1rem] border-l border-b border-[rgba(170,170,170,0.79)] flex items-center gap-[2rem]  '>
          {/* image section */}

          {/* end of image section */}

          <div className='truncate overflow-y-auto '>
            {customer360Data?.length > 0
              ? customer360Data.map((data: any, index: any) => {
                  return data?.customer_profiles?.map((customerInfo: any, customerIndex: any) => {
                    return (
                      <div
                        key={customerIndex}
                        className='flex  flex-col mb-2 cursor-pointer'
                        onClick={() => NavigateToSingleUserScreen(data?.customerId)}
                      >
                        <div>
                          <p className='font-medium text-[#636363] mb-2'>{customerInfo?.firstName}</p>

                          <div className='flex gap-4'>
                            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
                              {' '}
                              <span className='font-bold'>ID :</span>
                              {customerInfo?.idNumber}
                            </span>
                            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
                              <span className='font-bold'>NIN :</span> {customerInfo?.nin}
                            </span>

                            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
                              {' '}
                              <span className='font-bold'>PHONE :</span>
                              {customerInfo?.mobileNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                })
              : null}
          </div>
          {/* <div className='truncate'>
            <p className='font-medium text-[#636363] mb-4'>name</p>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>ID</span>: id
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>BVN</span>: bvn
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>PHONE</span>: number
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>SAVINGS TIER 1</span>: savings
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>CURRENT TIER 1</span>: current
            </span>{' '}
            <span className='border-r border-[rgba(170,170,170,0.79)] px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>TEM DEPOSIT PD</span>: tempdeposit
            </span>{' '}
            <span className=' px-1 text-[.875rem] text-[#636363]'>
              <span className='font-bold'>CUR DEPOSIT</span>: curdeposit
            </span>{' '}
          </div> */}
        </div>
      </section>
      {/* end of result section */}

      <p className=' w-[77.625rem] mt-[11.75rem] text-end text-[#636363]'>
        {`${searchResult} result(s) found`}
      </p>
    </div>
  )
}

export default Customer360Final
