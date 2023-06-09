import { infoVector } from 'Assets/svgs'
import id from 'date-fns/esm/locale/id/index.js'
import React from 'react'

const transactionData = [
  {
    title: 'cash deposit',
    figure: 3500,
  },
  {
    title: 'cash deposit',
    figure: 3700,
  },
  {
    title: 'bill payment',
    figure: 3500,
  },
  {
    title: 'cash deposit',
    figure: 3500,
  },
  {
    title: 'cash withdrawal',
    figure: 3500,
  },
]

type Props = {}

const Customer360RecentTransaction = (props: Props) => {
  const day = new Date().getDate()
  const month = new Date().getMonth().toString()
  const year = new Date().getFullYear()

  return (
    <div className='min-w-[27.125rem] h-[26.875rem] shadow-lg mt-4 font-roboto rounded-[.25rem] bg-[#fff]'>
      <header className='flex justify-between text-[#636363]  border-b border-[#cccccc] py-3 px-4'>
        <h6 className='text-base capitalize'>Recent transactions</h6>
        <div className='flex items-center gap-2 capitalize hover:text-[#636363] cursor-pointer'>
          <img src={infoVector} alt='information vector' /><span className='text-sm'>view more</span>
        </div>
      </header>

      <section className='p-4'>
        {transactionData.map((item, index) => {
          return (
            <div key={index} className='flex justify-between mb-2 gap-4 border-b border-[#eeeeee] py-2'>
              <aside className='text-[#636363] capitalize'>
                <p className={`font-medium text-[#636363]`}>{item?.title}</p>{' '}
                <p className='text-[.75rem]'>
                  {day} / {month} / {year}
                </p>
              </aside>{' '}
              <span className={`${item?.title === 'cash deposit' ? 'text-[#27AE60]' : item?.title === 'bill payment' ? 'text-[red]' : 'text-[red]'}`}>
                #{item?.figure}
              </span>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default Customer360RecentTransaction
