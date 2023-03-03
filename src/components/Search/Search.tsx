import { SearchIcon } from 'Assets/svgs/SearchIcon'

interface Props {
  type: string
  className: string
  placeholder: string
  onClick: () => void
  onKeyUp: (e: any) => void
  onBlur: () => void
  onChange: (e: any) => void
  value: string
}
export const Search = ({ type, className, placeholder, onClick, onKeyUp, onBlur, onChange, value }: Props) => {
  return (
    <div className={`flex gap-x-2  w-full relative border-b-2 items-center`}>
      <button onClick={onClick}>
        <SearchIcon />
      </button>
      <input  onKeyUp={onKeyUp} value={value} onBlur={onBlur} onChange={onChange} type={type} className={className} placeholder={placeholder} />
    </div>
  )
}

Search.defaultProps = {
  placeholder: 'Search',
  type: 'text',
  className: 'w-full border-none outline-none p-2',
  onClick: undefined,
  onBlur: undefined,
  onKeyUp: undefined,
  onChange: undefined,
  value: '',
}
