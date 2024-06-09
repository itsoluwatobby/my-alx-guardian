import { FaCommentDots, FaShare } from "react-icons/fa6";
import { useParams } from "react-router-dom"
import { checkCount, reduceTextLength } from "../utility/helpers";
import { FaHeart } from "react-icons/fa";
import ShareButton from "../components/ShareButton";
import GuardianImages from "../components/component/GuardianImages";
import UserDetails from "../components/component/UserDetails";
// import ProfilePopup from "../components/ProfilePopup";
import { useCallback, useEffect, useRef, useState } from "react";
import Comments from "../components/comments/Comments";
import { useGuardianContext } from "../hooks/useGuardianContext";
import useObserver from "../hooks/useObserver";
import ReactMarkdown from 'react-markdown';
import { postAPI } from "../app/api-calls/post.api";
import { initAppState } from "../utility/initVaraibles";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { userAPI } from "../app/api-calls/user.api";
import PostSkeletonLoading from "../components/skeletonLoading/PostSkeletonLoading";

export default function Post() {
  const { postId } = useParams();
  const { isIntersecting, observerRef } = useObserver({ screenPosition: '0px', threshold: 0.35 });

  const [post, setPost] = useState<PostType>({} as PostType);
  const { setCurrentPost, theme, loggedInUserId, setShowTitle } = useGuardianContext() as GuardianContextType;
  const userRef = useRef<HTMLDivElement>(null);
  // const popupRef = useRef<HTMLElement>(null);
  // const [reveal, setReveal] = useState<boolean>(false);

  const [isLiked, setIsLiked] = useState<boolean>(post?.likes?.includes(loggedInUserId) ?? false);
  const [user, setUser] = useState<UserType>({} as UserType);
  const [share, setShare] = useState<boolean>(false);

  const [appState, setAppState] = useState<AppStateType>(initAppState);

  const [platform, setPlatform] = useState<Platform>({
    link: '', name: 'pass'
  });
  const [appStateGetUser, setAppStateGetUser] = useState<AppStateType>(initAppState);
  const [appStateShare, setAppStateShare] = useState<AppStateType>(initAppState);
  const [appStateToggleLike, setAppStateToggleLike] = useState<AppStateType>(initAppState);
  const [expandDetail, setExpandDetail] = useState<ExpandDetailsType>(
    { id: '', toggle: 'CLOSE' }
  );

  // const scrollRef = useCallback((node: HTMLDivElement) => {
  //     if (node) {
  //       node.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }, []);

  useEffect(() => {
    if (!postId) return;
    console.log(postId)
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const res = await postAPI.getPost(postId);
      console.log(res)
      setPost(res.data);
      setCurrentPost(res.data)
    }, setAppState);
  }, [postId, setCurrentPost])
  
  const reloaded = () => {
    guardianAsyncWrapper(async () => {
      // setAppState(prev => ({ ...prev, loading: true }));
      const res = await postAPI.getPost(postId as string);
      setPost(res.data);
      setCurrentPost(res.data)
    }, () => {});
  }

  useEffect(() => {
    if (!post.userId) return;
    guardianAsyncWrapper(async () => {
      setAppStateGetUser(prev => ({ ...prev, loading: true }));
      const res = await userAPI.getUser(post.userId);
      setUser(res.data)
    }, setAppStateGetUser);
  }, [post.userId])

  const toggleLike = () => {
    if (appStateToggleLike.loading) return;
    guardianAsyncWrapper(async () => {
      setAppStateToggleLike(prev => ({ ...prev, loading: true }));
      const res = await postAPI.likePost({ postId: post._id, userId: loggedInUserId });
      setPost(res.data);
      setIsLiked(res.data.likes.includes(loggedInUserId));
    }, setAppStateToggleLike);
  }

  const classes = useCallback(() => {
    return 'text-white cursor-pointer hover:scale-[1.02] active:scale-[1] transition-transform size-5'
  }, [])

  useEffect(() => {
    if (post._id) {
      const path = window.location;
      const link = `${path.protocol}//${path.hostname}/post/${post._id}`;
      setPlatform(prev => ({ ...prev, link }));
    }
  }, [post._id])

  useEffect(() => {
    if (platform.name !== 'pass') {
      if (appStateShare.loading) return;
      guardianAsyncWrapper(async () => {
        setAppStateShare(prev => ({ ...prev, loading: true }));
        await postAPI.sharePost(
          { postId: post._id, userId: loggedInUserId, platform },
        );
        setPlatform(prev => ({ ...prev, name: 'pass' }))
      }, setAppStateShare);
    }
  }, [platform, loggedInUserId, post._id, appStateShare.loading])

  useEffect(() => {
    let isMounted = true;
    isMounted ? setShowTitle(isIntersecting) : null;
    return () => {
      isMounted = false;
    }
  }, [isIntersecting, setShowTitle])

  return (
    <div
      className="page relative flex flex-col gap-2 h-full w-full p-4 md:px-10 overflow-y-scroll">
      <section
        ref={observerRef}
        className={`${isIntersecting ? 'scale-1' : 'scale-0'} transition-transform flex items-center gap-x-3`}>
        <GuardianImages
          imageUri={user?.profilePicture ?? ''}
          alt={user.firstName ?? ''} isLoading={appStateGetUser.loading}
          classNames="cursor-pointer hover:scale-[1.03] hover:animate-spin transition-transform flex-none w-10 h-10 border-2 border-gray-200 rounded-full"
          imageClassNames="rounded-full hover:animate-spin transition-transform"
        />
        <UserDetails
          name={user?.firstName ?? ''} userRef={userRef}
          date={post.createdAt ?? new Date()}
        />
      </section>

      {/* <ProfilePopup
        name="User 1" reveal={reveal} popupRef={popupRef}
        classNames="z-10 top-5"
      /> */}

      <section
        // ref={expandDetail.toggle === 'CLOSE' ? null : scrollRef}
        className="relative flex flex-col gap-y-2 pb-10 w-full">
        <div className="text-[13px] w-full flex flex-col gap-y-4 cursor-default mt-1">
          {
            appState?.loading ?
              <PostSkeletonLoading />
              :
              <ReactMarkdown className="indent-3">
                {post.body}
              </ReactMarkdown>
          }
        </div>

        {/* <GuardianImages
          imageUri="/study.jpg"
          classNames="w-full max-h-60 rounded-lg"
          imageClassNames="rounded-lg"
        /> */}
        <div className={`${expandDetail.toggle === 'CLOSE' ? 'flex' : 'hidden'} fixed bottom-5 px-4 py-3 items-center w-fit gap-6 rounded-md bg-[#333333] z-10`}>
          <div className="flex items-center gap-1">
            <FaHeart title="like"
              onClick={toggleLike}
              className={`${isLiked ? (theme === 'light' ? 'text-slate-700' : '') : 'text-[#1e1b1b]'} ${appStateToggleLike.loading ? 'opacity-70 cursor-default' : ''} cursor-pointer hover:scale-[1.07] active:scale-[1] transition-transform size-5`} />
            <span className="text-xs font-sans">{checkCount(post?.likes?.length ?? 0)}</span>
          </div>

          <div className="relative flex items-center gap-1">
            <FaCommentDots
              onClick={() => setExpandDetail(
                {
                  id: post._id,
                  toggle: (expandDetail?.id === post._id && expandDetail?.toggle === 'OPEN') ? 'CLOSE' : 'OPEN'
                }
              )}
              className={classes()} />
            <span className="text-xs font-sans">{checkCount(post?.commentCount ?? 0)}</span>
          </div>

          <div className="relative">
            <FaShare title="share"
              onClick={() => setShare(prev => !prev)}
              className={classes()} />
            <ShareButton
              classNames={`absolute bg-gray-600 text-white text-2xl -top-12 left-1`}
              share={share} setShare={setShare}
              setPlatform={setPlatform}
              eventTitle={reduceTextLength(post.body, 25, 'letter')}
              link={platform.link}
              hashtags={[]}
            />
          </div>
        </div>

        <Comments
          setExpandDetail={setExpandDetail} setPosts={reloaded}
          expandDetail={expandDetail} postId={post._id} 
          />

      </section>
    </div>
  )
}