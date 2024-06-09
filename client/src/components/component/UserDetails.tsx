import { format } from 'timeago.js'
import { reduceTextLength } from '../../utility/helpers';

type UserDetailsProps = {
  date: string;
  name: string;
  classNames?: string;
  userRef: React.LegacyRef<HTMLDivElement>;
  // setReveal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserDetails({ name, date, classNames, userRef }: UserDetailsProps) {
  return (
    <div 
    className="flex items-baseline gap-3 w-fit">
      <h4 
      ref={userRef}
      // onClick={() => setReveal(prev => !prev)}
      className={`${classNames} font-bold cursor-pointer hover:opacity-95 hover:underline underline-offset-4 transition-opacity`}>{reduceTextLength(name, 35)}</h4>
      <span className={`w-1 h-1 bg-white flex-none`}></span>
      <span className={`font-sans ${classNames ? classNames : 'text-xs'} opacity-80`}>{format(date)}</span>
    </div>
  )
}
