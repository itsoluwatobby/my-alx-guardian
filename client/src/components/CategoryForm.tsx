import { ChangeEvent, useState, useEffect } from 'react';
import { initAppState, initCategory } from '../utility/initVaraibles';
import { FaTimes } from 'react-icons/fa';
import { ActionButton } from './ActionButton';
import { imageUpload } from '../utility/image-controller';
import { MAX_LENGTH } from '../utility/constants';
import { guardianAsyncWrapper } from '../app/guardianAsyncWrapper';
import { sanitizeEntries } from '../utility/helpers';
import { categoryAPI } from '../app/api-calls/category.api';
import { toast } from 'react-toastify';

type CategoryFormType = {
  loggedInUserId: string;
  setAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryObjType[]>>
}
export default function CategoryForm({ loggedInUserId, setAddItem, setCategories }: CategoryFormType) {
  const [categoryObj, setCategoryObj] = useState<CreateCategoryRequest>(initCategory);
  const [file, setFile] = useState<File | null>(null);
  const [errorImageUrl, setErrorImageUrl] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppStateType>(initAppState);

  const { loading, isError } = appState;
  const { description, title, category } = categoryObj;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategoryObj(prev => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (file === null) return
    if((file as File).size > MAX_LENGTH.MAX_FILE_SIZE){
      setAppState(prev => ({...prev, isError: true, error: 'File too large'}))
      setFile(null)
      return alert('MAX ALLOWED FILE SIZE IS 800kb')
    }
  }, [file])


  const canSubmit = [description, category.type, category.name].every(Boolean);

  const handleSubmit = () => {
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const { category, description, title } = categoryObj;
      const sanitizeCat = sanitizeEntries(category);
      const sanitizeStrings = sanitizeEntries({ description, title });
      let res: ImageReturnType = { url: '', status: '' };
      if (!errorImageUrl && file) {
        res = await imageUpload(file as File, 'category-images');
        setErrorImageUrl(res.url);
      }
      const newCategory: CreateCategoryRequest = {
        ...categoryObj,
        ...sanitizeStrings,
        authorId: loggedInUserId,
        banner: errorImageUrl ?? res.url,
        category: { ...sanitizeCat },
      }
      const newCat = await categoryAPI.createCategory(newCategory);
      setCategories(prev => ([...prev, newCat.data]));
      setCategoryObj(initCategory);
      toast.success(`${category.type} added✌️`);
    }, setAppState);
  };

  return (
    <main 
    className='w-full fixed inset-0 h-screen bg-black bg-opacity-30 z-50 flex items-center justify-center'>

      <div className='z-30 flex flex-col gap-1 self-center -mt-20 p-2 rounded-md bg-[#898989] text-black text-sm lg:w-[30%] w-1/2 maxmobile:w-[80%]'>
        <button title="close"
          onClick={() => setAddItem(false)}
          className="rounded-sm px-2.5 py-1 w-fit self-end shadow-md bg-gray-700 text-white">
          <FaTimes />
        </button>
        <div className='flex flex-col gap-y-3 w-full'>
          <CustomInput
            name='title'
            value={title!} placeholder='Title' handleChange={handleChange}
            inputClassNames=''
          />
          <CustomInput
            name='description'
            value={description!} placeholder='*Description'
            handleChange={handleChange} required={true}
            inputClassNames=''
          />
          <label htmlFor="banner"
          className='w-full'
          >
            <input type="file" id='banner' 
            onChange={e => setFile((e.target.files as FileList)[0])}
            accept='image/*' className='text-white'
            />
          </label>
          <select name="type"
            required={true}
            onChange={event => setCategoryObj(prev => ({ ...prev, category: {
            ...prev.category,
            type: event.target.value as CategoryToggles,
          } }))}
          className="p-2 rounded-sm focus:outline-none focus:ring-0">
            <option>*Select category</option>
            {
              ['Cohorts', 'Forums'].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))
            }
          </select>
          <CustomInput
            name='name'
            value={category.name!} placeholder={`*${category.type} Name`} handleChange={(event) => setCategoryObj(prev => ({ ...prev, category: {
              ...prev.category, name: event.target.value as CategoryToggles,
            } }))}
            required={true}
            inputClassNames=''
          />
        </div>

        <ActionButton
          checker={canSubmit && !loading}
          text='Create' disabled={!canSubmit || loading}
          loading={loading} isError={isError}
          extraClassNames='mt-3' onClick={handleSubmit}
        />
      </div>

    </main>
  )
}

type CustomInputType = {
  value: string;
  name: string;
  placeholder: string;
  inputClassNames: string;
  required?: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({ name, value, inputClassNames, placeholder, handleChange, required=false }: CustomInputType) => {

  return (
    <input type="text"
      value={value}
      name={name}
      className={`focus:ring-0 focus:border-0 focus:outline-0 text-black w-full h-full rounded-sm p-2 ${inputClassNames}`}
      required={required as boolean}
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}