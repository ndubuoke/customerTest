import { Fragment, useState, memo, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { caret } from 'Assets/svgs'
import { FormTypes } from './SearchDropdown'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  options: FormTypes['SelectOption'][]
  selected: FormTypes['SelectOption']
  showBorder?: boolean
  setSelected: (e: FormTypes['SelectOption'], name: string) => void
  placeholder?: string
  name: string

  isOpen?: boolean // programmatically open the dropdown.
  displayOnlyDropdown?: boolean // used when we only need the dropdown, e.g in a search dropdown field.

  emptyOptionsMessage?: string // what to display when the `options` is empty
  optionsLoadingMessage?: string // what to display when the `options` is loading

  disabled?: boolean
  isSearchDropdown?: boolean
}

const Select = ({
  options,
  selected,
  showBorder,
  placeholder,
  setSelected,
  isOpen,
  displayOnlyDropdown,
  name,
  emptyOptionsMessage,
  isSearchDropdown,
}: // disabled,
Props) => {
  // const handleChange = (value: FormTypes['SelectOption']) => {
  //   console.log('I was selecteddddd', value)
  //   setSelected(value, name)
  // }

  const displayedLabel = () => {
    if (selected && selected.label) {
      return selected.label.length > 35 ? `${selected.label.substring(0, 30)}...` : selected.label
    }
    return placeholder ? placeholder : ''
  }

  const displayedLabelClassName = () => {
    return `block min-h-full max-h-full max-w-full capitalize truncate ${selected.label ? 'text-text-tertiary' : 'text-text-title'}`
  }

  const listOptionClassName = (
    option: FormTypes['SelectOption'],
    index: number,
    { active, selected: isSelected }: { active: boolean; selected: boolean }
  ) => {
    isSelected ||= selected.value === option.value
    return classNames(
      active ? 'bg-background-selected-option' : 'text-gray-900',
      `relative cursor-default select-none py-2 pl-3 pr-9 ${options.length - 1 === index ? 'rounded-b-md' : ''}`,
      isSelected ? 'bg-background-selected-option' : '',
      'hover:bg-background-selected-option'
    )
  }

  const renderOptions = (options: FormTypes['SelectOption'][]) => {
    return options.length > 0 ? (
      options.map((option, index) => (
        <Listbox.Option
          key={option.value + index}
          className={({ active, selected }) => listOptionClassName(option, index, { active, selected })}
          value={option}
        >
          {({ selected: isSelected }) => {
            isSelected ||= selected.value === option.value
            return (
              <>
                <div className='flex items-center cursor-pointer'>
                  <span
                    title={option.label}
                    className={classNames(isSelected ? 'font-semibold ' : 'font-normal', 'block truncate text-sm text-text-tertiary')}
                  >
                    {option.label}
                  </span>
                </div>
              </>
            )
          }}
        </Listbox.Option>
      ))
    ) : (
      <div className='relative cursor-default select-none py-2 pl-3 pr-9'>
        <span className='font-normal block truncate text-sm text-text-tertiary'>{emptyOptionsMessage || 'No options here'}</span>
      </div>
    )
  }

  return (
    <Listbox
      value={selected}
      onChange={(ee) => {
        setSelected(ee, name)
      }}
      name={name}
    >
      {({ open }) => (
        <>
          <div className='relative grow'>
            {/* does not display the select panel if `displayOnlyDropdown` is true */}
            {!displayOnlyDropdown ? (
              <Listbox.Button
                className={`w-full min-h-full max-h-full h-full text-[.875rem] ${
                  showBorder ? 'border-b-[1px] border-solid border-b-text-tertiary' : ''
                } font-normal leading-[16px] pl-0 cursor-pointer tracking-[.0313rem]`}
              >
                <span className='flex items-center max-w-full min-h-[2rem] max-h-[2rem]'>
                  <span title={selected.label} className={displayedLabelClassName()}>
                    {displayedLabel()}
                  </span>
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <img src={caret} alt='' />
                </span>
              </Listbox.Button>
            ) : null}

            <Transition show={open || isOpen} as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
              <Listbox.Options
                className={`absolute z-[500] w-full overflow-auto rounded-b-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm smaller-scrollbar ${
                  isSearchDropdown ? 'max-h-40 ' : 'max-h-56 '
                }`}
              >
                {renderOptions(options)}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

const SelectMemo = memo(Select)

export { SelectMemo as Select }

export const optionizeList = (list: string[]): FormTypes['SelectOption'][] => {
  return list.map((item) => ({ label: item, value: item }))
}
