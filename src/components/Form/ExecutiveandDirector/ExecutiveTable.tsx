import { closeRed, editRed, eyeRed } from 'Assets/svgs'
import React, { memo } from 'react'
import { ExecutiveDetailsType } from '../Types/ExecutiveTypes'

type Props = {
  executives?: Array<any>
  setExecutives?: (value: any) => void
  collapsed?: boolean
  handleRemoveExecutive?: (id: number | string) => void
  handleModify?: (id: number | string) => void
  viewExecutive?: boolean
  handleViewExecutive?: (id: number | string) => void
  summaryPage?: boolean
}

const ExecutivesTable = memo(
  ({ setExecutives, executives = [], collapsed, handleModify, handleRemoveExecutive, viewExecutive = false, handleViewExecutive }: Props) => {
    return (
      <div className={`py-6 w-[987px] overflow-x-auto ${collapsed ? 'max-h-0 overflow-hidden hidden' : 'px-3'}  `}>
        <table className='w-full '>
          <thead>
            <tr className='bg-white h-[3.75rem]'>
              <th className=' align-middle font-bold text-[.875rem] text-[#aaaaaa]  w-[3.125rem] '>
                <span className='px-3 border-l-2'>S/N</span>
              </th>
              <th className='align-middle  text-left  font-bold text-[.875rem] text-[#aaaaaa]  max-w-[30.25rem]   w-[50%] min-w-[24rem] '>
                <span className='px-3 border-l-2'>NAME</span>
              </th>
              <th className='  align-middle  text-left font-bold text-[.875rem] text-[#aaaaaa]   max-w-[15.9375rem]   w-[30%] min-w-[9.6875rem]'>
                <span className='px-3 border-l-2'>IDENTIFICATION</span>
              </th>
              <th className=' opacity-0  text-left w-[15%] min-w-[7.5rem] '>Action</th>
            </tr>
          </thead>
          <tbody>
            {executives.length < 1 ? (
              <tr className=' h-[2.5rem]'>
                <td className=' align-middle font-bold text-[.875rem] text-[#aaaaaa]  opacity-0'>S/N</td>
                <td className=' align-middle font-bold text-[.875rem] text-[#aaaaaa] '>No Executives/Directors</td>
                <td></td>
              </tr>
            ) : null}
            {executives.length > 0
              ? executives?.map((x: ExecutiveDetailsType, i) => {
                  return (
                    <tr key={i} className=' align-middle font-bold text-[1rem] text-[#636363] border-b h-[3.75rem] '>
                      <td>{i + 1}</td>
                      <td className=' align-middle font-bold text-[1rem] text-[#636363] '>
                        {x?.['Enter FirstName']} {x?.['Enter Surname']}
                      </td>
                      <td className=' align-middle font-bold text-[1rem] text-[#636363] '>
                        <span className='block'>{x?.['Means of Identification']}</span>

                        <span className='block text-[#aaaaaa] '>{x?.['Enter ID Number']}</span>
                      </td>
                      <td>
                        {!viewExecutive ? (
                          <button type='button' className='p-2 mr-2 bg-white rounded shadow' onClick={() => handleModify(x?.id)}>
                            <img src={editRed} alt='modify' />
                          </button>
                        ) : null}
                        {!viewExecutive ? (
                          <button type='button' className='p-2 bg-white rounded shadow' onClick={() => handleRemoveExecutive(x?.id)}>
                            <img src={closeRed} alt='remove' />
                          </button>
                        ) : null}
                        {viewExecutive ? (
                          <button type='button' className='p-2 bg-white rounded shadow' onClick={() => handleViewExecutive(x?.id)}>
                            <img src={eyeRed} alt='view' />
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
      </div>
    )
  }
)

export default ExecutivesTable
