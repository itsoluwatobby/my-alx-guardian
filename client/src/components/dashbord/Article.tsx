import { FaCommentDots, FaHeart, FaShare } from "react-icons/fa6"
import GuardianImages from "../component/GuardianImages"
import ShareButton from "../ShareButton"
import { useCallback, useEffect, useRef, useState } from "react"
import { useGuardianContext } from "../../hooks/useGuardianContext"
import { checkCount } from "../../utility/helpers"
import Comments from "../component/Comments"
import UserDetails from "../component/UserDetails"
import ProfilePopup from "../ProfilePopup"
import { Link } from "react-router-dom"

type ArticleProp = {
  post: { id: string };
  expandDetail: ExpandDetailsType;
  setExpandDetail: React.Dispatch<React.SetStateAction<ExpandDetailsType>>;
}

export const Article = ({ post, expandDetail, setExpandDetail }: ArticleProp) => {
  const { theme } = useGuardianContext() as GuardianContextType;
  const [share, setShare] = useState<boolean>(false);
  const userRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState<boolean>(false);

  useEffect(() => {
    if (!userRef.current) return;
    if (!popupRef.current) return;
    if (userRef.current.onmouseenter) setReveal(true);
    if (popupRef.current.onmouseenter) setReveal(true);
    // userRef.current.addEventListener('mouseleave', () => {
    //   if (popupRef.current.onmouseenter) setReveal(true);
    //   else setReveal(false);
      // popupRef.current.addEventListener('mouseleave', () => setReveal(false));
      // setReveal(false)
    // });
  }, [])

  const classes = useCallback((theme: Theme) => {
    return `${theme === 'light' ? 'text-[#333333]' : ''} cursor-pointer hover:scale-[1.02] active:scale-[1] transition-transform size-4`
  }, [])

  return (
    <article className="relative flex gap-2">
      <GuardianImages
        imageUri="/study.jpg"
        alt={'User 1'}
        classNames="cursor-pointer hover:scale-[1.03] hover:animate-spin transition-transform flex-none w-10 h-10 border-2 border-gray-200 rounded-full"
        imageClassNames="rounded-full hover:animate-spin transition-transform"
      />
      <ProfilePopup 
        name="User 1" reveal={reveal} popupRef={popupRef}
        classNames="z-10 top-5"
      />
      <section className="flex flex-col gap-1">
        <div className="flex flex-col text-sm">
          <UserDetails
            name="User 1" userRef={userRef}
            date={new Date(new Date().getTime() - 6 * 60 * 60 * 924)}
          />
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

        <Comments 
        setExpandDetail={setExpandDetail} 
        expandDetail={expandDetail} post={post} />

      </section>

    </article>
  )
}