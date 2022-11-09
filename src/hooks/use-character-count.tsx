import React, { useState } from 'react'

 const useCharacterCount = () => {
  const [characterCount, setCharacterCount] = useState(0)
  const characterLengthChangeHandler = (e) => {
    setCharacterCount(e.target.value.length)
  }
  return {
    characterLengthChangeHandler,
    characterCount,
  }
}


export default useCharacterCount