import { useCallback, useEffect, useRef, useState } from 'react'

export type UseStateWithCbCallback<State> = (prevState: State) => void
export type UseStateWithCbNewState<State> = (prevState: State) => State

export const useStateWithCb = <State,>(initialState: State) => {
  const [state, setState] = useState<State>(initialState)
  const cbRef = useRef<UseStateWithCbCallback<State> | null>(null)

  const updateState = useCallback(
    (newState: UseStateWithCbNewState<State>, cb?: any) => {
      if (cb) cbRef.current = cb
      setState((prev) =>
        typeof newState === 'function' ? newState(prev) : newState,
      )
    },
    [],
  )

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state)
      cbRef.current = null
    }
  }, [state])

  return { state, updateState }
}
