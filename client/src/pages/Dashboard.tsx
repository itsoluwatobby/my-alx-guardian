import { Input } from "../components/component/Input";
import { useEffect, useState } from "react";
import { Article } from "../components/dashbord/Article";
import { MetaTags } from "../layouts/MetaTagsOGgraph";
import useDeboundedInput from "../hooks/useDeboundedInput";
import { MAX_LENGTH } from "../utility/constants";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { sanitizeEntries } from "../utility/helpers";
import { postAPI } from "../app/api-calls/post.api";
import { initAppState } from "../utility/initVaraibles";

type SearchResult = {
  prevQuery: string;
  result: PostType[] | UserType[] | CategoryObjType[];
}
export default function Dashboard() {
  const [search, setSearch] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult>({
    prevQuery: '', result: []
  });
  const { val, isTyping } = useDeboundedInput(search, MAX_LENGTH.DEBOUNCE);
  const [expandDetail, setExpandDetail] = useState<ExpandDetailsType>(
    { id: '', toggle: 'CLOSE' }
  );
  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const [appState1, setAppState1] = useState<AppStateType>(initAppState);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postQuery, setPostQuery] = useState<PostQuery>({
    pageNumber: 1, limit: 5,
  });

  const { loading } = appState;
  const { loading: isLoading, res } = appState1;
  const { pageNumber, limit } = postQuery;

  useEffect(() => {
    if (!val || isTyping || loading) return;
    guardianAsyncWrapper(async () => {
      if (searchResult.prevQuery === val) return;
      setAppState(prev => ({ ...prev, loading: true }));
      const searchQuery = sanitizeEntries({ val })
      const res = await postAPI.searchPost(searchQuery.val);
      console.log(res);
      setSearchResult({ prevQuery: val, result: res.data })
    }, setAppState);
  }, [isTyping, val, loading, searchResult.prevQuery])

  useEffect(() => {
    guardianAsyncWrapper(async () => {
      setAppState1(prev => ({ ...prev, loading: true }));
      const res = await postAPI.findPosts({ pageNumber, limit });
      // console.log(res);
      setAppState1(prev => ({ ...prev, res: res.data?.pageable }))
      setPosts(res.data.data);
    }, setAppState1);
  }, [pageNumber, limit])

  console.log(res);

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