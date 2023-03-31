import React from 'react'

type Props = {
  text: string
  disabled: boolean
  onClick: () => void
}

const Button = ({ text = 'Proceed', disabled, onClick }: Props) => {
  // console.log(text)

  return (
    <button
      className={`font-bold leading-5    cursor-pointer h-full w-fit px-10 py-[0.4rem]   rounded-lg ${
        disabled ? 'cursor-not-allowed ' : ` ${text === 'Previous' ? 'previous-btn' : 'bg-button-hover-background text-white'} `
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
