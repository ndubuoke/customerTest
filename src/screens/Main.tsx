import { arrow, caret, chevron, Disable, Download, Edit, ellipse, Eye, Filter, greaterThan, Menu, Plus, redCaret, Refresh } from 'Assets/svgs'
import CustomerManagementTable from 'Components/CustomerManagement/CustomerManagementTable'
import DeactivationModal from 'Components/CustomerManagement/DeactivationModal'
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
  const customerFunctionListRef = useRef(initialRef)
  const filterStateOptionsRef = useRef(initialRef)
  const [showLists, setShowLists] = useState(false)
  const [customermanagementTableType, setCustomerManagementTableType] = useState('All Customers')
  const [showStatusLists, setShowStatusLists] = useState(false)
  const [showCustomerFunctionOptions, setShowCustomerFunctionOptions] = useState(false)
  const [ShowFilterStateOptions, setShowFilterStateOptions] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [highLevelButtonId, setHighLevelButtonId] = useState(1)
  const [nextLevelButtonId, setNextLevelButtonId] = useState(1)
  const [showDeactivationModal, setShowDeactivationModal] = useState(false)
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
    if (id === 1) {
      setCustomerManagementTableType('All Customers')
    }
    if (id === 2) {
      setCustomerManagementTableType('Requests')
    }
  }
  const setShowDeactivationModalHandler = (customerId) => {
    //  alert(customerId)
    setShowDeactivationModal(true)
  }
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showStatusLists && statusListRef.current && !statusListRef.current.contains(e.target)) {
        setShowStatusLists(false)
      }
      if (showCustomerFunctionOptions && customerFunctionListRef.current && !customerFunctionListRef.current.contains(e.target)) {
        setShowCustomerFunctionOptions(false)
      }
      if (ShowFilterStateOptions && filterStateOptionsRef.current && !filterStateOptionsRef.current.contains(e.target)) {
        setShowFilterStateOptions(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showStatusLists, showCustomerFunctionOptions, ShowFilterStateOptions])
  return (
    <>
      {showDeactivationModal && <DeactivationModal />}

      <div className='  flex flex-col  '>
        <div className=' flex w-[1000px] mt-10 pl-6 items-center'>
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

                <CustomerManagementTable
                  customerFunctionListRef={customerFunctionListRef}
                  showCustomerFunctionOptions={showCustomerFunctionOptions}
                  setShowCustomerFunctionOptions={setShowCustomerFunctionOptions}
                  tableType={customermanagementTableType}
                  filterStateOptionsRef={filterStateOptionsRef}
                  setShowFilterStateOptions={setShowFilterStateOptions}
                  ShowFilterStateOptions={ShowFilterStateOptions}
                  setShowDeactivationModal={setShowDeactivationModalHandler}
                />
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
    </>
  )
}

export default Main
