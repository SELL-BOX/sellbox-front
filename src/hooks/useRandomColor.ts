import { useCallback } from 'react'

export default function useRandomColor() {
  const generate = useCallback(() => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }, [])
  return [generate]
}
