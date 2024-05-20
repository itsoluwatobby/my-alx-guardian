import { FaCommentDots, FaHeart, FaShare } from "react-icons/fa6"
import GuardianImages from "../component/Images"
import { format } from "timeago.js"
import ShareButton from "../ShareButton"
import { useCallback, useState } from "react"
import { useGuardianContext } from "../../hooks/useGuardianContext"
import { checkCount } from "../../utility/helpers"
import Comments from "../component/Comments"

type ArticleProp = {
  post: { id: string };
  expandDetail: ExpandDetailsType;
  setExpandDetail: React.Dispatch<React.SetStateAction<ExpandDetailsType>>;
}

export const Article = ({ post, expandDetail, setExpandDetail }: ArticleProp) => {
  const { theme } = useGuardianContext() as GuardianContextType;
  const [share, setShare] = useState<boolean>(false);
  // const [expandDetail, setExpandDetail] = useState<{id: string, toggle: Toggle}>(
  //   { id: '', toggle: 'CLOSE' }
  // );
console.log(expandDetail);
  const classes = useCallback((theme: Theme) => {
    return `${theme === 'light' ? 'text-[#333333]' : ''} cursor-pointer hover:scale-[1.02] active:scale-[1] transition-transform size-4`
  }, [])

  return (
    <article className="flex gap-2">
      <GuardianImages 
        imageUri="/study.jpg"
        classNames="cursor-pointer hover:scale-[1.03] hover:animate-spin transition-transform flex-none w-10 h-10 border-2 border-gray-200 rounded-full"
        imageClassNames="rounded-full hover:animate-spin transition-transform"
      />
      <section className="flex flex-col gap-1">
        <div className="flex flex-col text-sm">
          <div className="flex items-baseline gap-3">
            <h4 className="font-bold cursor-pointer hover:opacity-95 hover:underline underline-offset-4 transition-opacity">User 1</h4>
            <span className={`w-1 h-1 bg-white flex-none`}></span>
            <span className="font-sans text-xs opacity-80">{format(new Date(new Date().getTime() - 6 * 60 * 60 * 924))}</span>
          </div>
          <p className="text-[13px] indent-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptatibus debitis laborum temporibus mollitia ea consectetur autem, nobis hic nesciunt consequatur doloribus repudiandae distinctio, accusamus omnis ullam ducimus. Amet, vitae?</p>
        </div>
        
        <GuardianImages 
          imageUri="/study.jpg"
          classNames="w-full max-h-60 rounded-lg"
          imageClassNames="rounded-lg"
        />
        <div className="mt-1 flex items-center gap-6">
          <div className="flex items-center gap-1">
            <FaHeart className={classes(theme)} />
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
              <FaShare 
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
        
        <Comments expandDetail={expandDetail} post={post} />
      
      </section>

    </article>
  )
}