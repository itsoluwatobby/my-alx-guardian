
type LoadingProps = {
  classNames?: string;
}

export default function Loading({ classNames }: LoadingProps) {
  return (
    <div className={`${classNames} rounded-full border-2 border-x-gray-400 animate-spin size-5`}></div>
  )
}