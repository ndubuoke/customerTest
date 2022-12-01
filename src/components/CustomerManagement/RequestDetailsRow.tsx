import { Edit, Eye, Menu, redDelete } from 'Assets/svgs'
import React from 'react'

type requestDetailsRowType = {
  request: {
    requestId: string
    requestTitle: string
    requestType: string
    initiator: string
    status: string
    updatedAt: string
    id: string
  }
  showRequestFunctionHandler: (e) => void
  requestId: number | string
  showRequestFunctionOptions: boolean
  requestFunctionListRef: any
  requestFunctionOptions: string[]
  requestFunctionHandler: (e, v) => void
  userRole: string
}

const RequestDetailsRow = ({
  request,
  showRequestFunctionHandler,
  requestId,
  showRequestFunctionOptions,
  requestFunctionListRef,
  requestFunctionOptions,
  requestFunctionHandler,
  userRole,
}: requestDetailsRowType) => {
  return (
    <>
      <tr key={request?.requestId} className='bg-background-lightRed border-b text-text-secondary   '>
        <td scope='row' className='py-2 px-2 truncate flex flex-col font-medium  whitespace-nowrap '>
          {request?.requestTitle}
        </td>
        <td className='py-2 px-2'>{request?.requestType}</td>
        <td className='py-2 px-2'>{request?.initiator}</td>
        <td className='py-2 px-2 text-[#1E0A3C] '>
          <span
            className={` ${request?.status === 'Approved' ? 'bg-[#D4F7DC] text-[#15692A]' : null} ${
              request.status === 'In-Review' ? 'bg-[#F0F5FF] text-[#0050C8]' : null
            }
          ${request.status === 'Pending' ? 'bg-[#F0F5FF] text-[#0050C8]' : null}
          ${request.status === 'Rejected' ? 'bg-[#FFD4D2] text-[#9F1F17]' : null}
                            ${request.status === 'In Issue' ? 'bg-[#FFD4D2] text-[#9F1F17]' : null}
                            ${request.status === 'Interim Approval' ? 'bg-[#FFF8CC] text-[#806B00]' : null}
                            ${request.status === 'Draft' ? 'bg-[#E5E5EA] text-[#1E0A3C]' : null}
                            p-1 rounded font-medium flex w-fit  gap-2`}
          >
            {request.status} <img src={Eye} alt='' />
          </span>
        </td>
        <td className='py-2 pl-2 pr-4 relative flex items-center justify-between'>
          {request?.updatedAt}
          {userRole === 'checker' && request?.status === 'Pending' && <button className='border p-2 shadow-md'>Review</button>}
          {userRole === 'checker' && request?.status === 'Approved' && <button className='border p-2 shadow-md'>View</button>}
          {userRole === 'checker' && request?.status === 'Rejected' && <button className='border p-2 shadow-md'>View</button>}
          {userRole === 'maker' && (
            <>
              <img src={Menu} alt='' className='cursor-pointer' onClick={showRequestFunctionHandler.bind(null, request?.id)} />
              {showRequestFunctionOptions && request.id === requestId && (
                <div ref={requestFunctionListRef} className='   absolute z-20 top-8 right-4   bg-background-paper  flex flex-col  border rounded-md'>
                  {requestFunctionOptions?.map((option, index) => {
                    if (request.status === 'Approved') {
                      if (option === 'View') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={Eye} />
                              View
                            </span>
                          </div>
                        )
                      }
                    }
                    if (request.status === 'In-Review') {
                      if (option === 'View') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={Eye} />
                              View
                            </span>
                          </div>
                        )
                      }
                      if (option === 'Withdraw & Delete Request') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={redDelete} />
                              Withdraw & Delete Request
                            </span>
                          </div>
                        )
                      }
                    }

                    if (request.status === 'In Issue') {
                      if (option === 'View') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={Eye} />
                              View
                            </span>
                          </div>
                        )
                      }
                      if (option === 'Modify') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={Edit} />
                              Modify
                            </span>
                          </div>
                        )
                      }
                      if (option === 'Delete Request') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-2 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={redDelete} />
                              Delete Request
                            </span>
                          </div>
                        )
                      }
                    }

                    if (request.status === 'Interim Approval') {
                      if (option === 'View') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={Eye} />
                              View
                            </span>
                          </div>
                        )
                      }
                      if (option === 'Regularize Documents') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={Edit} />
                              Regularize Documents
                            </span>
                          </div>
                        )
                      }
                    }
                    if (request.status === 'Draft') {
                      if (option === 'Continue Request') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-3 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={Edit} />
                              Continue Request
                            </span>
                          </div>
                        )
                      }
                      if (option === 'Delete Request') {
                        return (
                          <div
                            key={index}
                            className='hover:bg-lists-background cursor-pointer px-2 py-2 flex flex-col  w-[250px] text-[#636363]'
                            onClick={requestFunctionHandler.bind(null, { option, requestId: request.requestId })}
                          >
                            <span className='flex w-full  '>
                              {' '}
                              <img className='mr-2' src={redDelete} />
                              Delete Request
                            </span>
                          </div>
                        )
                      }
                    }
                  })}
                </div>
              )}
            </>
          )}
        </td>
      </tr>
    </>
  )
}

export default RequestDetailsRow
