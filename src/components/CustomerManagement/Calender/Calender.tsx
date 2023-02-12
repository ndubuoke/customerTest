import Button from 'Components/Shareables/Button'
import {
  add,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getDay,
  setDate,
  startOfMonth,
  sub,
  subDays,
  subMonths,
} from 'date-fns'
import React, { useEffect, useState } from 'react'
import Cell from './Cell'

const daysOfTheWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
type dateActionsType = 'All Time' | 'Last 7 days' | 'Last 14 days' | 'Last 30 days' | 'Last 3 months' | 'Last 12 months' | 'Select Time' | 'Custom'
const dateActions = ['All Time', 'Last 7 days', 'Last 14 days', 'Last 30 days', 'Last 3 months', 'Last 12 months', 'Select Time', 'Custom']
type dateFilterType = 'day' | 'month'
type CalenderProps = {
  value?: Date
  onChange?: (value: Date) => void
  calenderRef: any
  dispatchDateFilterHandler: (e, v, y) => void
  tableType: string
}

const Calender: React.FC<CalenderProps> = ({ tableType, value = new Date(), onChange, calenderRef, dispatchDateFilterHandler }) => {
  const [lastSevenDays, setLastSevenDays] = useState([])
  // const [numberOfDays, setNumberOfDays] = useState(0)
  const startDate = startOfMonth(value)
  const endDate = endOfMonth(value)

  const numDays = differenceInDays(endDate, startDate) + 1
  // console.log(getDate(value))
  const prefixDays = startDate.getDay()
  const suffixDays = 6 - endDate.getDay()

  const preMonth = () => onChange(sub(value, { months: 1 }))
  const nextMonth = () => onChange(add(value, { months: 1 }))
  const selectedDay = getDate(value)

  const handleClickDate = (index: number) => {
    const date = setDate(value, index)
    onChange(date)
  }

  const dateFunctionHandler = (func: dateActionsType) => {
    if (func === 'Last 7 days') {
      let seventhDayFromToday = sub(value, { days: 7 })
      let lastSevenDaysDates: any = eachDayOfInterval({
        start: seventhDayFromToday,
        end: value,
      })

      lastSevenDaysDates = lastSevenDaysDates.map((day) => {
        return getDate(day)
      })
      setLastSevenDays(lastSevenDaysDates)

       dispatchDateFilterHandler('day', 7, tableType)
    }
    if (func === 'Last 14 days') {
      dispatchDateFilterHandler('day', 14, tableType)
    }
    if (func === 'Last 30 days') {
      dispatchDateFilterHandler('day', 30, tableType)
    }
    if (func === 'Last 3 months') {
      dispatchDateFilterHandler('month', 3, tableType)
    }

    if (func === 'Last 12 months') {
      dispatchDateFilterHandler('month', 12, tableType)
    }
    if (func === 'All Time') {
      dispatchDateFilterHandler('', 0, tableType)
    }
  }

  // useEffect(()=>{
  //   setNumberOfDays(numDays)
  // },[])

  // console.log(numberOfDays)

  return (
    <div
      ref={calenderRef}
      className='w-[27rem] drop-shadow-md h-[21.875rem] border border-line-faint-background  bg-background-paper right-4  absolute z-50 top-8 '
    >
      <div className='grid grid-cols-3 mt-2 mr-2'>
        <div className=' h-full  pt-2  grid grid-cols-1'>
          {dateActions.map((func) => (
            <span
              onClick={dateFunctionHandler.bind(null, func)}
              key={func}
              className='pl-4 normal-case cursor-pointer flex items-center  hover:bg-[#F9E5E5]'
            >
              {func}
            </span>
          ))}
        </div>
        <div className='grid grid-cols-7 col-span-2 items-center justify-center  text-center  '>
          <Cell className='border' onClick={preMonth}>
            {/* {'<'} */}
            <svg width='18' height='14' viewBox='0 0 18 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M17 7H1M1 7L7 1M1 7L7 13' stroke='#636363' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </Cell>
          <Cell>{''}</Cell>
          <span className='col-span-3 text-[#636363] normal-case font-bold'>{format(value, 'LLLL yyyy')}</span>
          <Cell>{''}</Cell>
          <Cell className='border' onClick={nextMonth}>
            {/* {'>'} */}
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='#636363' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
            </svg>
          </Cell>
          {daysOfTheWeek.map((day, index) => (
            <span key={index} className='text-xs mt-6 h-[2.1875rem] text-[#AAAAAA]  flex items-center justify-center'>
              {day}
            </span>
          ))}

          {Array.from({ length: prefixDays }).map((_, i) => (
            <Cell key={i}></Cell>
          ))}

          {Array.from({ length: numDays }).map((_, index) => {
            const date = index + 1


            return (
              <Cell
                onClick={handleClickDate.bind(null, date)}
                 className={`${lastSevenDays.includes(date) ? 'bg-[#F9E5E5] text-[#CF2A2A] font-bold':""}`}
                key={date}
              >
                {date}
              </Cell>
            )
          })}
          {Array.from({ length: suffixDays }).map((_, i) => (
            <Cell key={i}></Cell>
          ))}
          <div className='mt-4 col-end-6 '>
            <button
              className={`font-bold   text-white bg-[#DC5A5D]  cursor-pointer h-full w-fit px-10 py-1   rounded `}
              // onClick={}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calender
