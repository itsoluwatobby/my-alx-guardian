import { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor, { Plugins } from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

MdEditor.use(Plugins.AutoResize, {
  min: 200,
  max: 600
})

export const NewPost = () => {
  const [markdownText, setMarkdownText] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);
  const [canViewOptions, setCanViewOptions] = useState({
    menu: true, md: true, html: true,
    both: false, fullScreen: true, hideMenu: true,
  });

  // Handle the change in the editor
  const handleChange = ({ text }: { text: string }) => setMarkdownText(text);

  const plugins = ['header', 'my-plugins', 'link', 'font-strikethrough', 'list-unordered', 'image', 'clear', 'logger', 'mode-toggle', 'full-screen'];
  return (
    <div className="flex flex-col gap-y-2 w-full transition-all h-full rounded-md">
      <button
        onClick={() => setPreview(prev => !prev)}
        className='self-end py-1 px-2 text-sm rounded-[3px] bg-gray-600 mr-1'>{preview ? 'Editor' : 'Preview'}</button>
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
