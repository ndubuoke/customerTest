import { arrow, caret, chevron, Download, ellipse, Filter, greaterThan, Menu, Plus, redCaret, Refresh } from 'Assets/svgs'
import { QuickLinks } from 'Components/Shareables'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppRoutes } from '../routes'

type Props = {}

const options = ['Individual', 'SME']
const statusOptions = ['Initiated by me', 'Initiated by my team', 'Initiated system-wide', 'Sent to me', 'Sent to my team']

const Main = (props: Props) => {
  const navigate = useNavigate()
  const initialRef: any = null
  const statusListRef = useRef(initialRef)
  const [showLists, setShowLists] = useState(false)
  const [showStatusLists, setShowStatusLists] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [highLevelButtonId, setHighLevelButtonId] = useState(1)
  const [nextLevelButtonId, setNextLevelButtonId] = useState(1)
  const handleSelectForm = (list) => {
    if (list === 'Individual') {
      navigate(AppRoutes.individualCustomerCreationScreen)
    } else if (list === 'SME') {
      navigate(AppRoutes.SMECustomerCreationScreen)
    }
  }

  const statusSelectForm = (list) => {
    setSelectedStatus(list)
    setShowStatusLists(false)
  }
  const highLevelButtonHandler = (id) => {
    setHighLevelButtonId(id)
  }
  const nextLevelButtonHandler = (id) => {
    setNextLevelButtonId(id)
  }
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showStatusLists && statusListRef.current && !statusListRef.current.contains(e.target)) {
        setShowStatusLists(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showStatusLists])
  return (
    <div className='  flex flex-col  '>
      <div className=' flex w-[1000px] mt-10 pl-6    items-center'>
        <h1 className='text-[#636363] text-[38px]'>Customer Management</h1>
        <div className='ml-6 relative '>
          <button
            className='flex cursor-pointer  rounded-md justify-between px-2 items-center  bg-primay-main 
          py-1'
            onClick={() => setShowLists(true)}
          >
            <span>
              <img src={Plus} className='' />
            </span>
            <div>
              {/* {selectedList} */}
              <span className={`text-white`}>Create New Customer</span>
            </div>
          </button>
          {showLists && (
            <div className='absolute w-full top-0   bg-background-paper  flex flex-col z-20 border rounded-md'>
              {options?.map((list, index) => {
                return (
                  <div key={index} className='hover:bg-lists-background cursor-pointer px-3 py-2' onClick={handleSelectForm.bind(null, list)}>
                    {list}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className=' flex justify-between px-6 mt-10'>
        <div>
          <button
            className={` ${
              highLevelButtonId === 1 ? 'border-b border-b-primay-main font-bold text-[20px] text-black' : 'text-[14px] text-text-secondary'
            } `}
            onClick={highLevelButtonHandler.bind(null, 1)}
          >
            Individual Customers
          </button>
          <button
            className={` ${
              highLevelButtonId === 2 ? 'border-b border-b-primay-main font-bold text-[20px] text-black' : 'text-[14px] text-text-secondary'
            } ml-4`}
            onClick={highLevelButtonHandler.bind(null, 2)}
          >
            SMEs
          </button>
        </div>

        <div>
          <div className='relative w-[250px]'>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-500 '
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
              </svg>
            </div>
            <input
              type='search'
              className='block border-b-2   py-1 pl-10 w-full text-sm text-gray-900 border border-gray-300'
              placeholder='Search for Customer'
            />
          </div>
        </div>
      </div>
      <div className='border h-screen   bg-background-default  px-4 '>
        <div className='mt-5 flex'>
          <div className='w-[90%] flex flex-col    mr-4 '>
            <div className=' bg-white flex h-[130px] '>
              <div className='flex flex-col  border w-[18%]'>
                <button
                  className={`${
                    nextLevelButtonId === 1 ? 'bg-[#EFEFEF] font-bold' : ''
                  } flex items-center pl-[25%] relative h-[50%]     py-2 text-text-secondary `}
                  onClick={nextLevelButtonHandler.bind(null, 1)}
                >
                  {nextLevelButtonId === 1 && <img className='  absolute left-1' src={redCaret} />}
                  <span className=' '>All Customers</span>
                </button>
                <button
                  className={`${
                    nextLevelButtonId === 2 ? 'bg-[#EFEFEF] font-bold' : ''
                  } flex   items-center  pl-[25%] relative h-[50%]    py-2 text-text-secondary`}
                  onClick={nextLevelButtonHandler.bind(null, 2)}
                >
                  {nextLevelButtonId === 2 && <img className=' absolute left-1' src={redCaret} />}
                  <span className=' '>Requests</span>
                </button>
              </div>
              <div className=' w-full pl-[5%]  '>
                <div className=' flex flex-col h-full'>
                  <div className='flex justify-end mt-2 pr-4'>
                    <div className='relative  text-sm   '>
                      <button
                        className='flex cursor-pointer border border-[#D0D5DD]   rounded-md justify-between px-2 items-center
          py-1'
                        onClick={() => setShowStatusLists(!showStatusLists)}
                      >
                        <div>
                          <span className={`text-[#252C32]`}>{selectedStatus ? selectedStatus : 'Initiated by me'}</span>
                        </div>
                        <span>
                          <img src={chevron} className='' />
                        </span>
                      </button>
                      {showStatusLists && (
                        <div ref={statusListRef} className=' w-full  absolute z-20  bg-background-paper  flex flex-col  border rounded-md'>
                          {statusOptions?.map((status, index) => {
                            return (
                              <div
                                key={index}
                                className='hover:bg-lists-background cursor-pointer px-3 py-2 text-[#252C32]'
                                onClick={statusSelectForm.bind(null, status)}
                              >
                                {status}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=' '>
                    {nextLevelButtonId === 1 ? (
                      <div className=' flex gap-2 '>
                        <div className=' py-1 px-4 cursor-pointer rounded-md hover:bg-[#EFEFEF]'>
                          <span className='text-[14px] font-bold'>All</span>
                          <h3 className='font-bold text-[24px]'>187</h3>
                        </div>
                        <div className='border'></div>
                        <div className=' py-1 px-4 cursor-pointer rounded-md hover:bg-[#EFEFEF]'>
                          {' '}
                          <span className='text-[14px] text-[#2FB755]'>Active</span>
                          <h3 className='font-bold text-[24px]'>168</h3>
                        </div>
                        <div className='border'></div>

                        <div className=' py-1 px-4 cursor-pointer rounded-md hover:bg-[#EFEFEF]'>
                          <span className='text-[14px] text-[#AAAAAA]'>inactive</span>
                          <h3 className='font-bold text-[24px]'>15</h3>
                        </div>
                      </div>
                    ) : null}
                    {nextLevelButtonId === 2 ? (
                      <div className=' flex gap-2 '>
                        <div className=' py-1 px-4 cursor-pointer rounded-md hover:bg-[#EFEFEF]'>
                          <span className='text-[14px] font-bold'>All</span>
                          <h3 className='font-bold text-[24px]'>950</h3>
                        </div>
                        <div className='border'></div>
                        <div className=' py-1 px-4 cursor-pointer rounded-md hover:bg-[#EFEFEF]'>
                          {' '}
                          <span className='text-[14px] text-[#2FB755]'>Approved</span>
                          <h3 className='font-bold text-[24px]'>800</h3>
                        </div>
                        <div className='border'></div>

                        <div className=' py-1 px-4 cursor-pointer rounded-md hover:bg-[#EFEFEF]'>
                          <span className='text-[14px] text-[#3FA2F7]'>in-Review</span>
                          <h3 className='font-bold text-[24px]'>141</h3>
                        </div>
                        <div className='border'></div>

                        <div className=' py-1 px-4 cursor-pointer rounded-md hover:bg-[#EFEFEF]'>
                          <span className='text-[14px] text-[#D4A62F]'>interim Approval</span>
                          <h3 className='font-bold text-[24px]'>15</h3>
                        </div>
                        <div className='border'></div>

                        <div className=' py-1 px-4 cursor-pointer rounded-md hover:bg-[#EFEFEF]'>
                          <span className='text-[14px] text-[#CF2A2A]'>in-issue</span>
                          <h3 className='font-bold text-[24px]'>9</h3>
                        </div>
                        <div className='border'></div>

                        <div className=' py-1 px-4 cursor-pointer rounded-md hover:bg-[#EFEFEF]'>
                          <span className='text-[14px] text-[#AAAAAA]'>Draft</span>
                          <h3 className='font-bold text-[24px]'>15</h3>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className=' mt-6 bg-white'>
              <div className='flex justify-end gap-2 mt-2 mx-4'>
                <div className='relative w-[250px]'>
                  <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                    <svg
                      aria-hidden='true'
                      className='w-5 h-5 text-gray-500 '
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                    </svg>
                  </div>
                  <input
                    type='search'
                    className='block border-b-2  py-1 pl-10 w-full text-sm text-gray-900 border border-gray-300'
                    placeholder='Search by customer name or id'
                  />
                </div>
                <div className='border'></div>
                <div className='flex  justify-center items-center px-2 cursor-pointer'>
                  <img src={Refresh} />
                  <span className='text-sm text-[#636363]'>Refresh Table</span>
                </div>
                <div className='border'></div>
                <div className='flex  justify-center items-center px-2 cursor-pointer'>
                  <img src={Download} />
                  <span className='text-sm text-[#636363]'>Download</span>
                </div>
              </div>

              {/* Table */}

              <div className=' relative mt-[3%]  mx-4 overflow-auto max-h-[300px]  '>
                <table className='w-full text-sm text-left table-auto '>
                  <thead className='text-xs uppercase     '>
                    <tr className='  '>
                      <th className='py-3   text-common-title'>
                        <span className='border-l border-common-title px-2'>NAME/ID</span>
                      </th>
                      <th className='py-3    text-common-title'>
                        <span className='border-l border-common-title px-2'>Phone number</span>
                      </th>
                      <th className='py-3   text-common-title'>
                        <span className='border-l border-common-title px-2'> Email</span>
                      </th>
                      <th className='py-3 w-1/6    relative     text-common-title'>
                        <div className='border-l border-common-title px-2 '> State</div>
                        <img src={Filter} alt='' className='absolute right-0 top-[35%] mr-2' />
                      </th>
                      <th className='py-3   relative   text-common-title'>
                        <div className='border-l border-common-title px-2  '> updated on</div>
                        <img src={Filter} alt='' className='absolute right-14 top-[35%]' />
                      </th>
                    </tr>
                  </thead>
                  <tbody className=' '>
                    <tr className='bg-background-lightRed border-b text-text-secondary   '>
                      <th scope='row' className='py-2 px-2 flex flex-col font-medium  whitespace-nowrap '>
                        Temitope Yusuf Chukwuma
                        <span className='text-common-title'>20067754632</span>
                      </th>
                      <td className='py-2 px-2'>09012345678</td>
                      <td className='py-2 px-2'>temiyusuf@email.com</td>
                      <td className='py-2 px-2 text-[#1E0A3C]'>
                        <span className='bg-[#E5E5EA] p-1 rounded font-medium'>inActive</span>
                      </td>
                      <td className='py-2 pl-2 pr-4 relative flex items-center justify-between'>
                        22 Feb 2022, 10:22 AM
                        <img src={Menu} alt='' className='cursor-pointer' onClick={() => setShowStatusLists(!showStatusLists)} />
                        {showStatusLists && (
                          <div ref={statusListRef} className='   absolute z-20 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'>
                            {statusOptions?.map((status, index) => {
                              return (
                                <div
                                  key={index}
                                  className='hover:bg-lists-background cursor-pointer px-3 py-2 text-[#252C32]'
                                  onClick={statusSelectForm.bind(null, status)}
                                >
                                  {status}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr className='bg-background-lightRed border-b text-text-secondary'>
                      <th scope='row' className='py-2 px-2 flex flex-col font-medium whitespace-nowrap '>
                        Alex Andrea
                        <span className='text-common-title'>20067754632</span>
                      </th>
                      <td className='py-2 px-2'>09012345678</td>
                      <td className='py-2 px-2'>temiyusuf@email.com</td>
                      <td className='py-2 px-2 text-success-main'>
                        <span className='bg-[#D4F7DC] p-1 rounded font-medium'>Active</span>
                      </td>
                      <td className='py-2 px-2'>22 Feb 2022, 10:22 AM</td>
                      {/* <td className='py-2 px-2'>
                        {' '}
                        <img src={Menu} alt='' className='' />
                      </td> */}
                    </tr>
                    <tr className='bg-background-lightRed border-b text-text-secondary   '>
                      <th scope='row' className='py-2 px-2 flex flex-col font-medium  whitespace-nowrap '>
                        Temitope Yusuf Chukwuma
                        <span className='text-common-title'>20067754632</span>
                      </th>
                      <td className='py-2 px-2'>09012345678</td>
                      <td className='py-2 px-2'>temiyusuf@email.com</td>
                      <td className='py-2 px-2 text-success-main'>
                        <span className='bg-[#D4F7DC] p-1 rounded font-medium'>Active</span>
                      </td>

                      <td className='py-2 px-2'>22 Feb 2022, 10:22 AM</td>
                      {/* <td className='py-2 px-2'>
                        {' '}
                        <img src={Menu} alt='' className='' />
                      </td> */}
                    </tr>
                    <tr className='bg-background-lightRed border-b text-text-secondary   '>
                      <th scope='row' className='py-4 px-2 flex flex-col font-medium  whitespace-nowrap '>
                        Temitope Yusuf Chukwuma
                        <span className='text-common-title'>20067754632</span>
                      </th>
                      <td className='py-4 px-2'>09012345678</td>
                      <td className='py-4 px-2'>temiyusuf@email.com</td>
                      <td className='py-4 px-2 text-success-main'>
                        <span className='bg-[#D4F7DC] p-1 rounded font-medium'>Active</span>
                      </td>

                      <td className='py-4 px-2'>22 Feb 2022, 10:22 AM</td>
                      {/* <td className='py-4 px-2'>
                        {' '}
                        <img src={Menu} alt='' className='' />
                      </td> */}
                    </tr>
                    <tr className='bg-background-lightRed border-b text-text-secondary   '>
                      <th scope='row' className='py-4 px-2 flex flex-col font-medium  whitespace-nowrap '>
                        Temitope Yusuf Chukwuma
                        <span className='text-common-title'>20067754632</span>
                      </th>
                      <td className='py-4 px-2'>09012345678</td>
                      <td className='py-4 px-2'>temiyusuf@email.com</td>
                      <td className='py-4 px-2 text-success-main'>
                        <span className='bg-[#D4F7DC] p-1 rounded'>Active</span>
                      </td>
                      <td className='py-4 px-2'>22 Feb 2022, 10:22 AM</td>
                      {/* <td className='py-4 px-2'>
                        {' '}
                        <img src={Menu} alt='' className='' />
                      </td> */}
                    </tr>
                    <tr className='bg-background-lightRed border-b text-text-secondary   '>
                      <th scope='row' className='py-4 px-2 flex flex-col font-medium  whitespace-nowrap '>
                        Temitope Yusuf Chukwuma
                        <span className='text-common-title'>20067754632</span>
                      </th>
                      <td className='py-4 px-2'>09012345678</td>
                      <td className='py-4 px-2'>temiyusuf@email.com</td>
                      <td className='py-4 px-2 text-success-main'>
                        <span className='bg-[#D4F7DC] p-1 rounded'>Active</span>
                      </td>
                      <td className='py-4 px-2'>22 Feb 2022, 10:22 AM</td>
                      {/* <td className='py-4 px-2'>
                        {' '}
                        <img src={Menu} alt='' className='' />
                      </td> */}
                    </tr>
                    <tr className='bg-background-lightRed border-b text-text-secondary   '>
                      <th scope='row' className='py-4 px-2 flex flex-col font-medium  whitespace-nowrap '>
                        Temitope Yusuf Chukwuma
                        <span className='text-common-title'>20067754632</span>
                      </th>
                      <td className='py-4 px-2'>09012345678</td>
                      <td className='py-4 px-2'>temiyusuf@email.com</td>
                      <td className='py-4 px-2 text-success-main'>
                        <span className='bg-[#D4F7DC] p-1 rounded'>Active</span>
                      </td>
                      <td className='py-4 px-2'>22 Feb 2022, 10:22 AM</td>
                      {/* <td className='py-4 px-2'>
                        {' '}
                        <img src={Menu} alt='' className='' />
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='w-auto'>
            <QuickLinks
              links={[
                { urlName: 'Link1', url: '/customer360' },
                { urlName: 'Link2', url: '/customer360' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
