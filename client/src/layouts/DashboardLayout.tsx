import { useState } from "react";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { Input } from "../components/component/Input";
import { useGuardianContext } from "../hooks/useGuardianContext";

type Toggles = 'forums' | 'cohorts'
type ToggleStates = Record<Toggles, boolean>;

export default function DashboardLayout() {
  const { theme } = useGuardianContext() as GuardianContextType;
  const [addItem, setAddItem] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [toggle,setToggle] = useState<ToggleStates>({} as ToggleStates);

  const rightBar = [
    { name: 'home', link: '/dashboard' },
    { name: 'profile', link: '/profile/1234' },
    { name: 'create post', link: '/new-post' },
    {
      name: 'forums',
      link: () => setToggle(prev => ({ cohorts: false, forums: !prev.forums })), Icon: MdArrowDropDown
    },
    {
      name: 'cohorts',
      link: () => setToggle(prev => ({ ...prev, forums: false, cohorts: !prev.cohorts })),
      Icon: MdArrowDropDown
    },
  ]
// console.log(input)
  const ForumsCommon = ['Java', 'C', 'Javascript', 'Python', 'Bash', 'Linus']

  return (
    <main className="flex items-center h-full w-full">
      <div className="flex items-center h-full w-full">
        <aside className="sticky top-14 flex flex-col justify-between py-4 px-1 h-[90vh] -mt-14 shadow-inner max-w-1/4 min-w-48 midscreen:hidden">
          <div className="flex flex-col gap-y-6 pl-10 py-8 border-b w-full">
            {
              rightBar.map(nav => (
                !nav.Icon ?
                  <Link to={nav.link} key={nav.name}
                  className="capitalize"
                  >{nav.name}</Link>
                :
                  <button onClick={nav.link} key={nav.name}
                  className="flex items-center capitalize gap-2 cursor-default"
                  >
                    {nav.name}
                    <nav.Icon className={`size-8 ${toggle[nav.name as Toggles] ? 'rotate-[-90deg]' : ''} transition-transform cursor-pointer hover:opacity-95`}/>
                  </button>
              ))
            }
          </div>

          <div className={`relative ${toggle.forums ? 'flex' : 'hidden'} flex-col gap-y-4 py-3 flex-auto w-full`}>
            <div className={`w-fit flex items-center gap-x-2 self-center`}>
              <h4 className="underline underline-offset-4 self-center">Forums</h4>
              {
                addItem ? 
                <FaMinusSquare 
                title="Close"
                onClick={() => setAddItem(false)}
                className="size-4 cursor-pointer hover:opacity-90 active:opacity-100 transition-opacity"
                />
                :
                <FaPlusSquare 
                  title="Add"
                  onClick={() => setAddItem(true)}
                  className="size-4 cursor-pointer hover:opacity-90 active:opacity-100 transition-opacity"
                />
              }

              <div className={`absolute left-0 top-10 w-full ${addItem ? 'flex' : 'hidden'} h-full ${theme === 'light' ? 'bg-gradient-to-b from-[#faeff5] from-[60%] to-transparent' : 'bg-gradient-to-b from-[#3e3e3e] from-[40%] to-[#606060] text-[#ffffff]'} opacity-90 rounded-md justify-center z-20`}>
                <Input search={input} setSearch={setInput} 
                classNames="text-sm -mt-28 shadow-md" inputClassNames="px-2" excludeSearch={true} max={15}
                placeholder={`add ${'forum' || 'cohort'}`}
                />
              </div>
            </div>


            <ul className="pl-4 flex flex-col gap-y-2 text-sm">
              {
                ForumsCommon.map(forum => (
                  <li key={forum}>
                    {forum}
                  </li>
                ))
              }
              <div className="mt-3 flex items-center w-full gap-x-2 text-[13px]">
                {
                  [...Array(5).keys()].map(i => (
                    <button 
                    key={i} className="font-sans px-2 p-0.5 rounded-sm focus:bg-gray-700 bg-gray-500 hover:scale-[1.02] transition-transform text-white">{i+1}</button>
                  ))
                }
              </div>
            </ul>
            
          </div>
        </aside>

        <Outlet />

        <aside className="md:flex flex-col h-full overflow-y-scroll shadow-inner w-1/4 hidden">

        </aside>
      </div>
    </main>
  )
}