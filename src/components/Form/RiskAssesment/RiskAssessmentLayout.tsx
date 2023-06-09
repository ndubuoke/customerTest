import { useState, memo, useEffect, useMemo } from 'react'
import { dots, ExclaimateIcon } from 'Assets/svgs'
import React from 'react'
import { useSelector } from 'react-redux'
import { ReducersType } from 'Redux/store'
import { getProperty } from 'Utilities/getProperty'

import { FormStructureType as FormStructureType } from 'Components/types/FormStructure.types'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import DropDown from './Dropdown'

type Props = {
  title: string
  fields?: { title: string; key: string }[]
  parentKey: string
  assessmentData?: Record<string, string>
  standardRiskAssessmentData: any[]
  handleSelectedParameterOption: (parentKey: string, parameter: string, parameterOptionStatus: string) => void
  isCompleted: boolean
  isCollapsed?: boolean
}

const getText = (prefix = '', suffix = '') => {
  if (prefix.trim() && suffix.trim()) {
    return `${prefix} ${suffix}`
  } else if (prefix.trim() || suffix.trim()) {
    return prefix || suffix
  }
  return '-'
}

const RiskAssessmentLayout = memo(
  ({
    parentKey,
    title,
    fields = [],
    standardRiskAssessmentData = [],
    assessmentData = {},
    handleSelectedParameterOption,
    isCompleted,
    isCollapsed = true,
  }: Props) => {
    const [collapsed, setCollapsed] = useState<boolean>(isCollapsed)

    const handleCollapseSection = () => {
      setCollapsed((prev) => !prev)
    }

    console.log('collapsed', collapsed)

    return (
      <>
        <section className='max-w-[66.25rem] mx-4 mb-8'>
          <div
            className={`ControlUILayout  w-full  p-1 pr-3 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between
            {setRequiredFormFieldsRedux.} $
            `}
            style={{
              boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
              background: 'rgba(170, 170, 170, 0.07)',
              padding: '0.5rem 1rem',
              border: isCompleted === true ? '1px solid green' : isCompleted === false ? '1px solid red' : '',
              cursor: 'pointer',
              fontFamily: 'Inter',
            }}
            onClick={handleCollapseSection}
          >
            <div className='flex items-center'>
              <h6
                style={{
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                {title}
              </h6>
            </div>
            <div className={`border-2 cursor-pointer border-[#C22626] p-1  `}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className={`w-4 h-4  ${collapsed ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </div>
          </div>
          <div
            className={` ${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[12.5rem] border-l-2 border-[#C22626]'}  `}
            style={{
              color: '#636363',
              padding: `${collapsed ? '0' : '1.3rem 7rem 1rem 2.5rem'}`,
              background: 'rgb(250, 250, 250)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: '1.25rem',
                padding: '55px',
                paddingBottom: '0',
                paddingTop: '31px',
                background: '#fff',
                fontFamily: 'Inter',
              }}
            >
              {fields.map((field) => {
                return (
                  <div key={field.title}>
                    <h5
                      style={{
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '16px',
                        fontFamily: 'Inter',
                      }}
                    >
                      {field.title}
                    </h5>
                    {field.key === 'surname' ? (
                      <p
                        style={{
                          fontWeight: '400',
                          fontSize: '16px',
                          lineHeight: '18px',
                          marginTop: '0.3rem',
                        }}
                      >
                        {getText(assessmentData[field.key], assessmentData['firstName'])}
                      </p>
                    ) : field.key === 'stateOfOrigin' ? (
                      <p
                        style={{
                          fontWeight: '400',
                          fontSize: '16px',
                          lineHeight: '18px',
                          marginTop: '0.3rem',
                        }}
                      >
                        {getText(assessmentData[field.key], assessmentData['lGA'])}
                      </p>
                    ) : field.key === 'iDNumber' ? (
                      <p
                        style={{
                          fontWeight: '400',
                          fontSize: '16px',
                          lineHeight: '18px',
                          marginTop: '0.3rem',
                        }}
                      >
                        {getText(assessmentData['chooseAnID'], assessmentData[field.key] ? `[${assessmentData[field.key]}]` : '')}
                      </p>
                    ) : (
                      <p
                        style={{
                          fontWeight: '400',
                          fontSize: '16px',
                          lineHeight: '18px',
                          marginTop: '0.3rem',
                        }}
                      >
                        {getText(assessmentData[field.key])}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
            {/* TABLE */}
            <div>
              <table className='w-full ' style={{ fontFamily: 'Inter' }}>
                <thead>
                  <tr className='bg-white h-[60px]'>
                    <th className=' align-middle font-bold text-[14px] text-left text-[#aaaaaa]  w-[40%] '>
                      <span className='px-3 border-l-2'>PARAMETER</span>
                    </th>
                    <th className='  align-middle  text-left font-bold text-[14px] text-[#aaaaaa] min-w-[155px  max-w-[155px]   w-[20%] '>
                      <span className='px-2 border-l-2 '>IMPLIED WEIGHT</span>
                    </th>
                    <th className='  align-middle  text-left font-bold text-[14px] text-[#aaaaaa]   max-w-[255px]   w-[25%] min-w-[155px]'>
                      <span className='px-3 border-l-2'>STATUS</span>
                    </th>
                    <th className='  align-middle  text-left font-bold text-[14px] text-[#aaaaaa]   max-w-[255px]   w-[15%] min-w-[155px]'>
                      <span className='px-3 border-l-2'>SCORE</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {standardRiskAssessmentData.map((data) => (
                    <tr key={data.parameter} className=' align-middle font-medium text-[16px] text-[#636363] border-b h-[60px]  pl-3'>
                      <td className='pl-3'>{data.parameter}</td>
                      <td className='pl-3'>{data.impliedWeight}</td>

                      <td className='pl-3'>
                        <DropDown
                          defaultOption={data.selectedParameterOption.status}
                          options={data.parameterOptions.map((param) => {
                            return param.status
                          })}
                          getValue={(value) => handleSelectedParameterOption(parentKey, data.parameter, value)}
                        />
                        {/* <select
                          name='status'
                          value={data.selectedParameterOption.status}
                          onChange={(ev) => handleSelectedParameterOption(parentKey, data.parameter, ev.target.value)}
                          style={{
                            padding: '8px 0',
                            borderBottom: '1px solid #636363',
                            width: '100%',
                            background: 'transparent',
                          }}
                        >
                          {data.parameterOptions.map((param) => (
                            <option key={param.status} value={param.status}>
                              {param.status}
                            </option>
                          ))}
                        </select> */}
                      </td>
                      <td className='pl-3'>{data.selectedParameterOption.weight}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* watchlist section */}
        {/* <section className='max-w-[1060px] mx-4 bg-slate-50'>
        <div
          className={`ControlUILayout  w-full   px-3 py-1 gap-5   font-bold text-gray-500 text-sm text-center rounded-lg flex relative   justify-between border-[.625rem] border-[#FAFAFA]`}
          style={{
            boxShadow: '0rem 0rem .625rem rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className='flex items-center'>
            <h6>WatchList</h6>
          </div>
          <div className={`border-2 cursor-pointer border-[#C22626] p-1  `}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className={`w-4 h-4  ${collapsed ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </div>
        </div>

        <div className={`${collapsed ? 'max-h-0 overflow-hidden hidden' : 'min-h-[200px] border-l-3 border-[#C22626]'} py-6`}></div>
      </section> */}
      </>
    )
  }
)

export default RiskAssessmentLayout
