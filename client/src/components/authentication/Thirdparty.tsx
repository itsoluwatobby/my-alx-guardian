import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { thirdPartyAuthentication } from '../../utility/thirdpartySignups';
import { useLocation, useNavigate } from 'react-router-dom';
// import React from 'react';
import useLocalStorage from '../../utility/localStorage';
import { toast } from 'react-toastify';

// type ThirdPartyLoginProps = {
//   setLoading: React.Dispatch<React.SetStateAction<AppStateType>>;
// }

type AuthProvider = 'google.com' | 'github.com';
export default function ThirdPartyLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [signin, { isLoading, isError, isSuccess }] = useSigninMutation();

  const authSignIn = async (authProvider: AuthProvider) => {
    try {
      // setLoading(prev => ({ ...prev, loading: true }));
      let result: {
        user: {
          displayName: string, email: string,
          photoUrl: string,
        }
      };
      if (authProvider === 'google.com') {
        result = await thirdPartyAuthentication.googleSignup();
      }
      else {
        result = await thirdPartyAuthentication.githubSignup();
      }
      console.log(result);
      // const { email: username, displayName: name, photoUrl } = result.user;
      // const userData = { username, password: '', name };
      // const res = await signin(userData).unwrap(); //;
      // console.log(res.data)
      // useLocalStorage.setStorage('korin_pid', res.data.user._id);

      // typeof window !== 'undefined' ? window.localStorage.setItem('ClientModal', value) : null;
      toast.success('Login successful')
      const pathname: string = location.state ? location?.state : '/';
      navigate(pathname, { replace: true })
    }
    catch (error) {
      typeof window !== 'undefined' ? window.localStorage.removeItem('ClientModal') : null;
      // setShowModal({ selection: 'null', modal: false });
      // setLoading(prev => ({ ...prev, isError: true }));
      console.log(error);
    }
    finally {
      // setLoading(prev => ({ ...prev, loading: false }));
    }
  }

  const ICONS = [
    { icon: FcGoogle, trigger: 'google.com' as AuthProvider },
    { icon: FaGithub, trigger: 'github.com' as AuthProvider },
  ];

  return (
    <div className="flex items-center gap-6 mt-3">
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