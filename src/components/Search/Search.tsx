import { SearchIcon } from "Assets/svgs/SearchIcon"

interface Props {
  type: string,
  className: string,
  placeholder: string,
  onClick: () => void,
  onKeyUp: (e: any) => void,
  onBlur: () => void,
  value: string
}
export const Search = ({ type, className, placeholder, value, onClick, onKeyUp, onBlur }: Props) => {
  return (
    <div className={`flex gap-x-2 w-full relative border-b-2 items-center`}>
      <button onClick={onClick}>
        <SearchIcon />
      </button>
      <input onKeyUp={onKeyUp} onBlur={onBlur} type={type} className={className} placeholder={placeholder} value={value} />
    </div>
  )
}

Search.defaultProps = {
  placeholder: "Search",
  type: "text",
  className: "w-full border-none outline-none",
  onClick: undefined,
  onBlur: undefined,
  onKeyUp: undefined,
  value: null
}