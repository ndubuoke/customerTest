import React, { memo, useEffect, useRef, useState } from 'react'
import { SearchIcon } from 'Assets/svgs/SearchIcon'
import { Select } from './Select'
import { useListenForOutsideClicks } from './../../hooks/useListenForOutsideClicks'
import { caret } from 'Assets/svgs'

type Props = {
  selected?: string
  placeholder?: string
  options: FormTypes['SelectOption'][]
  handleChange: (e: string) => void
  name: string
}

/**
 * A form field that combines a search input box and a dropdown menu,
 * allowing users to search and select an item from a list of options.
 *
 * @param props
 * @returns JSX.Element
 */
export const SearchDropdown = memo(({ selected, placeholder, options, handleChange, name }: Props) => {
  const [searchInput, setSearchInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const clearSelected = () => {
    handleChange('')
  }

  const openDropdown = () => {
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
      console.log('it is cleared')

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
      {console.log('selected ampmnn', selected)}
      <div className='border-b border-solid pb-[10px] flex items-center justify-between border-common-title' role='searchbox'>
        <div className='flex items-center'>
          <SearchIcon className='h-4 text-[#000000aa] mr-3' />
          <input
            // onBlur={closeDropdown}
            onFocus={openDropdown}
            onChange={handleSearchInputChange}
            type='text'
            value={searchInput}
            placeholder={placeholder}
            role='search'
            className='w-full text-sm text-text-secondary font-normal light-placeholder'
          />
        </div>
        <img src={caret} width={15} height={10} />
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
        emptyOptionsMessage='No search results'
        isSearchDropdown={true}
      />
    </div>
  )
})

export type FormTypes = {
  SelectOption: {
    label: string
    value: string
  }
}

const filterOptionsByValue = (options: FormTypes['SelectOption'][], filterValue: string) => {
  return options?.filter((item) => item.value.toLowerCase().startsWith(filterValue?.toLowerCase()))
}
