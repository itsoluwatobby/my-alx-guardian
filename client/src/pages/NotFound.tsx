import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      navigate(-1);
    }, 3000);
    
    return () => {
      clearTimeout(timeoutID);
    }
  }, [navigate])

  return (
    <div className="w-full h-full p-20 flex flex-col gap-y-14 items-center">
      <h3 className="text-6xl animate-pulse">
        Oops!!!
      </h3>
      <h3 className="text-5xl">
        Page Not NotFound
      </h3>
      <p className="text-xl">You wondered off. You will be automatically redirected!</p>
    </div>
  )
}