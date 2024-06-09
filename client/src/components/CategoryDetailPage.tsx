import { FaTimes } from 'react-icons/fa';
import { checkCount, reduceTextLength } from '../utility/helpers';
import GuardianImages from './component/GuardianImages';
import { format } from 'timeago.js';
import { initAppState, initCategoryObj } from '../utility/initVaraibles';
import { Link } from 'react-router-dom';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { guardianAsyncWrapper } from '../app/guardianAsyncWrapper';
import { categoryAPI } from '../app/api-calls/category.api';
import RenderTemplate from './RenderTemplate';
import Loading from './Loading';
import { deleteImage } from '../utility/image-controller';

type CategoryDetailPageProps = {
  totalPosts: number;
  categoryObj: CategoryObjType;
  loggedInUserId: string;
  setAddItem: React.Dispatch<React.SetStateAction<AddItemType>>;
  setCategory: React.Dispatch<React.SetStateAction<CategoryObjType>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryObjType[]>>
}

export default function CategoryDetailPage({ loggedInUserId, totalPosts, setCategory, setAddItem, setCategories, categoryObj }: CategoryDetailPageProps) {
  const [appCategoryState, setAppCategoryState] = useState<AppStateType>(initAppState);
  const [appJoinState, setAppJoinState] = useState<AppStateType>(initAppState);
  const [appDeleteState, setAppDeleteState] = useState<AppStateType>(initAppState);
  const [categoryMembers, setCategoryMembers] = useState<UserType[]>([]);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>('');

  const { loading, error, isError } = appCategoryState;
  const { loading: isJoinLoading } = appJoinState;
  const { loading: isDeleteLoading } = appDeleteState;
  const { category } = categoryObj;

  const joinOrLeave = () => {
    if (isJoinLoading) return;
    guardianAsyncWrapper(async () => {
      setAppJoinState(prev => ({ ...prev, loading: true }));
      const res = await categoryAPI.joinOrLeaveCategory(
        { id: categoryObj._id as string, userId: loggedInUserId, }
      );
      setCategory(res.data);
    }, setAppJoinState);
  }
  
  const deleteCategory = () => {
    if (isJoinLoading) return;
    guardianAsyncWrapper(async () => {
      setAppDeleteState(prev => ({ ...prev, loading: true }));
      const { banner } = categoryObj;
      if ((banner as string)?.length > 1 && banner !== 'image.png') {
        await deleteImage(banner!, 'category-images');
      }
      await categoryAPI.delete_category(
        { id: categoryObj._id as string }
      );
      setCategories(prev => ([...prev.filter(cat => cat._id !== categoryObj._id)]))
      setCategory(initCategoryObj);
    }, setAppDeleteState);
  }

  useEffect(() => {
    guardianAsyncWrapper(async () => {
      setAppCategoryState(prev => ({ ...prev, loading: true }));
      const res = await categoryAPI.members(categoryObj._id as string);
      setCategoryMembers(res.data)
    }, setAppCategoryState);
  }, [categoryObj._id, categoryObj.members])
  
  useEffect(() => {
    setIsMember((categoryObj.members as string[]).includes(loggedInUserId));
  }, [categoryObj.members, loggedInUserId])
  
  useEffect(() => {
    const channelAuthor = categoryMembers.find(auth => auth._id === categoryObj.authorId);
    setAuthor(`${channelAuthor?.firstName}` ?? `${channelAuthor?.lastName}`)
  }, [categoryMembers, categoryObj.authorId])

  return (
    <main
      className='w-full fixed inset-0 h-screen bg-black bg-opacity-50 z-40 flex items-center justify-center'>

      <div className={`${isDeleteLoading ? 'animate-pulse' : ''} z-30 flex flex-col self-center px-2 py-1 rounded-md bg-[#898989] text-black text-sm lg:w-[35%] w-[60%] maxmobile:w-[80%] h-[90%]`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-4'>
            <button title="edit"
              onClick={() => setAddItem({ category: categoryObj, toggle: true })}
              className="rounded-sm px-2.5 py-1 w-fit self-end shadow-md bg-gray-700 text-white">
              <MdEdit />
            </button>
            <button title="delete"
              onClick={deleteCategory}
              className={`${loggedInUserId === categoryObj.authorId ? '' : 'hidden'} rounded-sm px-2.5 py-1 w-fit self-end shadow-md bg-gray-700 text-white`}>
              <MdDeleteForever />
            </button>
          </div>

          <button title="close"
            onClick={() => setCategory(initCategoryObj)}
            className="rounded-sm px-2.5 py-1 w-fit self-end shadow-md bg-gray-700 text-white">
            <FaTimes />
          </button>
        </div>
        <div className='flex flex-col gap-y-2 w-full overflow-y-scroll'>
          <div className='flex items-center justify-between text-white font-sans text-base'>
            <p className='capitalize font-medium'>{category.type} <span className={`${category.name ? '' : 'hidden'}`}>- {category.name}</span></p>
            <div className='flex flex-col items-end'>
              <p className='text-white text-sm flex items-center gap-x-1'>
                author: 
                <Link to={`/profile/${categoryObj.authorId}`}
                className='text-[#EEEEEE]'>
                  {reduceTextLength(author, 15)}</Link>
              </p>
              <p className='text-black text-xs font-medium'>
                Created: <span className=''>
                  {format(categoryObj.createdAt)}</span>
              </p>
            </div>
          </div>

          <GuardianImages
            imageUri={categoryObj.banner!}
            alt={category.name} textSize="text-6xl"
            classNames="maxmobile:self-cente flex-none size-28 w-full rounded-md" imageClassNames="rounded-md"
          />

          <div className='flex items-center justify-between'>
            <p className='font-medium font-sans'>
              Total Posts: {checkCount(totalPosts)}
            </p>

            <button
            title={!isMember ? 'Join channel' : 'Leave channel'}
            onClick={joinOrLeave}
            disabled={isJoinLoading}
            className='font-sans rounded-sm px-4 py-0 h-8 text-center w-fit shadow-md bg-gray-700 text-white'
            >
              {isJoinLoading ? <Loading /> : !isMember ? 'Join' : 'Leave'}
            </button>
          </div>

          <TextDisplay
            label='Title'
            value={categoryObj.title!}
            classNames='gap-x-2'
          />
          <TextDisplay
            label='Description'
            value={categoryObj.description!}
            classNames='flex-col'
          />
        </div>

        <div className='flex flex-col rounded-md shadow-inner mt-1 p-1 h-[17rem]'>
          <p className='font-sans flex items-center gap-x-1 text-[15px]'>Members: 
          <span className='font-medium'>{categoryObj.members.length}</span>
          </p>

          <RenderTemplate
            defaultMessage={`No members yet`}
            classNames="gap-y-0 py-1 overflow-y-scroll"
            errorTextClassNames='text-base text-center'
            errorClassNames='size-10'
            isLoading={loading} isError={isError} content={categoryMembers}
            LoadingComponent={() => <div
              className="animate-pulse mb-1 w-full h-5 bg-[#807c7c]"
            ></div>} error={error}
          >
            <div className="flex flex-col gap-y-2 h-full -mt-2">
              {
                categoryMembers?.map((cat) => (
                  <Link to={`/profile/${cat._id}`} key={cat._id}
                  title={`Visit ${cat.lastName} profile`}
                    className="capitalize cursor-default p-1 hover:bg-[#b0adad] w-full text-start transition-colors border-b border-[#807e7e] rounded-md"
                  >
                    {cat.firstName} {cat.lastName}
                  </Link>
                ))
              }
            </div>
          </RenderTemplate>
        </div>
      </div>

    </main>
  )
}

type CustomInputType = {
  value: string;
  classNames: string;
  label?: string;
}

const TextDisplay = ({ value, label, classNames }: CustomInputType) => {

  return (
    <div className={`${classNames} bg-[#e1dede] rounded-[3px] p-2 pt-1 flex ${value ? '' : 'hidden'}`}>
      <h5 className='capitalize font-medium'>{label}:</h5>
      <p>
        {value}
      </p>
    </div>
  )
}