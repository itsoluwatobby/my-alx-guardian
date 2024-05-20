import { useEffect, useState } from "react"
import { MAX_LENGTH } from "../utility/constants";

type ActionButtonProps = {
  loading: boolean;
  isError: boolean;
  text: string;
  disabled?: boolean;
  checker: boolean;
  onClick?: () => void;
  extraClassNames?: string;
}

export const ActionButton = ({ text, loading, isError, checker, onClick, disabled = false, extraClassNames }: ActionButtonProps) => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (isError) setError(isError);
  }, [isError])

  useEffect(() => {
    if (!error) return;
    const timerId = setTimeout(() => {
      setError(false)
    }, MAX_LENGTH.MIN_TIMEOUT)
    return () => {
      clearTimeout(timerId)
    }
  }, [error])

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`${extraClassNames} self-center rounded-[3px] py-2 disabled:cursor-not-allowed mobile:py-3 mobile:text-base w-36 mobile:w-40 font-medium text-white ${error ? 'bg-red-600' : checker ? 'bg-[#5e43fc] hover:bg-gradient-to-tr from-[#5e43fc] to-blue-300' : 'bg-blue-600'} ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} transition-colors duration-300 shadow-sm`}
    >
      {error ? 'Failed' : (!loading ? text : 'In Progress...')}
    </button>
  )
}