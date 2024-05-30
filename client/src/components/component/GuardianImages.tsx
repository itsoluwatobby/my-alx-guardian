import { getName } from "../../utility/helpers";

type ImagesProps = {
  imageUri: string;
  classNames: string;
  imageClassNames?: string;
  alt?: string;
  loading?: 'eager' | 'lazy';
  textSize?: string;
  isLoading?: boolean;
}

export default function GuardianImages({ imageUri, isLoading, classNames, imageClassNames, alt, loading, textSize = 'text-lg' }: ImagesProps) {

  return (
    <figure className={`${imageUri ? '' : 'flex items-center'} ${isLoading? 'animate-pulse' : 'animate-none'} bg-slate-700 ${classNames} border-white`}>
      {
        imageUri ?
        <img src={imageUri} loading={loading} alt={`${alt}-profile`} className={`w-full h-full object-cover ${imageClassNames}`} />
        : <p className={`font-bold text-center text-white ${textSize} w-full capitalize`}>{getName(alt as string)}</p>
      }
    </figure>
  )
}