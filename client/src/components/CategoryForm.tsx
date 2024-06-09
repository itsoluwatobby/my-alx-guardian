import { deleteImage, imageUpload } from '../utility/image-controller';
import { initAppState, initCategory } from '../utility/initVaraibles';
import { guardianAsyncWrapper } from '../app/guardianAsyncWrapper';
import { categoryAPI } from '../app/api-calls/category.api';
import { ChangeEvent, useState, useEffect } from 'react';
import { sanitizeEntries } from '../utility/helpers';
import { MAX_LENGTH } from '../utility/constants';
import { ActionButton } from './ActionButton';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

type CategoryFormType = {
  addItem: AddItemType;
  loggedInUserId: string;
  setAddItem: React.Dispatch<React.SetStateAction<AddItemType>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryObjType[]>>
}
export default function CategoryForm({ addItem, loggedInUserId, setAddItem, setCategories }: CategoryFormType) {
  const [categoryObj, setCategoryObj] = useState<CreateCategoryRequest>(initCategory);
  const [file, setFile] = useState<File | null>(null);
  const [editable, setEditable] = useState<boolean | null>(null);
  const [errorImageUrl, setErrorImageUrl] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppStateType>(initAppState);

  const { loading, isError } = appState;
  const { description, title, category, banner } = categoryObj;

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

  useEffect(() => {
    if (addItem.category._id) {
      setCategoryObj(addItem.category);
      setEditable(loggedInUserId === addItem.category.authorId);
    }
  }, [addItem.category, loggedInUserId])

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

      if ((banner as string)?.length > 1 && banner !== 'image.png') {
        await deleteImage(banner!, 'category-images');
      }
      const newCategory: CreateCategoryRequest = {
        ...categoryObj,
        ...sanitizeStrings,
        authorId: loggedInUserId,
        banner: errorImageUrl ?? res.url,
        category: { ...sanitizeCat },
      }

      if (addItem.category._id) {
        let updated: UpdateCategoryResponse | UpdateDescriptionResponse
        const { _id, title, category, description, authorId } = newCategory;
        if (editable !== null && editable) {
          const updatedCat: UpdateCategoryRequest = { 
            id: _id, title, description, category, authorId
          };
          updated = await categoryAPI.updateCategory(updatedCat);
        } else {
          const updatedCat: UpdateDescriptionRequest = {
            id: _id as string,
            userId: loggedInUserId,
            description: description as string,
          };
          updated = await categoryAPI.updateCategoryDescription(updatedCat);
        }
        setCategories(prev => ([updated.data, ...prev.filter(other => other._id !== updated.data._id)]));
        setCategoryObj(updated.data);
      } else {
        const newCat = await categoryAPI.createCategory(newCategory);
        setCategories(prev => ([...prev, newCat.data]));
        setCategoryObj(initCategory);
      }
      const msg = addItem.category._id ? 'updated' : 'added';
      setAddItem(prev => ({ ...prev, toggle: false }));
      setErrorImageUrl(null);
      toast.success(`${category.type} ${msg}'✌️'`);
    }, setAppState);
  };

  return (
    <main 
    className='w-full fixed inset-0 h-screen bg-black bg-opacity-30 z-50 flex items-center justify-center'>

      <div className='z-30 flex flex-col self-center -mt-20 py-1 p-2 rounded-md bg-[#898989] pb-3 text-black text-sm lg:w-[30%] w-1/2 maxmobile:w-[80%]'>
        <button title="close"
          onClick={() => setAddItem(prev => ({ ...prev, toggle: false }))}
          className="rounded-sm px-2.5 py-1 w-fit self-end shadow-md bg-gray-700 text-white">
          <FaTimes />
        </button>
        <div className='flex flex-col gap-y-1 w-full'>
          <CustomInput
            name='title' max={20}
            disabled={editable !== null ? !editable : false}
            value={title!} placeholder='Title' handleChange={handleChange}
            inputClassNames=''
          />
          <CustomInput
            name='description' max={100}
            disabled={false}
            value={description!} placeholder='*Description'
            handleChange={handleChange} required={true}
            inputClassNames=''
          />
          <CustomInput
            name='name' max={20}
            disabled={editable !== null ? !editable : false}
            value={category.name!} placeholder={`*${category.type} Name`} handleChange={(event) => setCategoryObj(prev => ({ ...prev, category: {
              ...prev.category, name: event.target.value as CategoryToggles,
            } }))}
            required={true}
            inputClassNames=''
          />
          <label htmlFor="banner"
          className='w-full'
          >
            <input type="file" id='banner' 
            disabled={editable !== null ? !editable : false}
            onChange={e => setFile((e.target.files as FileList)[0])}
            accept='image/*' className='text-white'
            />
          </label>
          <select name="type"
            required={true}
            disabled={editable !== null ? !editable : false}
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
        </div>

        <ActionButton
          checker={canSubmit && !loading}
          text={addItem.category._id ? 'Update' : 'Create'} 
          disabled={!canSubmit || loading}
          loading={loading} isError={isError}
          extraClassNames='mt-4' onClick={handleSubmit}
        />
      </div>

    </main>
  )
}

type CustomInputType = {
  value: string;
  name: string;
  disabled: boolean;
  placeholder: string;
  inputClassNames: string;
  max: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const CustomInput = ({ name, value, disabled, max, inputClassNames, placeholder, handleChange, required=false }: CustomInputType) => {

  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={name}
      className='capitalize font-medium text-[13px]'
      >{name}</label>
      <input type="text"
        value={value}
        disabled={disabled}
        name={name}
        className={`focus:ring-0 focus:border-0 focus:outline-0 text-black w-full h-full rounded-sm p-2 ${inputClassNames}`}
        max={max}
        required={required as boolean}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  )
}