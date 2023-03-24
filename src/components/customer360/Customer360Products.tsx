import { caret, infoVector, redCaret } from 'Assets/svgs'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { customer360ProductTypeAction } from 'Redux/actions/Customer360ProductType.action'
import { customer360SingleProductAction } from 'Redux/actions/Customer360SingleProductAction'

type Props = {}

const accountType = [
  {
    account: 'savings tier1',
    id: 1234567890,
    date: 'assigned on : ',
  },
  {
    account: 'current tier 1',
    id: 1234567890,
    date: 'assigned on : ',
  },
  {
    account: '  savings for salary earners',
    id: 1234567890,
    date: 'assigned on : ',
  },
  {
    account: '  savings for salary earners',
    id: 1234567890,
    date: 'assigned on : ',
  },
  {
    account: '  savings for salary earners',
    id: 1234567890,
    date: 'assigned on : ',
  },
]

const daysOfTheWeek = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri', 'sat']

const date = new Date()

const day = daysOfTheWeek[date.getDay()]
const newDate = date.getDate()
const year = date.getFullYear()

const Customer360Products = (props: Props) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<string>('all')
  const [accountTypeState, setAccountTypestate] = useState([])
  // const scrollBarRef = useRef(null)

  const {
    loading: customer360ProductLoading,
    success: customer360ProductSuccess,
    serverResponse: customer360ProductData,
    serverError: customer360ProductError,
  } = useSelector((store: any) => store.customer360SingleProduct)

  const {
    loading: getProductByTypeLoading,
    success: getProductByTypeSuccess,
    serverResponse: getProductByTypeData,
    serverError: getProductByTypeError,
  } = useSelector((store: any) => store.customer360ProductType)

  useEffect(() => {
    dispatch(customer360SingleProductAction() as any)
  }, [])

  // useEffect(() => {
  // }, [activeTab])

  useEffect(() => {
    if (customer360ProductSuccess) {
      const data = customer360ProductData?.data?.products
      setAccountTypestate(data)
    }
  }, [customer360ProductSuccess])

  useEffect(() => {
    console.log({ activeTab: getProductByTypeData })
  }, [getProductByTypeSuccess])

  const handleTabClick = (type: any) => {
    setActiveTab(type)

    dispatch(customer360ProductTypeAction(activeTab) as any)
  }

  // useEffect(() => {
  //   setAccountTypestate(accountType)
  // }, [])

  // const handleNext = () => {
  //   let value = scrollBarRef.current
  //   value.scrollTo(200, 0)
  // }

  // const handleBackClick = () => {
  //   let value = scrollBarRef.current
  //   value.scrollTo(-100, 0)
  // }

  return (
    <div className=' min-w-[27.125rem] h-[26.875rem] shadow-lg mt-4 font-roboto rounded-[.25rem] bg-[#fff] '>
      <header className=' text-[#636363]  border-b border-[#cccccc] py-3 px-4 pl-[1.25rem] h-[3.375rem] '>
        <h6 className='text-base capitalize'>products</h6>
      </header>
      <nav className='mt-2 capitalize text-[#8F8F8F] cursor-pointer pl-[1.25rem] mb-[1.5rem]'>
        <ul className='flex gap-4'>
          <li className={`border-b-2  ${activeTab === 'all' ? 'border-[#CF2A2A] text-[#636363]' : null}`} onClick={() => handleTabClick('all')}>
            all
          </li>
          <li
            className={`border-b-2  ${activeTab === 'Deposit' ? 'border-[#CF2A2A] text-[#636363]' : null}`}
            onClick={() => handleTabClick('Deposit')}
          >
            deposit
          </li>
          <li className={`border-b-2  ${activeTab === 'Credit' ? 'border-[#CF2A2A] text-[#636363]' : null}`} onClick={() => handleTabClick('Credit')}>
            loan
          </li>
          <li
            className={`border-b-2  ${activeTab === 'Investment' ? 'border-[#CF2A2A] text-[#636363]' : null}`}
            onClick={() => handleTabClick('Investment')}
          >
            investment
          </li>
        </ul>
      </nav>
      {/* <div className=' flex justify-between my-10 '>
        <img src={caret} alt='caret' className='rotate-90' onClick={handleBackClick} />
        <img src={redCaret} alt='caret' onClick={handleNext} />
      </div> */}
      <div className=' overflow-y-auto w-full py-2 h-[18.9375rem]'>
        {/* {accountTypeState?.length > 0 &&
          accountTypeState?.map((account: any, index: any) => {
            console.log({ account: account })
            return (
              <div key={index} className=' text-[#636363] min-w-[6rem] border-b border-[#636363] pl-[1.25rem] mb-[1.5rem] pb-[.5rem]'>
                <p className='font-medium text-[1rem] text-[#636363] capitalize'>{account?.name}</p>
                <p>
                  ID: <span>{account?.product_id}</span>
                </p>
                <p className='text-[1rem] text-[#636363] capitalize'>
                  {account?.created_at} {newDate} {day} {year}
                </p>
              </div>
            )
          })} */}

        {accountTypeState.length
          ? accountTypeState?.map((data: any, index: any) => {
              return (
                <div key={index} className=' text-[#636363] min-w-[6rem] border-b border-[#636363] pl-[1.25rem] mb-[1.5rem] pb-[.5rem]'>
                  <p className='font-medium text-[1rem] text-[#636363] capitalize'>{data?.name}</p>
                  <p>
                    ID: <span>{data?.product_id}</span>
                  </p>
                  <p className='text-[1rem] text-[#636363] capitalize'>
                    {' '}
                    created at:
                    <span>
                      {' '}
                      {data?.created_at} {newDate} {day} {year}
                    </span>
                  </p>
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default Customer360Products
