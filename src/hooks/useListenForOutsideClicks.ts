import { Dispatch, SetStateAction, useEffect } from 'react'

export const useListenForOutsideClicks = (listening: boolean, setListening: Dispatch<SetStateAction<boolean>>, menuRef, setIsOpen) => {
  const listenForOutsideClicks = () => {
    return () => {
      if (listening) return
      if (!menuRef?.current) return
      setListening(true)
      ;[`click`, `touchstart`]?.forEach((type) => {
        document?.addEventListener(`click`, (evt) => {
          if (menuRef?.current?.contains(evt?.target)) return
          setIsOpen(false)
        })
      })
    }
  }

  useEffect(listenForOutsideClicks())

  return { listenForOutsideClicks }
}
