import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { initAppState, initCategoryObj, initPagination } from "../utility/initVaraibles";
import CategoryDisplay from "../components/dashbord/CategoryDisplay";
import { useGuardianContext } from "../hooks/useGuardianContext";
import { Link, Outlet, useLocation } from "react-router-dom";
import { categoryAPI } from "../app/api-calls/category.api";
import CategoryForm from "../components/CategoryForm";
import { postAPI } from "../app/api-calls/post.api";
import { MdArrowDropDown } from "react-icons/md";
import { useLogout } from "../hooks/useLogout";
import { useEffect, useState } from "react";
import CategoryDetailPage from "../components/CategoryDetailPage";

const initPageQuery = { pageNumber: 1, limit: 5 };
export default function DashboardLayout() {
  const { pathname } = useLocation();
  const logout = useLogout(() => {});
  const { loggedInUserId, categoryToggle, setCategoryToggle,
    setPosts, posts, setAppStatePost, setPaginate, type, setType,
   } = useGuardianContext() as GuardianContextType;
  const [addItem, setAddItem] = useState<AddItemType>({
    category: {} as CategoryObjType, toggle: false
  });
  const [totalPosts, setTotalPosts] = useState<number>(0);

  const [categories, setCategories] = useState<CategoryObjType[]>([]);
  const [paginateCategory, setPaginateCategory] = useState<Pagination>(initPagination);

  const [postQuery] = useState<Omit<CategoryQuery, 'type'>>(initPageQuery);
  const [categoryQuery, setCategoryQuery] = useState<Omit<CategoryQuery, 'type'>>(initPageQuery);
  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const [category, setCategory] = useState<CategoryObjType>(initCategoryObj);

  const { pageNumber, limit } = categoryQuery;
  const { pageNumber: page } = postQuery;

  const rightBar = [
    { name: 'home', link: '/dashboard', display: true, },
    { name: 'profile', link: `/profile/${loggedInUserId}`, display: false },
    { name: 'create post', link: loggedInUserId ? '/new-post' : '/signin', display: false },
    {
      name: 'Forums', display: true,
      link: () => setCategoryToggle(prev => ({ Cohorts: false, Forums: !prev.Forums })),
      Icon: MdArrowDropDown
    },
    {
      name: 'Cohorts',
      display: true,
      link: () => setCategoryToggle(prev => ({ ...prev, Forums: false, Cohorts: !prev.Cohorts })),
      Icon: MdArrowDropDown
    },
  ]

  useEffect(() => {
    if (categoryToggle.Cohorts) setType('Cohorts');
    else if (categoryToggle.Forums) setType('Forums');
    else setType('General');
  }, [categoryToggle.Cohorts, categoryToggle.Forums, setType])

  useEffect(() => {
    if (type === 'General') return;
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const res = await categoryAPI.findCategories(
        { pageNumber, limit, type },
      );
      setPaginateCategory(res.data.pageable)
      setCategories(res.data.data);
    }, setAppState);
  }, [pageNumber, limit, type])

  useEffect(() => {
    guardianAsyncWrapper(async () => {
      setAppStatePost(prev => ({ ...prev, loading: true }));
      const res = await postAPI.findPosts({
        pageNumber: page, limit: 5, type
      });
      console.log(res);
      setPaginate(res.data.pageable)
      setPosts(res.data.data);
    }, setAppStatePost);
  }, [type, setAppStatePost, setPaginate, setPosts, page])

  useEffect(() => {
    if (!posts.length) return;
    if (type === 'General') return;
    const postType = posts?.filter(post => post.category.type === type);
    setTotalPosts(postType?.length);
  }, [type, posts])

  return (
    <main className="flex items-center h-full w-full">
      <div className="flex items-cente h-full w-full gap-4">
        <aside className={`md:sticky md:top-14 flex flex-col justify-between py-4 px-1 h-[90vh] -mt-14 shadow-inner max-w-1/4 md:w-[28%] min-w-48 ${(!categoryToggle.Forums && !categoryToggle.Cohorts) ? 'hidde midscreen:hidden' : 'midscreen:fixed midscreen:translate-x-[10px] midscreen:bottom-0 midscreen:w-full midscreen:bg-gradient-to-b from-[#333333] from-[40%] to-[#606060] midscreen:z-30 midscreen:opacity-90'}`}>
          <div className="flex flex-col gap-y-4 pl-10 py-6 border-b midscreen:w-48 w-full">
            {
              rightBar.map(nav => (
                !nav.Icon ?
                  <Link to={nav.link} state={pathname} key={nav.name}
                    className={`capitalize ${(!loggedInUserId.length && !nav.display) ? 'hidden' : ''}`}
                  >{nav.name}</Link>
                  :
                  <button onClick={nav.link} key={nav.name}
                    className="flex items-center capitalize gap-2 cursor-default"
                  >
                    {nav.name}
                    <nav.Icon className={`size-8 ${categoryToggle[nav.name as CategoryToggles] ? 'rotate-[-90deg]' : ''} transition-transform cursor-pointer hover:opacity-95`} />
                  </button>
              ))
            }
          </div>

          <CategoryDisplay
            categories={categories}
            addItem={addItem} setAddItem={setAddItem}
            categoryToggle={categoryToggle}
            appState={appState} type={type}
            setCategory={setCategory}
            paginateCategory={paginateCategory}
            setCategoryQuery={setCategoryQuery}
          />
          
          <button
            onClick={logout}
            className='midscreen:self-start self-center rounded-full py-2 disabled:cursor-not-allowed mobile:py-3 mobile:text-base w-36 mobile:w-36 font-medium text-white bg-blue-900 transition-colors duration-300 shadow-sm'
          >
            Sign out
          </button>
        </aside>

        <Outlet />

        <aside className="hidden mdflex flex-col h-full overflow-y-scroll shadow-inner w-1/4">

        </aside>
      </div>
      {
        addItem.toggle ?
          <CategoryForm
            setAddItem={setAddItem}
            addItem={addItem}
            loggedInUserId={loggedInUserId}
            setCategories={setCategories}
          /> : null
      }

      {
        category._id ?
        <CategoryDetailPage
          categoryObj={category} totalPosts={totalPosts}
          setAddItem={setAddItem}
          setCategories={setCategories}
          setCategory={setCategory} loggedInUserId={loggedInUserId}
        /> : null
      }
    </main>
  )
}
