import React, { memo, useEffect, useRef, useState } from 'react'
import { SearchIcon } from 'Assets/svgs/SearchIcon'
import { Select } from './Select'
import { useListenForOutsideClicks } from './../../hooks/useListenForOutsideClicks'
import { FormControlType, FormControlTypeWithSection } from './Types'

import { caret } from 'Assets/svgs'
import { formGetProperty } from './Form-UIs/formGetProperty'

type Props = {
  selected?: string
  placeholder?: string
  options: FormTypes['SelectOption'][]
  handleChange: (e: string) => void
  name: string
  loadingOptions?: boolean
  noOptionsMessage?: string
  checkIfItemIsState: any
  checkIfItemIsCity: any
  item: FormControlType | FormControlTypeWithSection
}

/**
 * A form field that combines a search input box and a dropdown menu,
 * allowing users to search and select an item from a list of options.
 *
 * @param props
 * @returns JSX.Element
 */
export const SearchDropdown = memo(
  ({ selected, placeholder, options, checkIfItemIsState, checkIfItemIsCity, item, handleChange, name, loadingOptions, noOptionsMessage }: Props) => {
    const [searchInput, setSearchInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const isDisabled = formGetProperty(item.formControlProperties, 'Disable') === 'true' ? true : false

    const clearSelected = () => {
      handleChange('')
    }

    const openDropdown = () => {
      checkIfItemIsState(item)
      checkIfItemIsCity()
      setIsOpen(true)
      if (selected) {
        // resume search from previously selected value
        setSearchInput(selected)
      }
      // clear previously selected value since it's a new search
      // handleChange({ label: '', value: '' }, name)
    }

    const handleSearchInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(ev.target.value)
    }

    const handleSelectDropdownChange = (e: FormTypes['SelectOption']) => {
      handleChange(e.value)
      setSearchInput(e.label)
      setIsOpen(false)
    }

    const dropdownRef = useRef(null)
    const [listening, setListening] = useState(false)
    useListenForOutsideClicks(listening, setListening, dropdownRef, setIsOpen)

    const clearSelectedIfSearchInputChanged = (selected) => {
      // if the search input was changed before closing, clear the selected value.
      if (searchInput !== selected && searchInput !== selected) {
        clearSelected()
      } else {
        setSearchInput(selected)
      }
    }

    useEffect(() => {
      setSearchInput(selected)
    }, [selected])
    return (
      <div
        role={'search'}
        className='w-full'
        onBlur={() => {
          clearSelectedIfSearchInputChanged(selected)
        }}
        ref={dropdownRef}
      >
        <div className='border-b border-solid cursor-text pb-[10px] flex items-center justify-between border-common-title' role='searchbox'>
          <div className='flex items-center w-full'>
            <SearchIcon className='h-4 text-[#000000aa] mr-3 cursor-pointer' />
            <input
              onFocus={openDropdown}
              onChange={handleSearchInputChange}
              type='text'
              value={searchInput}
              placeholder={placeholder}
              role='search'
              className='w-full text-sm text-text-secondary font-normal light-placeholder cursor-text'
              disabled={isDisabled}
            />
          </div>
          <img src={caret} width={15} height={10} className='cursor-pointer' onClick={openDropdown} />
        </div>
        <Select
          options={filterOptionsByValue(options, searchInput)}
          selected={{ label: selected, value: selected }}
          showBorder={true}
          setSelected={handleSelectDropdownChange}
          placeholder='Select'
          isOpen={isOpen}
          displayOnlyDropdown={true}
          name={name}
          emptyOptionsMessage={loadingOptions ? 'Loading' : noOptionsMessage || 'No search results'}
          isSearchDropdown={true}
          disabled={isDisabled}
        />
      </div>
    )
  }
)

export type FormTypes = {
  SelectOption: {
    label: string
    value: string
  }
}

const filterOptionsByValue = (options: FormTypes['SelectOption'][], filterValue: string) => {
  return options?.filter((item) => item.value.toLowerCase().startsWith(filterValue?.toLowerCase()))
}
