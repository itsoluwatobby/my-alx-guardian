import { FaPlus } from 'react-icons/fa6'
import { TextInput } from './TextInput'

type SocialAccountsProps = {
  theme: Theme;
  socials: UserSocialAccounts;
  activeAccounts: UserSocialAccounts[];
  setSocials: React.Dispatch<React.SetStateAction<UserSocialAccounts>>;
  setUser: React.Dispatch<React.SetStateAction<Partial<UpdateUserRequest>>>;
}

const initSocials = { platform: '', handle: '' };
export const UserSocialAccounts = ({ theme, activeAccounts, socials, setSocials, setUser }: SocialAccountsProps) => {

  const { platform, handle } = socials;

  const pushToSocials = () => {
    if (activeAccounts?.length === 4) return;
    if (!Object.values(socials).every(Boolean)) return;
    const others = activeAccounts?.filter((social) => social.handle !== handle) as UserSocialAccounts[];
    setUser(prev => ({ ...prev, activeAccounts: [socials, ...others] }));
    setSocials(initSocials);
  }

  return (
    <div className="flex flex-col">
      <h5 className="font-medium underline underline-offset-2">Socials</h5>
      <div className="flex items-center gap-x-1 mb-1">
        {
          activeAccounts?.map((social) => (
            <div key={social.handle}
              className="flex items-center gap-x bg-[#333333] w-fit rounded-sm"
            >
              <a href={social.handle} target="_blank"
                className="capitalize text-blue-500 p-0.5 px-2"
              >{social.platform}</a>
              <button
                onClick={() => {
                  setUser(prev => (
                    {
                      ...prev,
                      activeAccounts: prev?.activeAccounts?.filter(a => a.platform !== social.platform)
                    })
                  )
                }}
                className="focus:outline-none border-none p-0.5 px-1 text-sm rounded-r-sm bg-[#8e8d8d]"
              >
                x
              </button>
            </div>
          ))
        }
      </div>
      <div className="flex items-center gap-x-2 w-[85%] overflow-x-hidden">
        <TextInput
          value={platform} name="platform" placeholder="Platform"
          max={20} handleChange={(event => setSocials(prev => (
            { ...prev, platform: event.target.value }
          )))}
          classNames="w-24"
        />
        <TextInput
          value={handle} name="handle" placeholder="link" type="url"
          max={50} handleChange={(event => setSocials(prev => (
            { ...prev, handle: event.target.value }
          )))}
          classNames="text-bue-500"
        />
        <button
          onClick={pushToSocials}
          className={`grid place-content-center h-full p-2 rounded-md ${theme === 'light' ? 'border-[#0f7743] bg-[#757474]' : 'border-[#335544] bg-[#333333]'} ${Object.values(socials).every(Boolean) ? 'bg-green-600' : ''} text-white transition-all border border-[#335544] w-20 text-[13px]`}
        >
          <FaPlus className="hover:scale-[1.03] active:scale-[1] transition-all" />
        </button>
      </div>
    </div>
  )
}