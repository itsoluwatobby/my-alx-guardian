import { FaCommentDots, FaHeart, FaShare } from "react-icons/fa6"
import ShareButton from "../ShareButton";
import { checkCount, reduceTextLength } from "../../utility/helpers";
import { useCallback, useEffect, useState } from "react";
import { guardianAsyncWrapper } from "../../app/guardianAsyncWrapper";
import { postAPI } from "../../app/api-calls/post.api";
import { initAppState } from "../../utility/initVaraibles";

type PostInteractionProps = {
  post: PostType;
  theme: Theme;
  loggedInUserId: string;
  expandDetail: ExpandDetailsType;
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>
  setExpandDetail: React.Dispatch<React.SetStateAction<ExpandDetailsType>>;
}

export default function PostInteraction({ post, setPosts, theme, loggedInUserId, setExpandDetail, expandDetail }: PostInteractionProps) {
  const [share, setShare] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(post?.likes.includes(loggedInUserId) ?? false);
  const [appState1, setAppState1] = useState<AppStateType>(initAppState);
  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const [platform, setPlatform] = useState<Platform>({
    link: '', name: 'pass'
  });

  const { loading } = appState;
  const { loading: loading1 } = appState1;

  const classes = useCallback(() => {
    return `cursor-pointer hover:scale-[1.05] active:scale-[1] transition-transform size-5`
  }, [])

  useEffect(() => {
    if (post._id) {
      const path = window.location
      const link = `${path.protocol}//${path.hostname}/post/${post._id}`;
      setPlatform(prev => ({ ...prev, link }));
    }
  }, [post._id])

  const toggleLike = () => {
    if (loading) return;
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const res = await postAPI.likePost({ postId: post._id, userId: loggedInUserId });
      setPosts(prev => ([...prev.filter(filt => filt._id !== post._id), res.data]));
      setIsLiked(res.data.likes.includes(loggedInUserId));
    }, setAppState);
  }

  useEffect(() => {
    if (platform.name !== 'pass') {
      if (loading1) return;
      guardianAsyncWrapper(async () => {
        setAppState1(prev => ({ ...prev, loading: true }));
        await postAPI.sharePost(
          { postId: post._id, userId: loggedInUserId, platform },
        );
        setPlatform(prev => ({ ...prev, name: 'pass' }))
      }, setAppState1);
    }
  }, [platform, loggedInUserId, post._id, loading1])

  return (
    <div className="mt-1 flex items-center gap-6">
      <div className="flex items-center gap-1">
        <FaHeart title="like"
          onClick={toggleLike}
          className={`${isLiked ? (theme === 'light' ? 'text-slate-700' : '') : 'text-[#1e1b1b]'} ${loading ? 'opacity-70 cursor-default' : ''} cursor-pointer hover:scale-[1.07] active:scale-[1] transition-transform size-5`} />
        <span className="text-xs font-sans">{checkCount(post?.likes.length ?? 0)}</span>
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
          classNames={`absolute bg-gray-600 text-white -top-10 left-1`}
          share={share} setShare={setShare}
          setPlatform={setPlatform}
          eventTitle={reduceTextLength(post.body, 25, 'letter')}
          link={platform.link}
          hashtags={[]}
        />
      </div>
    </div>
  )
}