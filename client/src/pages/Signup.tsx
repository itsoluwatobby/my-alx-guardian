import { ChangeEvent, useEffect, useState } from "react";
import { ActionButton } from "../components/ActionButton";
import { validation_regex } from "../utility/validation";
import { PasswordInputs } from "../components/authentication/PasswordInputs";
import { FormInputs } from "../components/FormInputs";
import { Link, useNavigate } from "react-router-dom";
// import ThirdPartyLogin from "../components/authentication/Thirdparty";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { toast } from "react-toastify";
import { authenticationAPI } from "../app/api-calls/auth.api";
import { sanitizeEntries } from "../utility/helpers";
import { Provider } from "../utility/constants";
import { MetaTags } from "../layouts/MetaTagsOGgraph";
import AppStand from "../components/AppStand";

const initValidation = { validEmail: false, match: false }
export default function Signup() {
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);
  const [validation, setValidation] = useState<typeof initValidation>(initValidation)
  const [reveal, setReveal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<UserInfoType>({} as UserInfoType);
  const navigate = useNavigate();

  const { loading, isError } = appState;
  const { validEmail, match } = validation;
  const { firstName, lastName, email, password, confirmPassword } = newUser;

  const handleUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [event.target.name, event.target.value]
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (email) {
      setValidation(prev => ({ ...prev, validEmail: validation_regex.email.test(email) }))
    }
  }, [email])

  useEffect(() => {
    if (password && password === confirmPassword) {
      setValidation(prev => ({ ...prev, match: true }))
    }
    else setValidation(prev => ({ ...prev, match: false }))
  }, [password, confirmPassword])

  const canSubmit = [...Object.values(newUser)].every(Boolean);

  const handleSignup = async(event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const sanitized = sanitizeEntries({ firstName, lastName, email, password })
      const user: RegistrationRequest = { ...sanitized, provider: Provider.Local };
      const res = await authenticationAPI.signup(user);
      toast.success(res.message.split(': ')[1]);
      navigate(`/account_verification?activate=${true}&token=${btoa(email)}`)
    }, setAppState);
  }

  return (
    <main className="page w-full flex flex-col md:flex-row items-center h-full">
      <MetaTags
        title='Signup'
        description='User registration'
        url=''
        image=''
      />
      <form onSubmit={handleSignup} className="flex-none md:w-[55%] w-full h-full flex flex-col gap-y-6 p-8 pt-14 items-center">

        <div className="w-full flex mobile:flex-col flex-row gap-y-6 gap-x-4">
          <FormInputs
            name="firstName" value={firstName} handleUserInfo={handleUserInfo} type='text' autoComplete={'off'} placeholder='First name'
          />
          <FormInputs
            name="lastName" value={lastName} handleUserInfo={handleUserInfo} type='text' autoComplete={'off'} placeholder='Last name'
          />
        </div>
        <FormInputs
          name="email" value={email} handleUserInfo={handleUserInfo} type='email' validEmail={validEmail} autoComplete='off'
          placeholder='jodndoe@gmail.com'
        />
        <PasswordInputs
          label='password' name="password" value={password}
          handleUserInfo={handleUserInfo} match={match}
          reveal={reveal} setReveal={setReveal}
        />
        <PasswordInputs
          label="Confirm password" name='confirmPassword'
          match={match} value={confirmPassword}
          handleUserInfo={handleUserInfo} reveal={reveal}
          setReveal={setReveal}
        />

        <ActionButton
          checker={canSubmit && !loading}
          text='Signup' disabled={!canSubmit || loading}
          loading={loading} isError={isError}
        />

        <div className="flex flex-col gap-1 mobile:gap-0.5 items-center py-1 mobile:text-sm">
          <div className="flex items-center">
            <span>Already have an Account?&nbsp;</span>
            <Link to='/signin' className='cursor-pointer text-[#14F400]'>Sign In</Link>
          </div>
          {/* <span>or continue with</span> */}

          {/* <ThirdPartyLogin
            // showModal={showModal}
            // setLoading={setAppState}
          // setShowModal={setShowModal} 
          /> */}
        </div>
      </form>

      <AppStand />
      
    </main>
  )
}