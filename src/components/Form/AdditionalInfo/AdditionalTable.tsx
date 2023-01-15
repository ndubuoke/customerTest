import { closeRed, editRed, eyeRed } from 'Assets/svgs'
import React, { memo } from 'react'
import { AdditionalDetailsType } from 'Components/Form/Types/AdditionalTypes'

type Props = {
  details?: Array<any>
  setDetails?: (value: any) => void
  collapsed?: boolean
  handleRemoveDetail?: (id: number | string) => void
  handleModify?: (id: number | string) => void
  viewAdditionalDetail?: boolean
  handleViewAdditionalDetail?: (id: number | string) => void
  summaryPage?: boolean
}

const AdditionalDetailsTable = memo(
  ({ setDetails, details = [], collapsed, handleModify, handleRemoveDetail, viewAdditionalDetail = false, handleViewAdditionalDetail }: Props) => {
    return (
      <div className={`py-6 w-[987px] overflow-x-auto ${collapsed ? 'max-h-0 overflow-hidden hidden' : 'px-3'}  `}>
        <table className='w-full '>
          <thead>
            <tr className='bg-white h-[60px]'>
              <th className=' align-middle font-bold text-[14px] text-[#aaaaaa]  w-[50px] '>
                <span className='px-3 border-l-2'>S/N</span>
              </th>
              {/* <th className='align-middle  text-left  font-bold text-[14px] text-[#aaaaaa]  max-w-[484px]   w-[50%] min-w-[384px] '>
                <span className='px-3 border-l-2'>BANK NAME</span>
              </th> */}
              <th className='  align-middle  text-left font-bold text-[14px] text-[#aaaaaa]   max-w-[255px]   w-[20%] min-w-[155px]'>
                <span className='px-3 border-l-2'>BANK NAME</span>
              </th>
              <th className='  align-middle  text-left font-bold text-[14px] text-[#aaaaaa]   max-w-[255px]   w-[20%] min-w-[155px]'>
                <span className='px-3 border-l-2'>ACCOUNT NUMBER</span>
              </th>
              <th className='  align-middle  text-left font-bold text-[14px] text-[#aaaaaa]   max-w-[255px]   w-[20%] min-w-[155px]'>
                <span className='px-3 border-l-2'>ACCOUNT STATUS</span>
              </th>
              <th className='  align-middle  text-left font-bold text-[14px] text-[#aaaaaa]   max-w-[255px]   w-[30%] min-w-[155px]'>
                <span className='px-3 border-l-2'></span>
              </th>

              <th className=' opacity-0  text-left w-[15%] min-w-[120px] '>Action</th>
            </tr>
          </thead>
          <tbody>
            {details.length < 1 ? (
              <tr className=' h-[40px]'>
                <td className=' align-middle font-bold text-[14px] text-[#aaaaaa]  opacity-0'>S/N</td>
                <td className=' align-middle font-bold text-[14px] text-[#aaaaaa] '>No Entries</td>
                <td></td>
              </tr>
            ) : null}
            {details.length > 0
              ? details?.map((x: AdditionalDetailsType, i) => {
                  return (
                    <tr key={i} className=' align-middle font-bold text-[16px] text-[#636363] border-b h-[60px] '>
                      <td>{i + 1}</td>
                      <td className=' align-middle font-bold text-[16px] text-[#636363] '>{x?.['Bank/Branch Name']}</td>
                      <td className=' align-middle font-bold text-[16px] text-[#636363] '>
                        <span className='block'>{x?.['Account Number']}</span>
                      </td>
                      <td className=' align-middle font-bold text-[16px] text-[#636363] '>
                        <span className='block'>{x?.['Account Status']}</span>
                      </td>
                      <td className=' align-middle font-bold text-[16px] text-[#636363] '></td>
                      <td>
                        {!viewAdditionalDetail ? (
                          <button type='button' className='p-2 mr-2 bg-white rounded shadow' onClick={() => handleModify(x?.id)}>
                            <img src={editRed} alt='modify' />
                          </button>
                        ) : null}
                        {!viewAdditionalDetail ? (
                          <button type='button' className='p-2 bg-white rounded shadow' onClick={() => handleRemoveDetail(x?.id)}>
                            <img src={closeRed} alt='remove' />
                          </button>
                        ) : null}
                        {viewAdditionalDetail ? (
                          <button type='button' className='p-2 bg-white rounded shadow' onClick={() => handleViewAdditionalDetail(x?.id)}>
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

export default AdditionalDetailsTable
