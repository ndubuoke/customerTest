import { SearchIcon } from "Assets/svgs/SearchIcon"

interface Props {
  type: string,
  className: string,
  placeholder: string
}
export const Search = ({ type, className, placeholder }: Props) => {
  return (
    <div className={`flex gap-x-2 w-full relative border-b-2 items-center`}>
      <SearchIcon />
      <input type={type} className={className} placeholder={placeholder} />
    </div>
  )
}

Search.defaultProps = {
  placeholder: "Search",
  type: "text",
  className: "w-full border-none outline-none"
}