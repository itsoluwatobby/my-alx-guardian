import { useEffect, useState } from "react"

// type Timeout = ReturnType<typeof setTimeout>;
// type DeboundedInputProps = {
//   input: string;
//   delay: number;
// }

export default function useDeboundedInput(input: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<{ val: string; isTyping: boolean }>({
    val: '', isTyping: false,
  });

  useEffect(() => {
    setDebouncedValue(prev => ({ ...prev, isTyping: true }))
    const delayedInput = setTimeout(() => {
        setDebouncedValue(prev => ({ ...prev, val: input, isTyping: false }))
      }, delay);

      return () => clearTimeout(delayedInput);
  }, [input, delay])

  return debouncedValue;
}