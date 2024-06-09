import { FaMinusSquare, FaPlusSquare } from "react-icons/fa"
import RenderTemplate from "../RenderTemplate"

type CategoryDisplayProps = {
  addItem: AddItemType;
  type: CategoryType;
  appState: AppStateType;
  paginateCategory: Pagination;
  categories: CategoryObjType[];
  categoryToggle: CategoryToggleStates;
  setAddItem: React.Dispatch<React.SetStateAction<AddItemType>>;
  setCategory: React.Dispatch<React.SetStateAction<CategoryObjType>>;
  setCategoryQuery: React.Dispatch<React.SetStateAction<Omit<CategoryQuery, "type">>>;
}

export default function CategoryDisplay(
  { appState, type, categories, paginateCategory, addItem, setCategory,
    categoryToggle, setCategoryQuery, setAddItem }: CategoryDisplayProps,
) {

  const { loading, isError, error } = appState;

  return (
    <div className={`relative ${(!categoryToggle.Forums && !categoryToggle.Cohorts) ? 'hidden' : 'flex'} midscreen:w-48 flex-col gap-y-0 py-3 flex-auto w-full`}>
      <div className='w-fit flex items-center gap-x-2 self-center'>
        <h4 
        title="view info"
        className="cursor-default underline underline-offset-4 self-center">{categoryToggle.Forums ? 'Forums' : 'Cohorts'}</h4>
        {
          addItem.toggle ?
            <FaMinusSquare
              title="Close"
              onClick={() => setAddItem(prev => ({ ...prev, toggle: false }))}
              className="size-4 cursor-pointer hover:opacity-90 active:opacity-100 transition-opacity"
            />
            :
            <FaPlusSquare
              title="Add"
              onClick={() => setAddItem(prev => ({ ...prev, toggle: true }))}
              className="size-4 cursor-pointer hover:opacity-90 active:opacity-100 transition-opacity"
            />
        }
      </div>

      <ul className="pl-4 flex flex-col gap-y-1 text-sm">
        <RenderTemplate
          defaultMessage={`No ${type}`}
          classNames="gap-y-0 py-1"
          errorTextClassNames='text-sm text-center'
          errorClassNames='size-11'
          isLoading={loading} isError={isError} content={categories}
          LoadingComponent={() => <div
            className="animate-pulse mb-1  w-full h-5 bg-[#333333]"
          ></div>} error={error}
        >
          <div className="flex flex-col gap-y-0">
            {
              categories?.map((cat) => (
                <button key={cat._id}
                  onClick={() => setCategory(cat)}
                  className="capitalize cursor-default p-1 hover:bg-[#333333] focus:bg-[#333333] w-full text-start transition-colors"
                >
                  {cat.category.name}
                </button>
              ))
            }
          </div>
        </RenderTemplate>

        <div className="absolute bottom-10 flex items-center w-full gap-x-2 text-[13px]">
          {
            [...Array(paginateCategory.numberOfPages).keys()].map(i => (
              <button
                key={i}
                onClick={() => setCategoryQuery(prev => ({ ...prev, pageNumber: i + 1 }))}
                className="font-sans px-2 p-0.5 rounded-sm focus:bg-gray-700 bg-gray-500 hover:scale-[1.02] transition-transform text-white">{i + 1}</button>
            ))
          }
        </div>
      </ul>

    </div>
  )
}