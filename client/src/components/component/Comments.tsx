import { useState } from "react";
import { useGuardianContext } from "../../hooks/useGuardianContext";
import { checkCount } from "../../utility/helpers";
import { Input } from "./Input";
import { MdSend } from "react-icons/md";
import guardianAsyncWrapper from "../../app/guardianAsyncWrapper";

type CommentsProps = {
  expandDetail: ExpandDetailsType;
  post: { id: string };
}

export default function Comments({ expandDetail, post }: CommentsProps) {
  const { theme } = useGuardianContext() as GuardianContextType;
  const [input, setInput] = useState<string>('');
  const [appState, setAppState] = useState<AppStateType>({} as AppStateType);

  const { loading, isError } = appState;

  const handleSubmit = async() => {
    return guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }))
    }, setAppState);
  }

  return (
    <div className={`${theme === 'light' ? 'bg-gradient-to-b from-[#fae2ef] from-[60%] to-transparent' : 'bg-gradient-to-b from-[#333333] from-[40%] to-[#606060] text-[#ffffff]'} overflow-y-scroll w-full min-h-40 max-h-72 rounded-lg ${(expandDetail?.id === post.id && expandDetail.toggle === 'OPEN') ? 'translate-0' : 'hidden'} p-2 pt-1 text-sm flex flex-col`}>
      <p className="w-fit font-sans">Comments {checkCount(5)}</p>
      <div className="relative flex flex-auto h-full">

        <div className="absolute bottom-0 w-full flex items-center gap-1">
          <Input search={input} setSearch={setInput} 
          classNames="w-[90%]" excludeSearch={true} placeholder="write a comment"
          inputClassNames="px-2"
          />
          <button 
          onClick={handleSubmit}
          className="bg-blue-500 h-10 rounded-md text-2xl w-14 grid place-content-center">
            {loading ? 
              <div className="border-2 border-r-[#333333] rounded-full animate-spin w-4 h-4"></div> 
              : <MdSend />
            } 
          </button> 
        </div>
      </div>
    </div>
  )
}