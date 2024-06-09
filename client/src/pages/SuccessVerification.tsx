import { useEffect } from "react";
import { FaHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MAX_LENGTH } from "../utility/constants";
import { MetaTags } from "../layouts/MetaTagsOGgraph";
import AppStand from "../components/AppStand";

export default function SuccessVerification() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      navigate('/signin');
    }, MAX_LENGTH.MIN_TIMEOUT);
    
    return () => {
      clearTimeout(timeoutID);
    }
  }, [navigate])



  return (
    <main className="page w-full flex flex-col md:flex-row items-center h-full">
      <MetaTags
        title='Account Success Verification'
        description='Successfull account activation'
        url=''
        image=''
      />
      <section className="flex-none md:w-[55%] w-full h-full flex flex-col gap-y-6 p-8 pt-14 items-center">

        <FaHandshake className="shake size-64 text-[#30b8ba]"/>

        <h4 className="text-lg animate-pulse md:text-xl">Welcome! Account Activation successful</h4>
  
      </section>

      <AppStand />
    
    </main>
  )
}