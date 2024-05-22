import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

type Toggles = 'forums' | 'cohorts'
type ToggleStates = Record<Toggles, boolean>;

export default function DashboardLayout() {
  const [toggle,setToggle] = useState<ToggleStates>({} as ToggleStates);

  const rightBar = [
    { name: 'home', link: '/dashboard' },
    { name: 'profile', link: '/profile' },
    {
      name: 'forums',
      link: () => setToggle(prev => ({ ...prev, forums: !prev.forums })), Icon: MdArrowDropDown
    },
    {
      name: 'cohorts',
      link: () => setToggle(prev => ({ ...prev, cohorts: !prev.cohorts })),
      Icon: MdArrowDropDown
    },
  ]

  return (
    <main className="flex items-center h-full w-full">
      <div className="flex items-center h-full w-full">
        <aside className="flex flex-col justify-between py-8 px-4 h-full overflow-y-scroll shadow-inner w-1/5 min-w-48 maxmobile:hidden">
          <div className="flex flex-col gap-y-8 pl-10 py-8 border-b w-full">
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

          <div className="flex flex-col gap-y-8 pl-10 py-8 border-b h-full w-full">
            <h4>Forums</h4>
            
          </div>
        </aside>

        <Outlet />

        <aside className="md:flex flex-col h-full overflow-y-scroll shadow-inner w-1/4 hidden">

        </aside>
      </div>
    </main>
  )
}