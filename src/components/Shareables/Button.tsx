import React from 'react'

type Props = {
  text: string
  disabled: boolean
  onClick: () => void
}

const Button = ({ text = 'Proceed', disabled, onClick }: Props) => {
  return (
    <button
      className={`font-bold leading-5 text-white   cursor-pointer h-full w-fit px-10 py-[0.4rem]   rounded-lg ${
        disabled ? 'cursor-not-allowed ' : 'bg-button-hover-background'
      }`}
      style={{
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

// Button.defaultProps = {
//   text: "Proceed"
// }
export default Button
