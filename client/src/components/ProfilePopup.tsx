import { Link } from "react-router-dom";
import { useGuardianContext } from "../hooks/useGuardianContext";
import { checkCount, reduceTextLength } from "../utility/helpers";
import GuardianImages from "./component/GuardianImages";

type ProfilePopupProps = {
  classNames: string;
  user: UserType;
  reveal: boolean;
  popupRef: React.LegacyRef<HTMLElement>;
}

export default function ProfilePopup({ classNames, user, reveal, popupRef }: ProfilePopupProps) {
  const { theme } = useGuardianContext() as GuardianContextType;

  return (
    <article 
    ref={popupRef}
    className={`absolute top-6 ${reveal ? 'flex' : 'hidden'} gap-2 left-0 ${classNames} shadow-lg ${theme === 'light' ? 'bg-[#fffbfd]' : 'bg-[#333333]'} rounded-md w-56 min-h-20 max-h-28 p-3`}>
      <GuardianImages
        imageUri={user?.profilePicture} alt={user?.firstName}
        classNames="flex-none w-7 h-9 text-white rounded-full border"
        imageClassNames="rounded-full"
      />
      <div className="flex flex-col gap-y-1 font-sans w-full">
        <Link to={`/profile/${user._id}`} className="capitalize cursor-pointer font-medium hover:underline">{reduceTextLength(`${user?.firstName} ${user?.lastName}`)}</Link>
        <a href={`mailto:${user.email}`} className="text-xs -mt-1 hover:opacity-90 lowercase">{reduceTextLength(user?.email, 8)}@{user.email?.split('@')[1]}</a>

        <div className='text-xs border-t -mt-1 w-full py-1'>
          <span>
            Articles {checkCount(5)}
          </span>
        </div>
      </div>
    </article>
  )
}