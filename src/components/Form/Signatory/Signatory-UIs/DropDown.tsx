import { caret } from 'Assets/svgs'
import { SignatoryDetailType } from 'Components/Form/Types/SignatoryTypes'
import React, { useEffect, useState } from 'react'
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
} from 'Redux/actions/FormManagement.actions'
import Spinner from 'Components/Shareables/Spinner'

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
  const dispatch = useDispatch()

  const unfilledRequiredSignatoryList = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryList
  ) as UnfilledRequiredSignatoryListReducerType

  const unfilledRequiredSignatoryListButton = useSelector<ReducersType>(
    (state) => state.unfilledRequiredSignatoryListButton
  ) as UnfilledRequiredSignatoryListReducerType

  const [showLists, setShowLists] = useState<boolean>(false)
  const [optionsField, setOptionsField] = useState<Array<string>>(_optionsField)

  // Save countries locally
  const [countries, setCountries] = useState<Array<{ countryName: string; countryId: string }>>([])
  const [states, setStates] = useState<Array<{ countryName: string; countryId: string }>>([])
  const [cities, setCities] = useState<Array<any>>([])

  const getCountriesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getCountries) as ResponseType
  const getStatesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getStates) as ResponseType
  const getCitiesRedux = useSelector<ReducersType>((state: ReducersType) => state?.getCities) as ResponseType

  // Get Countries list if it contains country in the field lable
  useEffect(() => {
    if (text.toLowerCase().includes('country') || text.toLowerCase().includes('nationality')) {
      // if (!getCountriesRedux?.success) {
      dispatch(getCountriesAction() as any)
      // }
    }
  }, [])

  useEffect(() => {
    if (text.toLowerCase().includes('country') || text.toLowerCase().includes('nationality')) {
      if (getCountriesRedux?.success) {
        setOptionsField(getCountriesRedux?.serverResponse?.data?.map((x) => x?.countryName))
        setCountries(
          getCountriesRedux?.serverResponse?.data?.map((x) => {
            return { countryId: x?.countryId, countryName: x?.countryName }
          })
        )
        // console.log({ getCountriesRedux: getCountriesRedux?.serverResponse })
      }
    }
  }, [getCountriesRedux])

  const handleSelectedDropdownItem = (selectedItem: string) => {
    setShowLists((prev) => !prev)
    setSelectedDropdownItem((prev: any) => ({
      ...prev,
      [text]: selectedItem.trim(),
    }))
    handleRedispatchOfRequiredFields()
  }

  const handleRedispatchOfRequiredFields = () => {
    // console.log({ text, unfilledRequiredSignatoryList })
    const isPresentInRequiredList = unfilledRequiredSignatoryList?.list?.find((x) => x[0] === text)

    if (isPresentInRequiredList) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryList?.list?.filter((x) => x?.[0] !== text)
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListAction(newUnfilledRequiredFields) as any)
    }

    const isPresentInRequiredListButton = unfilledRequiredSignatoryListButton?.list?.find((x) => x[0] === text)

    if (isPresentInRequiredListButton) {
      const newUnfilledRequiredFields = unfilledRequiredSignatoryListButton?.list?.filter((x) => x?.[0] !== text)
      // Dispatch the list of unfilled Required fields
      dispatch(unfilledRequiredSignatoryListButtonAction(newUnfilledRequiredFields) as any)
    }
  }

  const checkIfItemIsState = () => {
    const checkCountriesInStorage = sessionStorage.getItem('SIGNNATORIES--country')
      ? JSON.parse(sessionStorage.getItem('SIGNNATORIES--country'))
      : null

    if (checkCountriesInStorage) {
      dispatch(getStatesAction(checkCountriesInStorage?.country?.countryId) as any)
    }
  }

  const checkIfItemIsCity = () => {
    const checkCountriesInStorage = sessionStorage.getItem('SIGNNATORIES--country')
      ? JSON.parse(sessionStorage.getItem('SIGNNATORIES--country'))
      : null

    if (checkCountriesInStorage) {
      dispatch(getCitiesAction(checkCountriesInStorage?.country?.countryId) as any)
    }
  }
  // CHange this to state and not city
  useEffect(() => {
    if (text.toLowerCase().includes('state') && getStatesRedux) {
      if (getStatesRedux?.success) {
        setOptionsField(getStatesRedux?.serverResponse?.data?.map((x) => x?.cityName))
        setStates(
          getStatesRedux?.serverResponse?.data?.map((x) => {
            return { countryId: x?.countryId, countryName: x?.countryName, stateId: x?.cityId, stateName: x?.cityName }
          })
        )
        // console.log({ getStatesRedux: getStatesRedux?.serverResponse })
      }
    }
  }, [getStatesRedux])

  //This is city
  useEffect(() => {
    // console.log(first)
    if (text.toLowerCase().includes('city') && getCitiesRedux) {
      if (getCitiesRedux?.success) {
        setOptionsField(getCitiesRedux?.serverResponse?.data?.map((x) => x?.cityName))
        setStates(
          getCitiesRedux?.serverResponse?.data?.map((x) => {
            return { countryId: x?.countryId, countryName: x?.countryName, cityId: x?.cityId, cityName: x?.cityName }
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
        {required.toLowerCase() === 'on' ? <div className='absolute text-red-500 -right-3 top-0 text-xl'>*</div> : null}
        <FieldLabel text={text} colspan={colspan} id={id} />
      </div>

      <div className={`relative`}>
        <div
          className='flex items-center justify-between w-full gap-6 py-1 pb-[5px] leading-6 border-b border-b-[#AAAAAA]  cursor-pointer'
          onClick={() => {
            setShowLists((prev) => !prev)
            if (text.toLowerCase().includes('state')) {
              checkIfItemIsState()
            }
            if (text.toLowerCase().includes('city')) {
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
              className='absolute w-full top-8 bg-background-paper   flex flex-col z-50 border rounded-lg   h-[200px] overflow-y-auto'
              style={{
                zIndex: 999,
              }}
            >
              {text.toLowerCase().includes('country') && getCountriesRedux?.loading ? (
                <div className='h-full flex justify-center items-center w-full'>
                  <Spinner size='large' />
                </div>
              ) : null}
              {text.toLowerCase().includes('state') && getStatesRedux?.loading ? (
                <div className='h-full flex justify-center items-center w-full'>
                  <Spinner size='large' />
                </div>
              ) : null}
              {text.toLowerCase().includes('city') && getCitiesRedux?.loading ? (
                <div className='h-full flex justify-center items-center w-full'>
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
