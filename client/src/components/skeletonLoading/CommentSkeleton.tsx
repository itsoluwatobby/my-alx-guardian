import './skeleton.css';
import SkeletonLoading from './SkeletonLoading';

export default function CommentSkeletonLoading() {

  const bgClasses = 'shadow-slate-800 rounded-md border border-gray-300 bg-[#606065]';

  return (
    <article className={`relative flex gap-x-2`}>
      <SkeletonLoading classes='profile-circle-small bg-[#606065]' />

      <section className="flex flex-col w-full">

        <div className="flex flex-col text-sm w-full gap-y-1">
          <div className={`flex-none flex items-baseline gap-x-2`}>
            <SkeletonLoading classes='text width-10 bg-[#606065]' />
            <SkeletonLoading classes='text width-2 bg-[#606065]' />
            <SkeletonLoading classes='text width-10 bg-[#606065]' />
          </div>
  
          <div className={`cursor-default ${bgClasses} p-1 w-full`}>
            <SkeletonLoading classes='text width-75' />
            <SkeletonLoading classes='text width-90' />
          </div>
      
        </div>

        <div className={`flex-none flex items-baseline gap-3`}>
          <SkeletonLoading classes='text width-5 bg-[#606065]' />
          <SkeletonLoading classes='text width-5 bg-[#606065]' />
          <SkeletonLoading classes='text width-5 bg-[#606065]' />
        </div>

      </section>
    </article>
  )
}