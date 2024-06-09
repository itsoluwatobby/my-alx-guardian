import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { toast } from "react-toastify";
import { authenticationAPI } from "../app/api-calls/auth.api";
import { sanitizeEntries } from "../utility/helpers";
import OTPComponent from "../components/authentication/OTPComponent";
import AppStand from "../components/AppStand";
import { MetaTags } from "../layouts/MetaTagsOGgraph";

const initOTPValues = {
  entry1: '', entry2: '', entry3: '',
  entry4: '', entry5: '', entry6: ''
}

export default function AccountVerification() {
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);
  const [appStateDup, setAppStateDup] = useState<AppStateType>({} as AppStateType);
  const [search] = useSearchParams();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<OTPValues>(initOTPValues);
  const [fromChangePassword, setFromChangePassword] = useState<boolean>(false);

  const { loading, isError } = appState
  const navigate = useNavigate()

  useEffect(() => {
    setEmail(atob(search.get('token') as string));
    setFromChangePassword(!(JSON.parse(search.get('activate') as string) as boolean))
  }, [search])

  const canSubmit = [...Object.values(otp)].every(Boolean);
  const handleSubmit = async() => {
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const otpValues = Object.values(otp).join('');
      const sanitized = sanitizeEntries({ email, otp: otpValues });
      
      let res;
      if (!fromChangePassword) {
        res = await authenticationAPI.activateAccount(sanitized);
        toast.success(res.message.split(': ')[1]);
        navigate('/success_verification')
      }
      else {
        res = await authenticationAPI.verifyOtp(sanitized);
        toast.success(res.message.split(': ')[1]);
        navigate(`/newPassword?token=${btoa(email)}`)
      }
    }, setAppState);
  }

  const resendToken = async() => {
    guardianAsyncWrapper(async () => {
      if (appStateDup.loading) return;
      setAppStateDup(prev => ({ ...prev, loading: true }));
      if (!email.includes('@')) return;
      const sanitized = sanitizeEntries({ email });
      const res = await authenticationAPI.resendOtp(sanitized);
      console.log({ res });
      toast.success('OTP sent to email');
    }, setAppStateDup);
  }

  return (
    <main className="page w-full flex flex-col md:flex-row items-center h-full">
       <MetaTags
        title='Account Verification'
        description='Account verification page'
        url=''
        image=''
      />
      <section className='maxscreen:fle relative flex-auto w-full h-full flex flex-col justify-center md:pl-14 px-2 gap-10 maxscreen:gap-12'>
        <h1 className="text-center text-3xl">{fromChangePassword ? 'Verify Token' : 'Account Verification'}</h1>
        <p className='whitespace-pre-wrap text-center'>
          {fromChangePassword ? 'Verification token' : 'Account verification'} has been sent to the email associated with this account, please check your email
        </p>

        <OTPComponent
          otp={otp} setOtp={setOtp} isError={isError}
          isLoading={loading} canSubmit={canSubmit}
          handleSubmit={handleSubmit}
        />

        <span
          onClick={resendToken}
          className="underline cursor-pointer -mt-3 text-base self-end hover:opacity-95 active:opacity-100 transition-opacity">{appStateDup.loading ? 'Requesting...' : 'Resend OTP'}</span>
      </section>

      <AppStand />
  
    </main>
  )
}