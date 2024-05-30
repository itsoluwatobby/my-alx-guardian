import { useEffect, useState } from "react"

export default function useDeboundedInput(input: string, delay: number) {
  const [prevState, setPrevState] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<DebouncedType>({
    val: '', isTyping: false, event: 'pass',
  });

  useEffect(() => {
    setDebouncedValue(prev => ({ ...prev, isTyping: true, event: 'typing' }))
    const delayedInput = setTimeout(() => {
        setDebouncedValue(prev => ({ ...prev, val: input, isTyping: false, event: 'notTyping' }))
        setPrevState(input);
      }, delay);
      return () => clearTimeout(delayedInput);
  }, [input, delay])
  
  useEffect(() => {
    // let isMounted = true;
    if (prevState === debouncedValue.val) {
      setDebouncedValue(prev => ({ ...prev, event: 'pass' }))
    }
  }, [prevState, debouncedValue.val])

  return debouncedValue;
}