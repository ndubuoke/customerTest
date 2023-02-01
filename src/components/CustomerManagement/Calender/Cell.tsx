import React from 'react'
type CellProps = {
  className?: string
  onClick?: (e) => void
}

const Cell: React.FC<CellProps> = ({ className, children, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`h-[2.1875rem]  ease-in-out duration-300 'text-[#AAAAAA] cursor-pointer flex items-center justify-center hover:bg-[#F9E5E5] hover:text-[#CF2A2A] hover:font-bold  ${className}`}
      >
        {children}
      </div>
    </>
  )
}

export default Cell
