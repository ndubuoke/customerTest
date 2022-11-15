import React from 'react'

type Props = {
  text: string
  disabled: boolean
  onClick: () => void
}

const Button = ({ text = 'Proceed', disabled = true, onClick }: Props) => {
  return (
    <button
      className={`font-bold leading-5 text-white bg-button-background  cursor-pointer h-full w-fit px-10 py-1   rounded-lg ${disabled ? 'cursor-not-allowed' : 'bg-button-hover-background'
        }`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
