import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { thirdPartyAuthentication } from '../../utility/thirdpartySignups';
import { useLocation, useNavigate } from 'react-router-dom';
import localStore from '../../utility/localStorage';
import { toast } from 'react-toastify';
import { authenticationAPI } from '../../app/api-calls/auth.api';
import { guardianAsyncWrapper } from '../../app/guardianAsyncWrapper';

type AuthProvider = 'Google' | 'Github';
export default function ThirdPartyLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const authSignIn = async (authProvider: AuthProvider) => {
    guardianAsyncWrapper(async () => {
      let result;
      if (authProvider === 'Google') {
        result = await thirdPartyAuthentication.googleSignup();
      }
      else {
        result = await thirdPartyAuthentication.githubSignup();
      }
      const [firstName, lastName] = (result.displayName as string).split(' ', 2);
      const userInfo: ThirdPartyRequest = {
      firstName, lastName, email: result.email,
      picture: result.photoURL, provider: authProvider,
      }
      const res = await authenticationAPI.thirdParty(userInfo);
      localStore.setStorage('token', res.data.accessToken);
      localStore.setStorage('my-id', res.data.id);
      toast.success('Signin successful')
      const pathname: string = location.state ? location?.state : '/dashboard';
      navigate(pathname, { replace: true })
    }, () => {});
  }

  const ICONS = [
    { icon: FcGoogle, trigger: 'Google' as AuthProvider },
    { icon: FaGithub, trigger: 'Github' as AuthProvider },
  ];

  return (
    <div className="flex items-center gap-4 mt-3">
      {
        ICONS.map((Icon, index) => (
          <button type='button' key={index}
            onClick={() => authSignIn(Icon.trigger)}
            className={`p-1.5 cursor-pointer hover:opacity-90 hover:scale-[1.02] active:scale-[1] transition-all shadow-md border-[1px] border-green-500 rounded-[3px]`}>
            <Icon.icon className={`${ICONS.slice(1) ? 'text-blue-600' : ''} text-3xl mobile:text-3xl`} />
          </button>
        ))
      }
    </div>
  )
}