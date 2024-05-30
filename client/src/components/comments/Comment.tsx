import { FaHeart } from 'react-icons/fa6';
import { checkCount } from '../../utility/helpers';
import UserDetails from '../component/UserDetails';
import GuardianImages from '../component/GuardianImages';
import { useEffect, useRef, useState } from 'react';
import { guardianAsyncWrapper } from '../../app/guardianAsyncWrapper';
import { initAppState } from '../../utility/initVaraibles';
import { userAPI } from '../../app/api-calls/user.api';
import { commentAPI } from '../../app/api-calls/comment.api';
import { postAPI } from '../../app/api-calls/post.api';
import { MdCancel, MdDeleteForever, MdEdit, MdMoreHoriz } from 'react-icons/md';

type CommentProps = {
  theme: Theme;
  loggedInUserId: string
  edit: CommentType;
  comment: CommentType;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setEdit: React.Dispatch<React.SetStateAction<CommentType>>;
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}
export const Comment = ({ theme, comment, edit, setEdit, setInput, setPosts, loggedInUserId, setComments }: CommentProps) => {
  const userRef = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState<boolean>(comment?.likes.includes(loggedInUserId) ?? false);
  const [expand, setExpand] = useState<boolean>(false);
  const [reload, setReload] = useState<number>(0);
  const [openToggle, setOpenToggle] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>({} as UserType);

  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const [appState1, setAppState1] = useState<AppStateType>(initAppState);
  const [appState2, setAppState2] = useState<AppStateType>(initAppState);

  const { loading } = appState;

  // const scrollRef = useCallback((node: HTMLDivElement) => {
  //   if (node) {
  //     node.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, []);

  const handleDeleteComment = () => {
    if (appState2.loading) return;
    guardianAsyncWrapper(async () => {
      setAppState2(prev => ({ ...prev, loading: true }));
      const { _id } = comment;
      await commentAPI.delete_comment({ id: _id });
      setComments(prev => ([...prev.filter(filt => filt._id !== _id)]));
      setReload(prev => prev + 1)
    }, setAppState2);
  }

  useEffect(() => {
    if (!comment?.userId) return;
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const res = await userAPI.getUser(comment.userId);
      setUser(res.data)
    }, setAppState);
  }, [comment.userId])

  useEffect(() => {
    if (!comment?.postId) return;
    guardianAsyncWrapper(async () => {
      console.log('run')
      const res = await postAPI.getPost(comment.postId);
      setPosts(prev => ([...prev.filter(filt => filt._id !== comment.postId), res.data]));
    }, () => { });
  }, [setPosts, comment.userId, comment.postId, reload])

  const toggleLike = () => {
    if (appState1.loading) return;
    guardianAsyncWrapper(async () => {
      setAppState1(prev => ({ ...prev, loading: true }));
      const res = await commentAPI.likeComment({ id: comment._id, userId: loggedInUserId });
      setComments(prev => ([...prev.filter(filt => filt._id !== comment._id), res.data]));
      setIsLiked(res.data.likes.includes(loggedInUserId));
    }, setAppState1);
  }

  return (
    <div
      // ref={scrollRef}
      className={`${edit._id === comment._id ? 'opacity-50' : ''} w-full flex gap-2 relative ${appState2.loading ? 'animate-pulse' : ''}`}>
      <GuardianImages
        imageUri={user.profilePicture} alt={user?.firstName ?? ''}
        classNames="flex-none rounded-full w-6 h-6 border shadow-inner"
        imageClassNames="rounded-full"
      />

      <MdMoreHoriz
        onClick={() => setOpenToggle(prev => !prev)}
        className={`absolute right-4 size-5 ${comment.userId === loggedInUserId ? '' : 'hidden'} ${openToggle ? 'hidden' : ''} cursor-pointer hover:scale-[1.03] active:scale-[1] transition-transform`} />

      <div className={`${openToggle ? 'flex' : 'hidden'} items-center text-xl gap-x-1 absolute top-2 right-0`}>
        <MdEdit
          onClick={() => {
            setInput(comment.comment)
            setEdit(comment)
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

      <div className="flex flex-col">
        <UserDetails
          classNames={'text-[11px]'}
          name={user?.firstName ?? ''} userRef={userRef}
          date={comment?.createdAt ?? new Date()}
        />


        <div
          onClick={() => setOpenToggle(false)}
          className="w-[85%]">
          <p
            onClick={() => setExpand(prev => !prev)}
            className={`text-xs w-full ${expand ? '' : 'line-clamp-2'} cursor-default transition-all`}>{comment?.comment ?? ''}</p>

          <div className="flex items-center gap-6 mt-1">
            <div className="flex items-center gap-1">
              <FaHeart
                onClick={toggleLike}
                className={`${isLiked ? (theme === 'light' ? 'text-slate-700' : '') : 'text-[#1e1b1b]'} ${loading ? 'opacity-70 cursor-default' : ''} cursor-pointer hover:scale-[1.07] active:scale-[1] transition-transform size-4`} />
              <span className="text-[11px] font-sans">{checkCount(comment?.likes?.length ?? 0)}</span>
            </div>

            <span className="text-[11px] cursor-pointer hover:opacity-100">Reply</span>
          </div>
        </div>
      </div>
    </div>
  )
}