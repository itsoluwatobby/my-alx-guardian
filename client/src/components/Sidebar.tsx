import { FaTimes } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa6";

type SidebarProps = {
  theme: Theme;
  openSidebar: boolean;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ theme, openSidebar, setTheme, setOpenSidebar }: SidebarProps) {

  const navigation = [
    { name: 'Home', link: '/' },
    { name: 'Sign in', link: '/signin' },
    { name: 'Sign up', link: '/signup' },
    { name: 'About', link: '#about' },
    { name: 'FAQ', link: '#faq' },
    { name: 'Contact', link: '#contact' },
  ];

  return (
     <div className={`md:hidden fixed flex justify-between top-0 ${openSidebar ? 'translate-x-0' : 'translate-x-[1000px]'} duration-500 transition-transform w-full h-full z-50`}>
      <div 
      className={`w-[40%] h-full opacity-30 ${theme === 'light' ? 'bg-gradient-to-b from-[#fae2ef] from-[60%] to-transparent' : 'dark:bg-[#737272] text-[#ffffff]'}`}
      onClick={() => setOpenSidebar(false)}></div>

      <div className={`relative z-50 flex flex-col justify-between gap-y-4 h-full p-4 py-14 items-center w-[60%] ${theme === 'light' ? 'bg-gradient-to-b from-[#fdcee7] from-[60%] to-transparent' : 'bg-gradient-to-b from-[#333333] from-[40%] to-[#606060] text-[#ffffff]'} rounded-l-md shadow-lg`}>

        <div className="absolute top-4 px-4 flex items-center justify-between w-full">
          <div className="flex gap-x-8 items-center">
            {
              theme === 'dark' ?
                  <FaSun 
                  title='Light'
                  onClick={() => setTheme('light')}
                  className="cursor-pointer text-xl hover:scale-[1.04] active-scale-[1] transition-transform" />
                :
                  <FaMoon title='Dark'
                  onClick={() => setTheme('dark')}
                  className="cursor-pointer text-2xl hover:scale-[1.04] active-scale-[1] transition-transform text-[#333333]" />
            }
          </div>
          
          <button 
            onClick={() => setOpenSidebar(false)}
          className="rounded-md text-white bg-gray-700 p-1.5 px-3 hover:scale-[1.02] active:scale-[1] transition-transform">
            <FaTimes />
          </button>
        </div>

        <div className={`relative flex flex-col gap-y-6 h-full px-8 py-10 items-end w-full border-b`}>
          {
            navigation.map(nav => (
              <a href={nav.link} key={nav.name} 
              className="border-b w-[80%] text-right rounded-br-md last:border-b-0 pb-4 hover:opacity-95 hover:pb-[18px] transition-all">
                {nav.name}
              </a>
            ))
          }
        </div>

      </div>
    </div>
  )
}