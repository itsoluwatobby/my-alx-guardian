import { guardianAsyncWrapper } from "../../app/guardianAsyncWrapper"
import { useGuardianContext } from "../../hooks/useGuardianContext"
import { initAppState } from "../../utility/initVaraibles"
import GuardianImages from "../component/GuardianImages"
import { userAPI } from "../../app/api-calls/user.api";
import { useEffect, useRef, useState } from "react"
import UserDetails from "../component/UserDetails"
import PostInteraction from "./PostInteraction"
import Comments from "../comments/Comments"
import ReactMarkdown from 'react-markdown';
import ProfilePopup from "../ProfilePopup"
import { Link, useNavigate } from "react-router-dom"
import { MdCancel, MdDeleteForever, MdEdit, MdMoreHoriz } from "react-icons/md";
import { postAPI } from "../../app/api-calls/post.api";

type ArticleProp = {
  post: PostType;
  expandDetail: ExpandDetailsType;
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  setExpandDetail: React.Dispatch<React.SetStateAction<ExpandDetailsType>>;
}

export const Article = ({ post, setPosts, expandDetail, setExpandDetail }: ArticleProp) => {
  const { theme, loggedInUserId } = useGuardianContext() as GuardianContextType;
  const userRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>({} as UserType);

  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const [appState2, setAppState2] = useState<AppStateType>(initAppState);
  const navigate = useNavigate();

  const { loading } = appState;

  useEffect(() => {
    if (!userRef.current) return;
    if (!popupRef.current) return;
    if (userRef.current.onmouseenter) setReveal(true);
    if (popupRef.current.onmouseenter) setReveal(true);
    // userRef.current.addEventListener('mouseleave', () => {
    //   if (popupRef.current.onmouseenter) setReveal(true);
    //   else setReveal(false);
    // popupRef.current.addEventListener('mouseleave', () => setReveal(false));
    // setReveal(false)
    // });
  }, [])

  useEffect(() => {
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const res = await userAPI.getUser(post.userId);
      setUser(res.data)
    }, setAppState);
  }, [post.userId])

  const handleDeleteComment = () => {
    if (appState2.loading) return;
    guardianAsyncWrapper(async () => {
      setAppState2(prev => ({ ...prev, loading: true }));
      const { _id } = post;
      await postAPI.delete_post({ postId: _id });
      setPosts(prev => ([...prev.filter(filt => filt._id !== _id)]));
    }, setAppState2);
  }

  return (
    <article className="relative flex gap-2">
      <GuardianImages
        imageUri={user?.profilePicture ?? ''}
        alt={user?.firstName ?? ''} isLoading={loading}
        classNames="cursor-pointer hover:scale-[1.03] hover:animate-spin transition-transform flex-none w-10 h-10 border-2 border-gray-200 rounded-full"
        imageClassNames="rounded-full hover:animate-spin transition-transform"
      />
      {/* work on the popup */}
      <ProfilePopup
        name="User 1" reveal={reveal} popupRef={popupRef}
        classNames="z-10 top-5"
      />

      <MdMoreHoriz
        onClick={() => setOpenToggle(prev => !prev)}
        className={`absolute right-4 size-5 ${post.userId === loggedInUserId ? '' : 'hidden'} ${openToggle ? 'hidden' : ''} cursor-pointer hover:scale-[1.03] active:scale-[1] transition-transform`} />

      <div className={`${openToggle ? 'flex' : 'hidden'} items-center text-2xl gap-x-2 absolute top-0 right-0`}>
        <MdEdit
          onClick={() => {
            navigate(`/edit-post/${post._id}`)
            setOpenToggle(false)
          }}
          className={`cursor-pointer hover:scale-[1.03] active:scale-[1] transition-transform`} />
        <MdDeleteForever
          onClick={() => {
            handleDeleteComment()
            setOpenToggle(false)
          }}
          className={`cursor-pointer hover:scale-[1.03] active:scale-[1] transition-transform`} />
        <MdCancel
          onClick={() => setOpenToggle(false)}
        />
      </div>

      <section className="flex flex-col gap-1">
        <div className={`${appState2.loading ? 'animate-pulse' : ''} flex flex-col text-sm`}>
          <UserDetails
            name={user?.firstName} userRef={userRef}
            date={post.createdAt ?? new Date()}
          />
          <Link to={`/post/${post._id}`} className="text-[13px] flex flex-col cursor-default mt-1">
            <ReactMarkdown>{post?.body ?? ''}</ReactMarkdown>
          </Link>
        </div>

        <PostInteraction
          setExpandDetail={setExpandDetail} loggedInUserId={loggedInUserId}
          post={post} setPosts={setPosts} theme={theme} expandDetail={expandDetail}
        />

        <Comments
          setExpandDetail={setExpandDetail} setPosts={setPosts}
          expandDetail={expandDetail} postId={post._id} 
          
          />

      </section>

    </article>
  )
}