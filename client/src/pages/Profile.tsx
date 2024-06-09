import { useNavigate, useParams } from "react-router-dom";
import GuardianImages from "../components/component/GuardianImages";
import { useGuardianContext } from '../hooks/useGuardianContext';
import { format } from 'timeago.js';
import { useEffect, useState } from "react";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { initAppState, initPagination, initUserDetails } from "../utility/initVaraibles";
import { userAPI } from "../app/api-calls/user.api";
import RenderTemplate from "../components/RenderTemplate";
import PostSkeletonLoading from "../components/skeletonLoading/PostSkeletonLoading";
import { Article } from "../components/dashbord/Article";
import { postAPI } from "../app/api-calls/post.api";
import useObserver from "../hooks/useObserver";
import Loading from "../components/Loading";
import { reduceTextLength } from "../utility/helpers";
import SkeletonLoading from "../components/skeletonLoading/SkeletonLoading";

export default function Profile() {
  const { userId } = useParams();
  const { theme } = useGuardianContext() as GuardianContextType;
  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const [appPostState, setAppPostState] = useState<AppStateType>(initAppState);
  const [user, setUser] = useState<UserType>(initUserDetails);
  const [posts, setPosts] = useState<PostType[]>([]);
  // const [type, setType] = useState<CategoryType>('General');
  const [expandDetail, setExpandDetail] = useState<ExpandDetailsType>(
    { id: '', toggle: 'CLOSE' }
  );
  const [paginate, setPaginate] = useState<Pagination>(initPagination);
  const [postQuery] = useState<Omit<PostQuery, 'type'>>({
    pageNumber: 1, limit: 5,
  });
  const { observerRef } = useObserver(
    { screenPosition: '0px', threshold: 0.4 },
  );
  const navigate = useNavigate();

  const { pageNumber } = postQuery;
  const { pagesLeft } = paginate;
  const { loading } = appState;
  const {
    loading: loadingPosts, isError: isErrorPosts, error: errorPosts,
  } = appPostState;

  useEffect(() => {
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const res = await userAPI.getUser(userId as string);
      setUser(res.data)
    }, setAppState);
  }, [userId])
  
  useEffect(() => {
    guardianAsyncWrapper(async () => {
      setAppPostState(prev => ({ ...prev, loading: true }));
      const res = await postAPI.findPosts({
        pageNumber: pageNumber as number, limit: 5, type: 'General'
      });
      setPaginate(res.data.pageable)
      setPosts(res.data.data);
    }, setAppPostState);
  }, [setAppPostState, setPaginate, setPosts, pageNumber])

  const sortedPosts = posts?.slice().sort((a, b) => b.createdAt.localeCompare(a?.createdAt));

  return (
    <main className="page flex flex-col gap-y-8 px-2 py-4 h-full w-full overflow-y-scroll">
      <div className="flex gap-x-3 maxmobile:flex-col text-sm w-full">
        <GuardianImages
          imageUri={user.profilePicture ?? ''}
          alt={user.firstName} textSize="text-6xl" isLoading={loading}
          classNames="maxmobile:self-center flex-none size-40 rounded-full" imageClassNames="rounded-full"
        />

        <div className="flex flex-col gap-y-2 w-full">
          {user?.title ? <p className={`border-0 border-b border-b-[#b1adad] w-full`}>{user?.title}</p> : null}
          <p className="mt-3 text-[13px] w-full">
            {reduceTextLength(user.bio as string, 450)}
          </p>

          {/* <div>
            communities
          </div> */}
        </div>
      </div>
      {
        loading ?
          <div className="border-0 maxmobile:border-b self-start w-full flex flex-col">
            <SkeletonLoading classes="title width-50" />
            <SkeletonLoading classes="text width-50" />
          </div>
        :
          <div className="border-0 maxmobile:border-b -mt-2 self-start w-full flex flex-col items-cente gap-y-2 flex-wrap text-sm">
            <h4>{user?.firstName} {user?.lastName}</h4>
            <p className="flex items-center gap-x-3">
              <span>{user?.location?.address}</span>
              <span className="capitalize">{user?.location?.country}</span>
            </p>
            <span className="font-sans">Joined {format(user.createdAt!)}</span>

            <div className={`flex items-center gap-x-1 text-white`}>
              <span className={`${theme === 'light' ? 'text-[#2c2c2c]' : 'text-[#e6e2e2]'}`}>Skills:</span>
              <p className="flex items-center gap-x-1">
                {
                  ['c', 'java', 'programming', 'c#']?.map((skill) => (
                    <span key={skill}
                    className="p-0.5 bg-[#333333] rounded-[3px] px-2"
                    >{skill}</span>
                  ))
                }
              </p>
            </div>

            {/* <div className="flex flex-col">
              <p>
                <span>Forums</span>
                <span></span>
              </p>
            </div> */}
          </div>
      }
      <button 
      onClick={() => navigate(`/edit-profile/${user._id}`)}
      className={`p-2 rounded-md ${theme === 'light' ? 'border-[#0f7743] bg-[#757474]' : 'border-[#335544] bg-[#333333]'} text-white border border-[#335544] lg:w-1/2 hover:opacity-95 transition-opacity`}
      >
        Edit profile
      </button>

      <section className="border-0 border-t -mt-2 py-2 flex flex-col w-full">
        <p className="text-xs">Your posts and posts you engaged in</p>

        <RenderTemplate
          defaultMessage={'No Posts Available'}
          isLoading={loadingPosts} isError={isErrorPosts} content={sortedPosts}
          LoadingComponent={PostSkeletonLoading} error={errorPosts}
          classNames="gap-y-5 w-full"
        >
          {
            sortedPosts?.map((post) => (
              <Article key={post._id} post={post} setPosts={setPosts}
                expandDetail={expandDetail} setExpandDetail={setExpandDetail}
                page='PROFILE'
              />
            ))
          }
        </RenderTemplate>

        <section ref={observerRef}
      className="flex items-center justify-center"
      >
        {loadingPosts ? <Loading classNames="size-10 self-center" /> : null}
        <span>
          {
          pagesLeft === 0 
          ? 'No more posts' 
          : `${pagesLeft} ${pagesLeft === 1 ? 'page' : 'pages'} left`
          }
        </span>
      </section>

      </section>
    </main>
  )
}