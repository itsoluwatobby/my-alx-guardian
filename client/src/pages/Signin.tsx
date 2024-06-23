/* eslint-disable @typescript-eslint/no-explicit-any */
import { PasswordInputs } from "../components/authentication/PasswordInputs";
import ThirdPartyLogin from "../components/authentication/Thirdparty";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGuardianContext } from "../hooks/useGuardianContext";
import { authenticationAPI } from "../app/api-calls/auth.api";
import { ActionButton } from "../components/ActionButton";
import { ChangeEvent, useEffect, useState } from "react";
import { FormInputs } from "../components/FormInputs";
import useLocalStorage from '../utility/localStorage';
import { MetaTags } from "../layouts/MetaTagsOGgraph";
import { sanitizeEntries } from "../utility/helpers";
import localStore from "../utility/localStorage";
import AppStand from "../components/AppStand";
import { toast } from "react-toastify";
import { Socket, connect } from 'socket.io-client';

let socket: Socket;
export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);
  const [reveal, setReveal] = useState<boolean>(false);
  const { setLoggedInUserId } = useGuardianContext() as GuardianContextType;
  const [persistLogin, setPersistLogin] = useState<boolean>(useLocalStorage.getStorage('guardianUser') as boolean ?? false);
  const [user, setUser] = useState<UserCredentialsType>({} as UserCredentialsType);

  const { loading, isError } = appState;
  const { email, password } = user;

  const handleUserInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [event.target.name, event.target.value]
    setUser(prev => ({ ...prev, [name]: value }))
  };
  
  useEffect(() => {
    socket = connect('http://localhost:5000')
  }, [])
  
  const conversationId = '66764f3b6cd64e13bc970188';
  // const recipientId = '66487f32c9304deb9ce9451b';
  const senderId = '66434401f1f86556653fb187';
  useEffect(() => {
    socket.on('connect', async () => {
      console.log(socket.connected);
      socket.emit('join', { userId: senderId, conversationId, name: 'hello' });

      socket.on('user-joined', (data) => {
        console.log(data);
      })
      // const res = await socket.emitWithAck('write_message', { message: 'Good morning you all' });
      // console.log(res);;
    })

    return () => {
      socket.off('join');
      socket.off('user-joined');
    }
  }, [])

  const sendMessage = () => {
    console.log('run');
    socket.emit(
      'sendMessage',
      {
        senderId,
        conversationId,
        // recipientId,
        message: "latest from member",
      },
      (data: any) => {
        console.log(data)

      });
    socket.on('newMessage', (data) => {
      console.log(data);
    })
  }

  useEffect(() => {
    useLocalStorage.setStorage('guardianUser', persistLogin);
  }, [persistLogin])

  const handleLogin = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const credentails = sanitizeEntries({ email, password });
      const res = await authenticationAPI.login(credentails);
      localStore.setStorage('token', res.data.accessToken);
      localStore.setStorage('my-id', res.data.id);
      setLoggedInUserId(res.data.id);
      toast.success('Signin successful')
      const pathname: string = location.state ? location?.state : '/dashboard';
      navigate(pathname, { replace: true })
    }, setAppState);
  }

  const canSubmit = [...Object.values(user)].every(Boolean);
  return (
    <main className="page w-full flex flex-col md:flex-row items-center h-full">
      <MetaTags
        title='Signin'
        description='User signin page'
        url=''
        image=''
      />
      <form onSubmit={handleLogin} className="flex-none md:w-[55%] w-full h-full flex flex-col gap-y-6 p-8 pt-14 items-center">

        <FormInputs
          name="email" value={email} handleUserInfo={handleUserInfo}
          type='email' autoComplete='on'
          placeholder='jodndoe@gmail.com'
        />
        <PasswordInputs
          label='password' name="password" value={password}
          handleUserInfo={handleUserInfo}
          reveal={reveal} setReveal={setReveal}
        />

        <div className="flex items-center w-full justify-between text-[12px] mobile:text-[15px]">
          <div className="flex items-center gap-1.5">
            <input type="checkbox" checked={persistLogin}
              onChange={event => setPersistLogin(event.target.checked)}
              className='w-4 mobile:w-4.5 h-4 mobile:h-4.5 cursor-pointer'
            />
            <span>Remember me</span>
          </div>
          <Link to={'/forgotPassword'} className='text-gray-200 hover:underline underline-offset-2 hover:opacity-90 transition-all text-[13px]'>Forgot Password?</Link>
        </div>

        <ActionButton
          checker={canSubmit && !loading}
          text='Login' disabled={!canSubmit || loading}
          loading={loading} isError={isError}
        />
        <ActionButton type='button'
          checker={true} onClick={sendMessage}
          text='Send Message' disabled={false}
          loading={false} isError={isError}
        />

        <div className="flex flex-col gap-1 mobile:gap-0.5 items-center py-1 mobile:text-sm">
          <div className="flex items-center">
            <span>Don't have an Account?&nbsp;</span>
            <Link to='/signup' className='cursor-pointer text-[#14F400]'>Sign Up</Link>
          </div>
          {/* <span>or continue with</span> */}

          <ThirdPartyLogin
          // showModal={showModal}
          // setLoading={setAppState}
          // setShowModal={setShowModal}  */}
          />
        </div>
      </form>

      <AppStand />

    </main>
  )
}