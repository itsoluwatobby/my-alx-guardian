import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import { useGuardianContext } from '../hooks/useGuardianContext';
import { guardianAsyncWrapper } from '../app/guardianAsyncWrapper';
import useDeboundedInput from '../hooks/useDeboundedInput';
import { initAppState } from '../utility/initVaraibles';
import { postAPI } from '../app/api-calls/post.api';
import { MAX_LENGTH } from '../utility/constants';
import 'react-markdown-editor-lite/lib/index.css';
import localStore from '../utility/localStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import MarkdownIt from 'markdown-it';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

MdEditor.use(Plugins.AutoResize, {
  min: 200,
  max: 600
})

export const NewPost = () => {
  const { postId } = useParams();
  const { loggedInUserId, setPosts, type } = useGuardianContext() as GuardianContextType;
  const [markdownText, setMarkdownText] = useState<string>("");
  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const [appStateEdit, setAppStateEdit] = useState<AppStateType>(initAppState);

  const userId = localStore.getStorage('my-id', false) as string;
  const [editPost, setEditPost] = useState<PostType>({} as PostType);
  const [preview, setPreview] = useState<boolean>(false);

  const [isEditPost, setIsEditPost] = useState<boolean>(false);
  const { isTyping, val } = useDeboundedInput(markdownText, MAX_LENGTH.DEBOUNCE);

  const [canViewOptions] = useState({
    menu: true, md: true, html: true,
    both: false, fullScreen: true, hideMenu: true,
  });
  const navigate = useNavigate();

  const { loading } = appState;
  const { loading: loadingEdit } = appStateEdit;
  // Handle the change in the editor
  const handleChange = ({ text }: { text: string }) => setMarkdownText(text);

  useEffect(() => {
    setIsEditPost(Boolean(postId))
  }, [postId])

  useEffect(() => {
    if (isEditPost && editPost.body) {
      const hasEditPost = localStore.getStorage(postId as string, false) as string ?? '';
      setMarkdownText(hasEditPost.length > 0 ? hasEditPost : editPost.body)
    }
  }, [isEditPost, editPost.body, postId])

  useEffect(() => {
    if (!postId || loadingEdit) return;
    guardianAsyncWrapper(async () => {
      const res = await postAPI.getPost(postId);
      setEditPost(res.data)
    }, setAppStateEdit);
  }, [postId, loadingEdit])

  useEffect(() => {
    if (val?.length && !isTyping && !postId) {
      localStore.setStorage(userId, val, false)
    }
  }, [val, isTyping, userId, postId])

  useEffect(() => {
    if (val?.length && !isTyping && postId) {
      localStore.setStorage(postId, val, false)
    }
  }, [val, isTyping, postId])

  useEffect(() => {
    if (userId && !postId) {
      setMarkdownText(localStore.getStorage(userId, false) as string ?? '');
    }
  }, [userId, postId])

  const handleSubmit = () => {
    if (loading) return;
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      if (isEditPost) {
        const { _id, category, ...rest } = editPost;
        const editedPost: UpdatePostRequest = {
          ...rest,
          id: _id, body: val,
          category: { type: category.type },
        };
        const res = await postAPI.updatePost(editedPost);
        setPosts(prev => ([...prev.filter(filt => filt._id !== editedPost.id), res.data]));
        localStore.removeStorage(postId as string);
        toast.info('Post updated!');
      } else {
        const newPost: CreatePostRequest = {
          userId: loggedInUserId, body: val,
          category: { type },
        }
        const res = await postAPI.createPost(newPost);
        setPosts(prev => ([res.data, ...prev]));
        localStore.removeStorage(userId);
        toast.info('Post created!');
      }
      setMarkdownText('');
      navigate('/dashboard');
    }, setAppState);
  }

  const canSubmit = Boolean(val);

  const plugins = ['header', 'my-plugins', 'link', 'font-strikethrough', 'list-unordered', 'imag', 'clear', 'logger', 'mode-toggle', 'full-screen'];
  return (
    <div className="overflow-y-scroll flex flex-col gap-y-2 w-full transition-all h-full rounded-md">
      <div className='flex items-center justify-between w-full gap-x-3 mt-2'>
        <p className={``}>
          {!val ? '' : (isTyping ? 'saving ...' : 'saved')}
        </p>
        <div className='flex items-center gap-x-3 text-white'>
          <button
            disabled={!loading && !canSubmit}
            onClick={handleSubmit}
            className={`${markdownText ? 'bg-[#0fa814]' : 'cursor-not-allowed bg-green-800'} ${loading ? '' : ''} transition-colors py-1 px-4 text-sm rounded-[3px] mr-1`}>{loading ? <Loading classNames='size-3' /> : 'Submit'}
          </button>
          <button
            onClick={() => setPreview(prev => !prev)}
            className='py-1 px-2 text-sm rounded-[3px] bg-gray-600 mr-1'>{preview ? 'Editor' : 'Preview'}</button>
        </div>
      </div>

      {
        preview ?
          <div className="flex border border-[#cccccc] p-2 rounded-md flex-col w-full h-[90%">
            <h2 className='border-b'>Preview</h2>
            <ReactMarkdown>{markdownText}</ReactMarkdown>
          </div>
          :
          <MdEditor
            plugins={plugins}
            value={markdownText}
            style={{ height: "550px" }}
            canView={canViewOptions}
            // view={{ menu: true, md: true, html: true }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleChange}
          />
      }
    </div>
  );
};
