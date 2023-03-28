import { caret } from 'Assets/svgs'
import { ExecutiveDetailType } from 'Components/Form/Types/ExecutiveTypes'
import React, { useEffect, useState, useRef } from 'react'
import FieldLabel from './FieldLabel'
import { ReducersType } from 'Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { ResponseType } from 'Redux/reducers/FormManagement.reducers'
import {
  getCitiesAction,
  getCountriesAction,
  getStatesAction,
  unfilledRequiredSignatoryListAction,
  unfilledRequiredSignatoryListButtonAction,
  resetCitiesAction,
  resetStatesAction,
} from 'Redux/actions/FormManagement.actions'
import useOnClickOutside from '../../../../hooks/useClickOutside'

type Props = {
  required: 'on' | 'off'
  label: ExecutiveDetailType
  optionsField: Array<string>
  colspan?: number
  setSelectedDropdownItem: (val: string) => void
  selectedDropdownItem: string
}

const ExecutiveDropDown = ({ required, label, optionsField, colspan = 1, selectedDropdownItem, setSelectedDropdownItem }: Props) => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const [showLists, setShowLists] = useState<boolean>(false)
  const [options, setOptions] = useState(optionsField)

  const [countries, setCountries] = useState<Array<{ countryName: string; countryId: string }>>([])
  const [states, setStates] = useState<Array<{ stateName: string; stateId: string }>>([])

  const getCountriesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getCountries) as ResponseType
  const getStatesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getStates) as ResponseType
  const getCitiesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getCities) as ResponseType

  useEffect(() => {
    if (label.toLowerCase().includes('nationality')) {
      // if (!getCountriesRedux?.success) {
      dispatch(getCountriesAction() as any)
      // }
    }
  }, [])

  useEffect(() => {
    if (label.toLowerCase().includes('nationality')) {
      if (getCountriesRedux?.success) {
        console.log(getCountriesRedux)
        setOptions(getCountriesRedux?.serverResponse?.data?.map((x) => x?.countryName))
        setCountries(
          getCountriesRedux?.serverResponse?.data?.map((x) => {
            return { countryId: x?.countryId, countryName: x?.countryName }
          })
        )
        // console.log({ getCountriesRedux: getCountriesRedux?.serverResponse })
      }
    }
    if (
      (label.toLowerCase().includes('state') || label.toLowerCase().includes('lga')) &&
      !Object(getCountriesRedux.serverResponse).hasOwnProperty('data')
    ) {
      handleSelectedDropdownItem('')
    }
  }, [getCountriesRedux])

  const handleSelectedDropdownItem = (selectedItem: string) => {
    // setShowLists((prev) => !prev)
    setSelectedDropdownItem(selectedItem.trim())
  }

  const checkIfItemIsCountry = () => {
    dispatch(resetStatesAction() as any)
    dispatch(resetCitiesAction() as any)
    dispatch(getCountriesAction() as any)
  }

  const checkIfItemIsState = () => {
    const checkCountriesInStorage = sessionStorage.getItem('EXECUTIVES--country') ? JSON.parse(sessionStorage.getItem('EXECUTIVES--country')) : null

    if (checkCountriesInStorage) {
      dispatch(resetCitiesAction() as any)
      dispatch(getStatesAction(checkCountriesInStorage?.country?.countryId) as any)
    }
  }

  const checkIfItemIsCity = () => {
    const checkStatesInStorage = sessionStorage.getItem('EXECUTIVES--state') ? JSON.parse(sessionStorage.getItem('EXECUTIVES--state')) : null

    if (checkStatesInStorage) {
      dispatch(getCitiesAction(checkStatesInStorage?.state?.stateId) as any)
    }
  }

  useEffect(() => {
    if (label.toLowerCase().includes('state') && getStatesRedux) {
      if (getStatesRedux?.success) {
        setOptions(getStatesRedux?.serverResponse?.data?.map((x) => x?.stateName))
        setStates(
          getStatesRedux?.serverResponse?.data?.map((x) => {
            return { stateId: x?.stateId, stateName: x?.stateName }
          })
        )
      }
    }
    if (label.toLowerCase().includes('lga') && !Object(getStatesRedux.serverResponse).hasOwnProperty('data')) {
      handleSelectedDropdownItem('')
    }
  }, [getStatesRedux])

  useEffect(() => {
    if (label.toLowerCase().includes('lga') && getCitiesRedux) {
      if (getCitiesRedux?.success) {
        setOptions(getCitiesRedux?.serverResponse?.data?.map((x) => x?.lgaName))
      }
    }
  }, [getCitiesRedux])

  useOnClickOutside(ref, () => setShowLists(false))

  return (
    <div
      style={{
        gridColumn: `span ${colspan}`,
      }}
    >
      <div className='relative w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute top-0 text-xl text-red-500 -right-3'>*</div> : null}
        <FieldLabel text={label} colspan={colspan} id={label} />
      </div>

      <div className={`relative`}>
        <div
          className='flex items-center justify-between w-full gap-6 py-1 leading-6 border-b border-b-[#AAAAAA] cursor-pointer'
          onClick={() => {
            setShowLists((prev) => !prev)
            if (label.toLowerCase().includes('nationality')) {
              checkIfItemIsCountry()
            }
            if (label.toLowerCase().includes('state')) {
              checkIfItemIsState()
            }
            if (label.toLowerCase().includes('lga')) {
              checkIfItemIsCity()
            }
          }}
          title={selectedDropdownItem && selectedDropdownItem}
        >
          <div className='overflow-hidden'>
            {selectedDropdownItem ? (
              typeof selectedDropdownItem !== 'string' ? (
                [].concat(selectedDropdownItem).toString()
              ) : (
                selectedDropdownItem
              )
            ) : (
              <span className={`text-text-disabled`}>Select</span>
            )}
          </div>
          <span>
            <img src={caret} width={15} height={10} />
          </span>

          {showLists && (
            <div
              className='absolute z-50 flex flex-col w-full border rounded-lg top-8 bg-background-paper'
              style={{
                zIndex: 999,
              }}
            >
              {options?.length > 0
                ? options?.map((selected, index) => {
                    return (
                      <div
                        key={index}
                        className={`hover:bg-red-200 cursor-pointer px-3 py-2 capitalize ${selected === selectedDropdownItem ? 'bg-red-200' : ''} `}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectedDropdownItem(selected)
                          const country = countries?.find((x) => x.countryName === selected)
                          if (country) {
                            sessionStorage.setItem(`EXECUTIVES--country`, JSON.stringify({ selected, country }))
                          }
                          const state = states?.find((x) => x.stateName === selected)
                          if (state) {
                            sessionStorage.setItem(`EXECUTIVES--state`, JSON.stringify({ selected, state }))
                          }
                          setShowLists(false)
                        }}
                      >
                        {selected.trim()}
                      </div>
                    )
                  })
                : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExecutiveDropDown
