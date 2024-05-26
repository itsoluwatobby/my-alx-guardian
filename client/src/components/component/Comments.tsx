import { useCallback, useRef, useState } from "react";
import { useGuardianContext } from "../../hooks/useGuardianContext";
import { checkCount } from "../../utility/helpers";
import { MdSend } from "react-icons/md";
import guardianAsyncWrapper from "../../app/guardianAsyncWrapper";
import GuardianImages from "./GuardianImages";
import UserDetails from "./UserDetails";
import { TextArea } from "./TextAreaInput";
import { FaHeart } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

type CommentsProps = {
  expandDetail: ExpandDetailsType;
  setExpandDetail: React.Dispatch<React.SetStateAction<ExpandDetailsType>>;
  post: { id: string };
}

export default function Comments({ expandDetail, setExpandDetail, post }: CommentsProps) {
  const { theme } = useGuardianContext() as GuardianContextType;
  const [input, setInput] = useState<string>('');
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);

  const { loading } = appState;

  const handleSubmit = async () => {
    return guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }))
    }, setAppState);
  }

  const scrollRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      ref={expandDetail.toggle === 'CLOSE' ? null : scrollRef}
      className={`shadow-lg ${theme === 'light' ? 'bg-gradient-to-b from-[#fae2ef] from-[60%] to-transparent' : 'bg-gradient-to-b from-[#333333] from-[40%] to-[#606060] text-[#ffffff]'} w-full min-h-40 max-h-64 rounded-lg ${(expandDetail?.id === post.id && expandDetail.toggle === 'OPEN') ? 'translate-0' : 'hidden'} p-2 pt-1 text-sm flex flex-col`}>
      <div className="flex w-full justify-between items-center">
        <p className="w-fit font-sans opacity-90">Comments</p>
        <button title="close" 
        onClick={() => setExpandDetail({ id: '', toggle: 'CLOSE' })}
        className="rounded-sm px-2 py-0.5 shadow-md bg-gray-600">
          <FaTimes />
        </button>
      </div>

      <div className="flex flex-col flex-auto p-1 pb-4 overflow-y-scroll mb-2 gap-y-2">
        {
          [...Array(10).keys()].map((i) => (
            <Comment key={i} theme={theme} />
          ))
        }
      </div>

      <div 
      className="self-baseline w-full flex-none h-12 flex items-center gap-1">
        <TextArea 
        input={input} setInput={setInput}
          classNames="w-[90%] h-full" placeholder="write a comment" max={200}
          inputClassNames="p-1"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 h-9 rounded-md text-xl w-14 grid place-content-center">
          {loading ?
            <div className="border-2 border-r-[#333333] rounded-full animate-spin w-4 h-4"></div>
            : <MdSend />
          }
        </button>
      </div>
    </div>
  )
}

type CommentProps = {
  theme: Theme;
}

const Comment = ({ theme }: CommentProps) => {
  const userRef = useRef<HTMLDivElement>(null);
  const [expand, setExpand] = useState<boolean>(false);

  // const scrollRef = useCallback((node: HTMLDivElement) => {
  //   if (node) {
  //     node.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, []);

  return (
    <div
      // ref={scrollRef}
      className="w-full flex gap-2">
      <GuardianImages
        imageUri="" alt='User 1'
        classNames="flex-none rounded-full w-6 h-6 border shadow-inner"
        imageClassNames="rounded-full"
      />

      <div className="flex flex-col">
        <UserDetails
          classNames={'text-[11px]'}
          name="User 1" userRef={userRef}
          date={new Date(new Date().getTime() - 6 * 60 * 60 * 924)}
        />

        <div className="w-full">
          <p
            onClick={() => setExpand(prev => !prev)}
            className={`text-xs w-full ${expand ? '' : 'line-clamp-2'} cursor-default transition-all`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt magnam, earum, veniam ut nesciunt nisi sequi iure tenetur voluptas explicabo aspernatur modi itaque autem! Sapiente quibusdam consequatur hic quos quaerat!</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <FaHeart className={`${theme === 'light' ? 'text-[#333333]' : ''} cursor-pointer hover:scale-[1.02] active:scale-[1] transition-transform size-3`} />
              <span className="text-[11px] font-sans">{checkCount(5)}</span>
            </div>

            <span className="text-[10px] cursor-pointer hover:opacity-100">Reply</span>
          </div>
        </div>
      </div>
    </div>
  )
}