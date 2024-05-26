import { useGuardianContext } from "../hooks/useGuardianContext";
import { checkCount, reduceTextLength } from "../utility/helpers";
import GuardianImages from "./component/GuardianImages";

type ProfilePopupProps = {
  classNames: string;
  name: string;
  reveal: boolean;
  popupRef: React.LegacyRef<HTMLElement>;
}

export default function ProfilePopup({ classNames, name, reveal, popupRef }: ProfilePopupProps) {
  const { theme } = useGuardianContext() as GuardianContextType;

  return (
    <article 
    ref={popupRef}
    className={`absolute ${reveal ? 'flex' : 'hidden'} gap-2 left-0 ${classNames} shadow-lg ${theme === 'light' ? 'bg-[#fffbfd]' : 'bg-[#333333]'} rounded-md w-56 min-h-20 max-h-28 p-2`}>
      <GuardianImages
        imageUri="" alt={name}
        classNames="flex-none w-7 h-9 text-white rounded-full border"
        imageClassNames="rounded-full"
      />
      <div className="flex flex-col font-sans w-full">
        <span className="capitalize cursor-pointer font-medium">{reduceTextLength(name)}</span>
        <a href={`mailto:${name}`} className="text-xs -mt-1 hover:opacity-90 lowercase">{reduceTextLength(name + '@gmail.com')}</a>

        <div className='text-xs border-t mt-1 w-full py-1'>
          <span>
            Articles {checkCount(5)}
          </span>
        </div>
      </div>
    </article>
  )
}