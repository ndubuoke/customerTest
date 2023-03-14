import React from 'react'

type Props = {
  text: string
  disabled: boolean
  onClick: () => void
}

const DraftButton = ({ text = 'Proceed', disabled, onClick }: Props) => {
  return (
    <button
      className={`font-bold leading-5   cursor-pointer h-full w-fit px-10 py-[0.4rem]   rounded-lg ${
        disabled ? 'cursor-not-allowed bg-button-background' : 'bg-[#fff]'
      }`}
      style={{
        border: '1px solid #D8DAE5',
        color: '#667085',
        fontWeight: '500',
        fontFamily: 'Inter',
        fontSize: '16px',
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default DraftButton
