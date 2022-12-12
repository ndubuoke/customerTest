import React, { memo } from 'react'

type Props = {
  signatories?: Array<any>
  setSignatories?: (value: any) => void
  collapsed
}

const SignatoriesTable = memo(({ setSignatories, signatories = [], collapsed }: Props) => {
  return (
    <div className={`py-6 w-[987px] overflow-x-auto ${collapsed ? 'max-h-0 overflow-hidden hidden' : 'px-3'}  `}>
      <table className='w-full  '>
        <thead>
          <tr className='bg-white h-[60px]'>
            <th className=' align-middle font-bold text-[14px] text-[#aaaaaa]  w-[50px] '>
              <span className='px-3 border-l-2'>S/N</span>
            </th>
            <th className='align-middle  text-left  font-bold text-[14px] text-[#aaaaaa]  max-w-[484px]   w-[50%] min-w-[384px] '>
              <span className='px-3 border-l-2'>NAME</span>
            </th>
            <th className='  align-middle  text-left font-bold text-[14px] text-[#aaaaaa]   max-w-[255px]   w-[30%] min-w-[155px]'>
              <span className='px-3 border-l-2'>IDENTIFICATION</span>
            </th>
            <th className=' opacity-0  text-left w-[15%] min-w-[120px] '>Action</th>
          </tr>
        </thead>
        <tbody>
          {signatories.length < 1 ? (
            <tr className=' h-[40px]'>
              <td className=' align-middle font-bold text-[14px] text-[#aaaaaa]  opacity-0'>S/N</td>
              <td className=' align-middle font-bold text-[14px] text-[#aaaaaa] '>No Signatories</td>
              <td></td>
            </tr>
          ) : null}
          {signatories.length > 0
            ? signatories?.map((x, i) => {
                return <tr key={i}>There are signatories</tr>
              })
            : null}
        </tbody>
      </table>
    </div>
  )
})

export default SignatoriesTable
