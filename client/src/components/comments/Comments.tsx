import { useEffect, useState } from "react";
import { useGuardianContext } from "../../hooks/useGuardianContext";
import { MdSend } from "react-icons/md";
import { guardianAsyncWrapper } from "../../app/guardianAsyncWrapper";
import { TextArea } from "../component/TextAreaInput";
import { FaTimes } from "react-icons/fa";
import { Comment } from "./Comment";
import Loading from "../Loading";
import { initAppState } from "../../utility/initVaraibles";
import { commentAPI } from "../../app/api-calls/comment.api";
import CommentSkeletonLoading from "../skeletonLoading/CommentSkeleton";
import RenderTemplate from "../RenderTemplate";

type CommentsProps = {
  postId: string;
  expandDetail: ExpandDetailsType;
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  setExpandDetail: React.Dispatch<React.SetStateAction<ExpandDetailsType>>;
  // setReload: React.Dispatch<React.SetStateAction<number>>;
}

export default function Comments({ expandDetail, setPosts, setExpandDetail, postId }: CommentsProps) {
  const { theme, loggedInUserId } = useGuardianContext() as GuardianContextType;
  const [input, setInput] = useState<string>('');
  const [edit, setEdit] = useState<CommentType>({} as CommentType);

  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const [appState1, setAppState1] = useState<AppStateType>(initAppState);
  const [appState2, setAppState2] = useState<AppStateType>(initAppState);

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentQuery] = useState<CommentQuery>({
    pageNumber: 1, limit: 50, postId: '',
  });
// setCommentQuery
  const { loading, isError, error } = appState;
  const { loading: loading1 } = appState1;
  const { pageNumber, limit } = commentQuery;

  const handleSubmit = async () => {
    if (loading1) return;
    return guardianAsyncWrapper(async () => {
      setAppState1(prev => ({ ...prev, loading: true }))
      const newComment: CreateCommentRequest = {
        userId: loggedInUserId, comment: input, postId,
      }
      const res = await commentAPI.createComment(newComment);
      setComments(prev => ([res.data, ...prev]));
      setInput('');
    }, setAppState1);
  }

  const handleEditComment = () => {
    if (appState2.loading) return;
    guardianAsyncWrapper(async () => {
      setAppState2(prev => ({ ...prev, loading: true }));
      const { _id, userId, postId } = edit;
      const res = await commentAPI.updateComment({
        id: _id, userId, postId, comment: input,
      });
      setComments(prev => ([...prev.filter(filt => filt._id !== edit._id), res.data]));
      setInput('')
      setEdit({} as CommentType);
    }, setAppState2);
  }

  useEffect(() => {
    if (expandDetail.toggle === 'OPEN') {
      guardianAsyncWrapper(async () => {
        setAppState(prev => ({ ...prev, loading: true }));
        const res = await commentAPI.findComments(
          { pageNumber, limit, postId: expandDetail.id },
        );
        setAppState(prev => ({ ...prev, res: res.data?.pageable }))
        setComments(res.data.data);
      }, setAppState);
    }
  }, [pageNumber, limit, expandDetail.toggle, expandDetail.id])

  // const scrollRef = useCallback((node: HTMLDivElement) => {
  //   if (node) {
  //     node.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [])
  const canSubmit = Boolean(input);
  const sortedComments = comments.slice().sort((a, b) => b.createdAt.localeCompare(a?.createdAt))


  return (
    <div
      // ref={expandDetail.toggle === 'CLOSE' ? null : scrollRef}
      className={`shadow-lg ${theme === 'light' ? 'bg-gradient-to-b from-[#bebebe] from-[60%] to-transparent' : 'bg-gradient-to-b from-[#333333] from-[40%] to-[#4e4d4d] text-[#ffffff]'} w-full min-h-40 max-h-64 rounded-lg ${(expandDetail?.id === postId && expandDetail.toggle === 'OPEN') ? 'translate-0' : 'hidden'} p-2 pt-1 text-sm flex flex-col`}>
      <div className="flex w-full justify-between items-center pt-1 pb-2 shadow-sm">
        <p className="w-fit font-sans opacity-90">Comments</p>
        <button title="close"
          onClick={() => setExpandDetail({ id: '', toggle: 'CLOSE' })}
          className="rounded-sm px-2 py-0.5 shadow-md bg-gray-600 text-white">
          <FaTimes />
        </button>
      </div>
  
      <RenderTemplate
        defaultMessage={'post a comment'}
        isLoading={loading} isError={isError} content={sortedComments}
        LoadingComponent={CommentSkeletonLoading} error={error}
        classNames="flex-auto py-0 p-1 pb-4 overflow-y-scroll mb-2 gap-y-1"
        extraClassNames="text-base"
      >
        {
          sortedComments?.map((post) => (
            <Comment 
              edit={edit} key={post._id} loggedInUserId={loggedInUserId}
              comment={post} setComments={setComments} theme={theme}
              setPosts={setPosts} setEdit={setEdit} setInput={setInput}
            />
          ))
        }
      </RenderTemplate>

      <div
        className="self-baseline w-full flex-none h-12 flex items-center gap-1">
        <TextArea
          input={input} setInput={setInput}
          classNames="w-[90%] h-full shadow-md" placeholder="write a comment" max={200}
          inputClassNames="p-1"
        />
        <button
          disabled={!loading1 && !canSubmit}
          onClick={edit?._id ? handleEditComment : handleSubmit}
          className={`${input ? 'bg-blue-500' : 'cursor-not-allowed bg-blue-800'} ${loading ? '' : ''} transition-colors h-9 rounded-md text-xl text-white w-14 grid place-content-center py-1 px-4 mr-1`}>{loading1 ? <Loading classNames='size-3' /> : <MdSend />}
        </button>
      </div>
    </div>
  )
}
