import { MetaTags } from "../layouts/MetaTagsOGgraph";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

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
    <div className="w-full h-full p-20 flex flex-col gap-y-14 items-center text-center">
       <MetaTags
        title='Page Not Found'
        description='Error handling page'
        url=''
        image=''
      />

      <h3 className="text-6xl animate-pulse">
        Oops!!!
      </h3>
      <h3 className="text-5xl maxmobile:text-3xl">
        Page Not NotFound
      </h3>
      <p className="text-xl maxmobile:text-lg">You wondered off. You will be automatically redirected!</p>
    </div>
  )
}