import { getName } from "../../utility/helpers";

type ImagesProps = {
  imageUri: string;
  classNames: string;
  imageClassNames?: string;
  alt?: string;
  loading?: 'eager' | 'lazy';
  textSize?: string;
}

export default function GuardianImages({ imageUri, classNames, imageClassNames, alt, loading, textSize = 'text-lg' }: ImagesProps) {

  return (
    <figure className={`${imageUri ? '' : 'flex items-center'} bg-slate-700 ${classNames} border-white`}>
      {
        imageUri ?
        <img src={imageUri} loading={loading} alt={`${alt}-profile`} className={`w-full h-full object-cover ${imageClassNames}`} />
        : <p className={`font-bold text-center text-white ${textSize} w-full capitalize`}>{getName(alt as string)}</p>
      }
    </figure>
  )
}