import { Input } from "../components/component/Input";
import { useEffect, useState } from "react";
import { Article } from "../components/dashbord/Article";
import { MetaTags } from "../layouts/MetaTagsOGgraph";
import useDeboundedInput from "../hooks/useDeboundedInput";
import { MAX_LENGTH } from "../utility/constants";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { sanitizeEntries } from "../utility/helpers";
import { postAPI } from "../app/api-calls/post.api";

export default function Dashboard() {
  const [search, setSearch] = useState<string>('');
  const { val, isTyping } = useDeboundedInput(search, MAX_LENGTH.DEBOUNCE);
  const [expandDetail, setExpandDetail] = useState<ExpandDetailsType>(
    { id: '', toggle: 'CLOSE' }
  );
  const [appState, setAppState] = useState<AppStateType>({
    loading: false, isError: false, success: false, res: {}
    
  });

  const { loading } = appState;
console.log(loading);
useEffect(() => {
  if (!val || isTyping || loading) return;
  guardianAsyncWrapper(async () => {
      console.log(loading)
      setAppState(prev => ({ ...prev, loading: true }));
      console.log('loading')
      const searchQuery = sanitizeEntries({ val })
      const res = await postAPI.searchPost(searchQuery.val);
      console.log(res);
    }, setAppState);
  }, [isTyping, val, loading])

  return (
    <section className="flex flex-col flex-auto rounded-md overflow-y-scroll h-full shadow-md p-3 px-2">
      <MetaTags
        title='Dashboard'
        description='Post page for all content'
        url=''
        image=''
      />
      <div className="w-full flex justify-center z-20 sticky top-0">
        <Input search={search} setSearch={setSearch} />
      </div>
      <div className="flex flex-col flex-auto py-4 gap-4">
        {
          [...Array(10).keys()].map((i) => (
            <Article key={i} post={{ id: i.toString() }}
              expandDetail={expandDetail} setExpandDetail={setExpandDetail}
            />
          ))
        }
      </div>
    </section>
  )
}