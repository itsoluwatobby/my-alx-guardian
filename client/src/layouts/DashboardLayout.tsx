import { useEffect, useState } from "react";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useGuardianContext } from "../hooks/useGuardianContext";
import CategoryForm from "../components/CategoryForm";
import RenderTemplate from "../components/RenderTemplate";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { initAppState } from "../utility/initVaraibles";
import { categoryAPI } from "../app/api-calls/category.api";
// import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
// import { categoryAPI } from "../app/api-calls/category.api";
// import { initAppState } from "../utility/initVaraibles";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { theme, loggedInUserId } = useGuardianContext() as GuardianContextType;
  const [addItem, setAddItem] = useState<boolean>(false);

  const [categories, setCategories] = useState<CategoryObjType[]>([]);
  const [paginate, setPaginate] = useState<Pagination>({
    pages: { previous: null, current: null, next: null },
    length: 0, pagesLeft: 0, numberOfPages: 0,
  });
  const [postQuery, setPageQuery] = useState<Omit<CategoryQuery, 'type'>>({
    pageNumber: 1, limit: 5,
  });
  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const [toggle, setToggle] = useState<CategoryToggleStates>({} as CategoryToggleStates);
  const [type, setType] = useState<CategoryType>('General');
  
  const { pageNumber, limit } = postQuery;
  const { loading, isError, error } = appState;

  const rightBar = [
    { name: 'home', link: '/dashboard' },
    // { name: 'profile', link: '/profile/1234' },
    { name: 'create post', link: loggedInUserId ? '/new-post' : '/signin'  },
    {
      name: 'Forums',
      link: () => setToggle(prev => ({ Cohorts: false, Forums: !prev.Forums })), Icon: MdArrowDropDown
    },
    {
      name: 'Cohorts',
      link: () => setToggle(prev => ({ ...prev, Forums: false, Cohorts: !prev.Cohorts })),
      Icon: MdArrowDropDown
    },
  ]

  useEffect(() => {
    if (toggle.Cohorts) setType('Cohorts');
    else if (toggle.Forums) setType('Forums');
    else setType('General');
  }, [toggle.Cohorts, toggle.Forums])

  useEffect(() => {
    if (type === 'General') return;
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const res = await categoryAPI.findCategories(
        { pageNumber, limit, type },
      );
      setPaginate(res.data.pageable)
      setCategories(res.data.data);
    }, setAppState);
  }, [pageNumber, limit, type])

  return (
    <main className="flex items-center h-full w-full">
      <div className="flex items-center h-full w-full">
        <aside className="sticky top-14 flex flex-col justify-between py-4 px-1 h-[90vh] -mt-14 shadow-inner max-w-1/4 md:w-[28%] min-w-48 midscreen:hidden">
          <div className="flex flex-col gap-y-6 pl-10 py-8 border-b w-full">
            {
              rightBar.map(nav => (
                !nav.Icon ?
                  <Link to={nav.link} state={pathname} key={nav.name}
                  className="capitalize"
                  >{nav.name}</Link>
                :
                  <button onClick={nav.link} key={nav.name}
                  className="flex items-center capitalize gap-2 cursor-default"
                  >
                    {nav.name}
                    <nav.Icon className={`size-8 ${toggle[nav.name as CategoryToggles] ? 'rotate-[-90deg]' : ''} transition-transform cursor-pointer hover:opacity-95`}/>
                  </button>
              ))
            }
          </div>

          <div className={`relative ${(!toggle.Forums && !toggle.Cohorts) ? 'hidden' : 'flex'} flex-col gap-y-2 py-3 flex-auto w-full`}>
            <div className={`w-fit flex items-center gap-x-2 self-center`}>
              <h4 className="underline underline-offset-4 self-center">{toggle.Forums ? 'Forums' : 'Cohorts'}</h4>
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
            </div>


            <ul className="pl-4 flex flex-col gap-y-1 text-sm">
              <RenderTemplate
                defaultMessage={`No ${type}`}
                classNames="gap-y-1 py-1"
                errorTextClassNames='text-sm text-start'
                errorClassNames='size-11'
                isLoading={loading} isError={isError} content={categories}
                LoadingComponent={() => <div 
                className="animate-pulse w-full h-5 bg-[#333333]"
                ></div>} error={error}
              >
                <div className="flex flex-col gap-y-2">
                  {
                    categories?.map((cat) => (
                      <button key={cat._id}
                      className="capitalize cursor-default p-1 hover:bg-[#333333] focus:bg-[#333333] w-full text-start transition-colors"
                      >
                        {cat.category.name}
                      </button>
                    ))
                  }
                </div>
              </RenderTemplate>

              <div className="absolute bottom-10 flex items-center w-full gap-x-2 text-[13px]">
                {
                  [...Array(paginate.numberOfPages).keys()].map(i => (
                    <button 
                    key={i}
                    onClick={() => setPageQuery(prev => ({ ...prev, pageNumber: i+1 }))}
                    className="font-sans px-2 p-0.5 rounded-sm focus:bg-gray-700 bg-gray-500 hover:scale-[1.02] transition-transform text-white">{i+1}</button>
                  ))
                }
              </div>
            </ul>
            
          </div>
        </aside>

        <Outlet />

        <aside className="hidden mdflex flex-col h-full overflow-y-scroll shadow-inner w-1/4">

        </aside>
      </div>
      {
        addItem ?
          <CategoryForm
            setAddItem={setAddItem}
            loggedInUserId={loggedInUserId}
            setCategories={setCategories}
          /> : null
      }
    </main>
  )
}