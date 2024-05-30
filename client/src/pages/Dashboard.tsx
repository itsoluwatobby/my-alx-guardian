import PostSkeletonLoading from "../components/skeletonLoading/PostSkeletonLoading";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import useDeboundedInput from "../hooks/useDeboundedInput";
import RenderTemplate from "../components/RenderTemplate";
import { Article } from "../components/dashbord/Article";
import { initAppState } from "../utility/initVaraibles";
import { MetaTags } from "../layouts/MetaTagsOGgraph";
import { Input } from "../components/component/Input";
import { sanitizeEntries } from "../utility/helpers";
import { postAPI } from "../app/api-calls/post.api";
import { MAX_LENGTH } from "../utility/constants";
import { useEffect, useState } from "react";
import useObserver from "../hooks/useObserver";
import Loading from "../components/Loading";

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
  const { observerRef } = useObserver(
    { screenPosition: '0px', threshold: 0.4 },
  );
  const [appState, setAppState] = useState<AppStateType>(initAppState);

  const [appState1, setAppState1] = useState<AppStateType>(initAppState);
  const [startSearch, setStartSearch] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [paginate, setPaginate] = useState<Pagination>({
    pages: { previous: null, current: null, next: null },
    length: 0, pagesLeft: 0, numberOfPages: 0,
  });
  const [postQuery] = useState<PostQuery>({
    pageNumber: 1, limit: 100,
  });
// setPostQuery

  const { pagesLeft } = paginate;
  // const { pages, pagesLeft } = paginate;
  // console.log(postQuery)

  const { loading, isError, error } = appState;
  const { loading: loading1 } = appState1;
  const { pageNumber, limit } = postQuery;

  useEffect(() => {
    if (!val || isTyping || loading) return;
    guardianAsyncWrapper(async () => {
      if (val.length < 3) return;
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
      setPaginate(res.data.pageable)
      setPosts(res.data.data);
    }, setAppState1);
  }, [pageNumber, limit])

  // useEffect(() => {
  //   if (isIntersecting && pages.next !== null && pagesLeft !== 0) {
  //     setPostQuery(prev => ({
  //       ...prev, pageNumber: prev.pageNumber + 1,
  //       limit: prev.limit,
  //     }));
  //   }
  // }, [pages.previous, pages.next, isIntersecting, pagesLeft])

  const sortedPosts = posts.slice().sort((a, b) => b.createdAt.localeCompare(a?.createdAt))

  return (
    <section className="flex flex-col flex-auto rounded-md overflow-y-scroll h-full shadow-md p-3 pb-10 px-2">
      <MetaTags
        title='Dashboard'
        description='Post page for all content'
        url=''
        image=''
      />
      <div
        onClick={() => setStartSearch(prev => !prev)}
        className="w-full flex justify-end z-20 sticky top-0">
        <Input
          search={search} setSearch={setSearch}
          classNames={`${startSearch ? 'w-full' : 'w-8 hover:scale-[1.05]'} transition-transform rounded-full active:scale-[1] transition-transform`}
          placeholder=""
          searchClassNames=""
          inputClassNames={`hidden w-8 rounded-full`}
        />
      </div>

      <RenderTemplate
        defaultMessage={'No Posts Available'}
        isLoading={loading1} isError={isError} content={sortedPosts}
        LoadingComponent={PostSkeletonLoading} error={error}
      >
        {
          sortedPosts?.map((post) => (
            <Article key={post._id} post={post} setPosts={setPosts}
              expandDetail={expandDetail} setExpandDetail={setExpandDetail}
            />
          ))
        }
      </RenderTemplate>
      <section ref={observerRef}
      className="flex items-center justify-center"
      >
        {loading1 ? <Loading classNames="size-10 self-center" /> : null}
        <span>{pagesLeft === 0 ? 'No more posts' : ''}</span>
      </section>
    </section>
  )
}