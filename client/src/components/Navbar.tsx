import { useCallback, useState } from "react";
import { FaHamburger, FaSun } from "react-icons/fa"
import { FaMoon } from "react-icons/fa6"
import { useLocation, useNavigate } from "react-router-dom";

type NavbarProps = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ theme, setTheme, setOpenSidebar }: NavbarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState<string>('/' || '#');

  const classNames = useCallback((theme: Theme) => {
    return `self-end w-1 h-1 rounded-sm ${theme === 'light' ? 'bg-black' : 'bg-white'} -translate-y-1 mx-[1px]`
  }, [])

  const navigation = [
    { name: 'Home', link: pathname === '/' ? '#' : '/' },
    { name: 'Sign in', link: '/signin' },
    { name: 'Sign up', link: '/signup' },
    { name: 'About', link: '#about' },
    { name: 'FAQ', link: '#faq' },
    { name: 'Contact', link: '#contact' },
  ];
  return (
    <nav className={`sticky top-0 w-full z-40 bg-opacity-85 ${theme === 'light' ? 'bg-[#fae2ef]' : 'bg-[#333333]'} h-10 pt-8 pb-6 px-6 flex items-center justify-between`}>
      <h3 onClick={() => navigate('/')} className="cursor-pointer text-3xl flex items-center">M<div className={classNames(theme)}></div>A<div className={classNames(theme)}></div>G
      </h3>

      <div className="md:flex justify-between items-center w-[60%] lg:w-1/2 hidden">
        {
          navigation.map(nav => (
            <a href={nav.link} key={nav.name}
            onClick={() => setActiveLink(nav.link)}
            className={`${activeLink === nav.link ? 'underline' : ''} hover:opacity-95 hover:underline underline-offset-4 transition-all text-[15px]`}>
              {nav.name}
            </a>
          ))
        }
      </div>

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
              className="cursor-pointer text-xl hover:scale-[1.04] active-scale-[1] transition-transform text-[#333333]" />
        }
        
        <FaHamburger 
        onClick={() => setOpenSidebar(true)}
        className="text-2xl cursor-pointer hover:opacity-90 transition-opacity md:hidden" />
      </div>


    </nav>
  )
}