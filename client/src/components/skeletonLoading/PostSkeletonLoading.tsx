import './skeleton.css';

export default function PostSkeletonLoading({ theme }: { theme: Theme }) {

  return (
    <article className={`relative flex gap-2`}>
      <figure className='size-10 rounded-full border-2 border-gray-200 '></figure>

      <section className="flex flex-col gap-1">
        <div className="flex flex-col text-sm">
        <div 
          className="flex items-baseline gap-3 w-fit">
            <h4 className={`w-20 font-bold cursor-pointer hover:opacity-95 hover:underline underline-offset-4 transition-opacity`}></h4>
            <span className={`w-1 h-1 bg-white flex-none`}></span>
            <span className={`w-10 font-sans ${classNames ? classNames : 'text-xs'} opacity-80`}></span>
          </div>
          <Link to={`/post/${1254}`} className="text-[13px] flex flex-col cursor-default mt-1">
            <h2 className="line-clamp-1 text-sm font-medium">Things reaally do fall apart</h2>
            <p className="line-clamp-3 indent-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptatibus debitis laborum temporibus mollitia ea consectetur autem, nobis hic nesciunt consequatur doloribus repudiandae distinctio, accusamus omnis ullam ducimus. Amet, vitae?
            </p>
          </Link>
        </div>

        <GuardianImages
          imageUri="/study.jpg"
          classNames="w-full max-h-60 rounded-lg"
          imageClassNames="rounded-lg"
        />
        <div className="mt-1 flex items-center gap-6">
          <div className="flex items-center gap-1">
            <FaHeart title="like" className={classes(theme)} />
            <span className="text-xs font-sans">{checkCount(5)}</span>
          </div>

          <div className="relative flex items-center gap-1">
            <FaCommentDots
              onClick={() => setExpandDetail(
                {
                  id: post.id,
                  toggle: (expandDetail?.id === post.id && expandDetail?.toggle === 'OPEN') ? 'CLOSE' : 'OPEN'
                }
              )}
              className={classes(theme)} />
            <span className="text-xs font-sans">{checkCount(5)}</span>
          </div>

          <div className="relative">
            <FaShare title="share"
              onClick={() => setShare(prev => !prev)}
              className={classes(theme)} />
            <ShareButton
              classNames={`absolute bg-gray-600 text-white -top-10 left-1`}
              share={share} setShare={setShare}
              eventTitle=""
              link=""
              hashtags={[]}
            />
          </div>
        </div>

      </section>
    </article>
  )
}