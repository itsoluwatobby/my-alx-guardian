import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import useDeboundedInput from '../hooks/useDeboundedInput';
import { MAX_LENGTH } from '../utility/constants';
import localStore from '../utility/localStorage';
import { guardianAsyncWrapper } from '../app/guardianAsyncWrapper';
import { postAPI } from '../app/api-calls/post.api';
import { initAppState } from '../utility/initVaraibles';
import { useGuardianContext } from '../hooks/useGuardianContext';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

MdEditor.use(Plugins.AutoResize, {
  min: 200,
  max: 600
})

export const NewPost = () => {
  const { loggedInUserId } = useGuardianContext() as GuardianContextType;
  const [markdownText, setMarkdownText] = useState<string>("");
  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const userId = localStore.getStorage('my-id', false) as string;
  const [preview, setPreview] = useState<boolean>(false);
  const { isTyping, val } = useDeboundedInput(markdownText, MAX_LENGTH.DEBOUNCE);
  const [canViewOptions] = useState({
    menu: true, md: true, html: true,
    both: false, fullScreen: true, hideMenu: true,
  });
  const navigate = useNavigate();

  const { loading } = appState;
  // Handle the change in the editor
  const handleChange = ({ text }: { text: string }) => setMarkdownText(text);

  useEffect(() => {
    if (val?.length && !isTyping) {
      localStore.setStorage(userId, val, false)
    }
  }, [val, isTyping, userId])
  
  useEffect(() => {
    if (userId) {
      setMarkdownText(localStore.getStorage(userId, false) as string ?? '');
    }
  }, [userId])

  const handleSubmit = () => {
    if (loading) return;
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const newPost: CreatePostRequest = {
        userId: loggedInUserId, body: val,
        category: { type: 'General' },
      }
      await postAPI.createPost(newPost);
      localStore.removeStorage(userId);
      setMarkdownText('');
      toast.info('Post created!');
      navigate('/dashboard');
    }, setAppState);
  }
  
  // const handleUpdateSubmit = () => {
  //   if (loading) return;
  //   guardianAsyncWrapper(async () => {
  //     setAppState(prev => ({ ...prev, loading: true }));
  //     const updatedPost: UpdatePostRequest = {
  //       userId: loggedInUserId, body: val,
  //       category: { type: 'General' },
  //     }
  //     await postAPI.updatePost(updatedPost);
  //     localStore.removeStorage(userId);
  //     setMarkdownText('');
  //     toast.info('Post created!');
  //     navigate('/dashboard');
  //   }, setAppState);
  // }

  const canSubmit = Boolean(val);

  const plugins = ['header', 'my-plugins', 'link', 'font-strikethrough', 'list-unordered', 'imag', 'clear', 'logger', 'mode-toggle', 'full-screen'];
  return (
    <div className="overflow-y-scroll flex flex-col gap-y-2 w-full transition-all h-full rounded-md">
      <div className='flex items-center justify-between w-full gap-x-3 mt-2'>
        <p className={``}>
          {!val ? '' : (isTyping ? 'saving ...' : 'saved')}
        </p>
        <div className='flex items-center gap-x-3'>
          <button
            disabled={!loading && !canSubmit}
            onClick={handleSubmit}
            className={`${markdownText ? 'bg-[#0fa814]' : 'cursor-not-allowed bg-green-800'} ${loading ? '' : ''} transition-colors py-1 px-4 text-sm rounded-[3px] mr-1`}>{loading ? <Loading classNames='size-3' /> : 'Submit'}</button>
          <button
            onClick={() => setPreview(prev => !prev)}
            className='py-1 px-2 text-sm rounded-[3px] bg-gray-600 mr-1'>{preview ? 'Editor' : 'Preview'}</button>
        </div>
      </div>

      {
        preview ?
          <div className="flex border border-[#cccccc] p-2 rounded-md flex-col w-full h-[90%]">
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
