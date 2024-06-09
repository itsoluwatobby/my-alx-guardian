import { MdRunningWithErrors } from 'react-icons/md'

type RenderTemplateProps <T>= {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  error: string;
  classNames?: string;
  errorTextClassNames?: string;
  extraClassNames?: string;
  errorClassNames?: string;
  defaultMessage?: string | null;
  content: T[];
  LoadingComponent: () => JSX.Element;
}

export default function RenderTemplate<T>(
  {
    children, isLoading, isError, error, content, LoadingComponent,
    classNames, extraClassNames, defaultMessage = null, errorClassNames,
    errorTextClassNames,
  }: RenderTemplateProps<T>) {
  return (
    <div className={`flex flex-col flex-auto py-4 gap-4 ${classNames}`}>
      {
        isLoading ?
          [...Array(3).keys()].map((i) => (
            <LoadingComponent key={i} />
          ))
          :
          isError ?
            <div className="mt-10 flex capitalize flex-col items-center gap-y-3">
              <MdRunningWithErrors className={`size-20 ${errorClassNames}`} />
              {error}
            </div>
            :
            content?.length ?
              children
              :
              <div className={`text-center mt-10 text-3xl ${errorTextClassNames}`}>
                {
                  !content?.length ?
                    <p className={`capitalize ${extraClassNames}`}>{defaultMessage ?? 'No Content Available'}</p>
                    : [...Array(3).keys()].map((i) => (
                      <LoadingComponent key={i} />
                    ))
                }
              </div>
      }
    </div>
  )
}