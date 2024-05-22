import { FaCommentDots, FaShare } from "react-icons/fa6";
import { useParams } from "react-router-dom"
import { checkCount } from "../utility/helpers";
import { FaHeart } from "react-icons/fa";
import ShareButton from "../components/ShareButton";
import GuardianImages from "../components/component/GuardianImages";
import UserDetails from "../components/component/UserDetails";
import ProfilePopup from "../components/ProfilePopup";
import { useCallback, useRef, useState } from "react";
import Comments from "../components/component/Comments";
import { useGuardianContext } from "../hooks/useGuardianContext";

export default function Post() {
  const { postId } = useParams();
  const { theme } = useGuardianContext() as GuardianContextType;
  const userRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);
  const [expandDetail, setExpandDetail] = useState<ExpandDetailsType>(
    { id: '', toggle: 'CLOSE' }
  );

  const scrollRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        node.scrollIntoView({ behavior: 'smooth' });
      }
    }, []);

  const classes = useCallback(() => {
    return 'text-white cursor-pointer hover:scale-[1.02] active:scale-[1] transition-transform size-5'
  }, [])

  return (
    <div 
    className="relative flex flex-col gap-2 h-full p-4 md:px-10 overflow-y-scroll">
      <div className="flex items-center gap-x-3">
        <GuardianImages
          imageUri="/study.jpg"
          alt={'User 1'}
          classNames="cursor-pointer hover:scale-[1.03] hover:animate-spin transition-transform flex-none w-10 h-10 border-2 border-gray-200 rounded-full"
          imageClassNames="rounded-full hover:animate-spin transition-transform"
        />
        <UserDetails
          name="User 1" userRef={userRef}
          date={new Date(new Date().getTime() - 6 * 60 * 60 * 924)}
        />
      </div>

      <ProfilePopup
        name="User 1" reveal={reveal} popupRef={popupRef}
        classNames="z-10 top-5"
      />
  
      <section 
      ref={scrollRef} 
      className="relative flex flex-col gap-y-2">
        <div className="text-[13px] flex flex-col gap-y-4 cursor-default mt-1">
          <h2 className="text-center text-2xl font-medium">Things really do fall apart</h2>
          <p className="indent-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptatibus debitis laborum temporibus mollitia ea consectetur autem, nobis hic nesciunt consequatur doloribus repudiandae distinctio, accusamus omnis ullam ducimus. Amet, vitae?
          </p>
        </div>

        <GuardianImages
          imageUri="/study.jpg"
          classNames="w-full max-h-60 rounded-lg"
          imageClassNames="rounded-lg"
        />
        <div className="fixed bottom-5 px-4 py-3 flex items-center w-fit gap-6 rounded-md bg-[#333333]">
          <div className="flex items-center gap-1">
            <FaHeart title="like" className={classes()} />
            <span className="text-xs font-sans text-white">{checkCount(5)}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaCommentDots
              onClick={() => setExpandDetail(
                {
                  id: postId as string,
                  toggle: (expandDetail?.id === postId && expandDetail?.toggle === 'OPEN') ? 'CLOSE' : 'OPEN'
                }
              )}
              className={classes()} />
            <span className="text-xs text-white font-sans">{checkCount(5)}</span>
          </div>

          <div className="relative">
            <FaShare title="share"
              onClick={() => setShare(prev => !prev)}
              className={classes()} />
            <ShareButton
              classNames={`absolute bg-gray-600 text-xl text-white -top-12 left-1`}
              share={share} setShare={setShare}
              eventTitle=""
              link=""
              hashtags={[]}
            />
          </div>
        </div>

        <Comments expandDetail={expandDetail} post={{ id: postId as string }} />

      </section>

    </div>
  )
}