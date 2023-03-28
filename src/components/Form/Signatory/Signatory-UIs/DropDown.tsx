import { caret } from 'Assets/svgs'
import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React, { useEffect, useState, useRef } from 'react'
import FieldLabel from './FieldLabel'
import { ReducersType } from 'Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { ResponseType, UnfilledRequiredSignatoryListReducerType } from 'Redux/reducers/FormManagement.reducers'
import {
  getCitiesAction,
  getCountriesAction,
  getStatesAction,
  unfilledRequiredSignatoryListAction,
  unfilledRequiredSignatoryListButtonAction,
  resetCitiesAction,
  resetStatesAction,
} from 'Redux/actions/FormManagement.actions'
import Spinner from 'Components/Shareables/Spinner'
import { camelize } from 'Utilities/convertStringToCamelCase'
import { replaceSpecialCharacters } from 'Utilities/replaceSpecialCharacters'
import useOnClickOutside from '../../../../hooks/useClickOutside'

type Props = {
  required: 'on' | 'off'
  text: string
  id: SignatoryDetailType
  _optionsField: Array<string>
  colspan?: number
  setSelectedDropdownItem: (value: any) => any
  selectedDropdownItem: string
}

// TODO: Handle states and LGAS

const SignatoryDropDown = ({ required, text, id, _optionsField, colspan = 1, selectedDropdownItem, setSelectedDropdownItem }: Props) => {
  const ref = useRef(null)
  useOnClickOutside(ref, () => setShowLists(false))
  const dispatch = useDispatch()

  const unfilledRequiredSignatoryList = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryList
  ) as UnfilledRequiredSignatoryListReducerType

  const unfilledRequiredSignatoryListButton = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryListButton
  ) as UnfilledRequiredSignatoryListReducerType

  const [showLists, setShowLists] = useState<boolean>(false)
  const [optionsField, setOptionsField] = useState<Array<string>>(_optionsField)

  useOnClickOutside(ref, () => setShowLists(false))
  // Save countries locally
  const [countries, setCountries] = useState<Array<{ countryName: string; countryId: string }>>([])
  const [states, setStates] = useState<Array<{ stateName: string; stateId: string }>>([])
  const [lgas, setLgas] = useState<Array<{ lgaName: string; lgaId: string }>>([])

  const getCountriesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getCountries) as ResponseType
  const getStatesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getStates) as ResponseType
  const getCitiesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getCities) as ResponseType

  // Get Countries list if it contains country in the field lable
  useEffect(() => {
    if (
      camelize(replaceSpecialCharacters(text)).toLowerCase().includes('country') ||
      camelize(replaceSpecialCharacters(text)).toLowerCase().includes('nationality') ||
      camelize(replaceSpecialCharacters(text)).toLowerCase().includes('ifyesspecify')
    ) {
      // if (!getCountriesRedux?.success) {
      dispatch(getCountriesAction() as any)
      // }
    }
  }, [])

  useEffect(() => {
    if (
      camelize(replaceSpecialCharacters(text)).toLowerCase().includes('country') ||
      camelize(replaceSpecialCharacters(text)).toLowerCase().includes('nationality') ||
      camelize(replaceSpecialCharacters(text)).toLowerCase().includes('ifyesspecify')
    ) {
      if (getCountriesRedux?.success) {
        console.log(getCountriesRedux)
        setOptionsField(getCountriesRedux?.serverResponse?.data?.map((x) => x?.countryName))
        setCountries(
          getCountriesRedux?.serverResponse?.data?.map((x) => {
            return { countryId: x?.countryId, countryName: x?.countryName }
          })
        )
        // console.log({ getCountriesRedux: getCountriesRedux?.serverResponse })
      }
    }
    if (
      (camelize(replaceSpecialCharacters(text)).toLowerCase().includes('state') ||
        camelize(replaceSpecialCharacters(text)).toLowerCase().includes('lga')) &&
      !Object(getCountriesRedux.serverResponse).hasOwnProperty('data')
    ) {
      handleSelectedDropdownItem('')
    }
  }, [getCountriesRedux])

  const handleSelectedDropdownItem = (selectedItem: string) => {
    console.log('selectedItem', selectedItem)
    // setShowLists((prev) => !prev)
    setSelectedDropdownItem((prev: any) => ({
      ...prev,
      // [text]: selectedItem.trim(),
      [camelize(replaceSpecialCharacters(text))]: selectedItem.trim(),
    }))
    handleRedispatchOfRequiredFields()
  }

  const handleRedispatchOfRequiredFields = () => {
    // console.log({ text, unfilledRequiredSignatoryList })
    const isPresentInRequiredList = unfilledRequiredSignatoryList?.list?.find((x) => x[0] === camelize(replaceSpecialCharacters(text)))

    if (isPresentInRequiredList) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryList?.list?.filter((x) => x?.[0] !== camelize(replaceSpecialCharacters(text)))
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListAction(newUnfilledRequiredFields) as any)
    }

    const isPresentInRequiredListButton = unfilledRequiredSignatoryListButton?.list?.find((x) => x[0] === camelize(replaceSpecialCharacters(text)))

    if (isPresentInRequiredListButton) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryListButton?.list?.filter((x) => x?.[0] !== camelize(replaceSpecialCharacters(text)))
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListButtonAction(newUnfilledRequiredFields) as any)
    }
  }

  const checkIfItemIsCountry = () => {
    dispatch(resetStatesAction() as any)
    dispatch(resetCitiesAction() as any)
    dispatch(getCountriesAction() as any)
  }
  const checkIfItemIsState = () => {
    const checkCountriesInStorage = sessionStorage.getItem('SIGNNATORIES--country')
      ? JSON.parse(sessionStorage.getItem('SIGNNATORIES--country'))
      : null

    if (checkCountriesInStorage) {
      dispatch(resetCitiesAction() as any)
      dispatch(getStatesAction(checkCountriesInStorage?.country?.countryId) as any)
    }
  }

  const checkIfItemIsCity = () => {
    const checkStatesInStorage = sessionStorage.getItem('SIGNNATORIES--state') ? JSON.parse(sessionStorage.getItem('SIGNNATORIES--state')) : null

    if (checkStatesInStorage) {
      dispatch(getCitiesAction(checkStatesInStorage?.state?.stateId) as any)
    }
  }
  // CHange this to state and not city
  useEffect(() => {
    if (camelize(replaceSpecialCharacters(text)).toLowerCase().includes('state') && getStatesRedux) {
      if (getStatesRedux?.success) {
        setOptionsField(getStatesRedux?.serverResponse?.data?.map((x) => x?.stateName))
        setStates(
          getStatesRedux?.serverResponse?.data?.map((x) => {
            return { stateId: x?.stateId, stateName: x?.stateName }
          })
        )
        // console.log({ getStatesRedux: getStatesRedux?.serverResponse })
      }
    }
    if (camelize(replaceSpecialCharacters(text)).toLowerCase().includes('lga') && !Object(getStatesRedux.serverResponse).hasOwnProperty('data')) {
      handleSelectedDropdownItem('')
    }
  }, [getStatesRedux])

  //This is city
  useEffect(() => {
    // console.log(first)
    if (camelize(replaceSpecialCharacters(text)).toLowerCase().includes('lga') && getCitiesRedux) {
      if (getCitiesRedux?.success) {
        setOptionsField(getCitiesRedux?.serverResponse?.data?.map((x) => x?.lgaName))
        setStates(
          getCitiesRedux?.serverResponse?.data?.map((x) => {
            return { lgaId: x?.lgaId, lgaName: x?.lgaName }
          })
        )
        // console.log({ getStatesRedux: getStatesRedux?.serverResponse })
      }
    }
  }, [getCitiesRedux])

  return (
    <div
      style={{
        gridColumn: `span ${colspan}`,
      }}
    >
      <div className='relative w-fit'>
        {required.toLowerCase() === 'on' ? <div className='absolute top-0 text-xl text-red-500 -right-3'>*</div> : null}
        <FieldLabel text={text} colspan={colspan} id={id} />
      </div>

      <div className={`relative`}>
        <div
          className='flex items-center justify-between w-full gap-6 py-1 pb-[.3125rem] leading-6 border-b border-b-[#AAAAAA]  cursor-pointer'
          onClick={() => {
            setShowLists((prev) => !prev)
            if (text.toLowerCase().includes('nationality')) {
              checkIfItemIsCountry()
            }
            if (text.toLowerCase().includes('state')) {
              checkIfItemIsState()
            }
            if (text.toLowerCase().includes('lga')) {
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
              ref={ref}
              className='absolute w-full top-8 bg-background-paper   flex flex-col z-50 border rounded-lg h-auto  max-h-[12rem] overflow-y-auto'
              style={{
                zIndex: 999,
              }}
            >
              {text.toLowerCase().includes('nationality') && getCountriesRedux?.loading ? (
                <div className='flex items-center justify-center w-full h-full'>
                  <Spinner size='large' />
                </div>
              ) : null}
              {text.toLowerCase().includes('state') && getStatesRedux?.loading ? (
                <div className='flex items-center justify-center w-full h-full'>
                  <Spinner size='large' />
                </div>
              ) : null}
              {text.toLowerCase().includes('lga') && getCitiesRedux?.loading ? (
                <div className='flex items-center justify-center w-full h-full'>
                  <Spinner size='large' />
                </div>
              ) : null}
              {optionsField?.length > 0
                ? optionsField?.map((selected, index) => {
                    return (
                      <div
                        key={index}
                        className={`hover:bg-red-200 cursor-pointer px-3 py-2 capitalize ${selected === selectedDropdownItem ? 'bg-red-200' : ''} `}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectedDropdownItem(selected)
                          // if (text.toLowerCase().includes('state')) {
                          const country = countries?.find((x) => x.countryName === selected)
                          if (country) {
                            sessionStorage.setItem(`SIGNNATORIES--country`, JSON.stringify({ selected, country }))
                          }
                          const state = states?.find((x) => x.stateName === selected)
                          if (state) {
                            sessionStorage.setItem(`SIGNNATORIES--state`, JSON.stringify({ selected, state }))
                          }
                          // }
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
      {required.toLowerCase() === 'on' ? (
        <p className='text-red-500'>{unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text.trim()) ? `${text} is required!` : null}</p>
      ) : null}
    </div>
  )
}

export default SignatoryDropDown
