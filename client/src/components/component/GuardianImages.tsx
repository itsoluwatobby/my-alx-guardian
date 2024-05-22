import { getName } from "../../utility/helpers";

type ImagesProps = {
  imageUri: string;
  classNames: string;
  imageClassNames?: string;
  alt?: string;
  loading?: 'eager' | 'lazy';
}

export default function GuardianImages({ imageUri, classNames, imageClassNames, alt, loading }: ImagesProps) {

  return (
    <figure className={`${imageUri ? '' : 'flex items-center'} bg-slate-700 ${classNames}`}>
      {
        imageUri ?
        <img src={imageUri} loading={loading} alt={`${alt}-profile`} className={`w-full h-full object-cover ${imageClassNames}`} />
        : <p className="font-bold text-center text-lg w-full capitalize">{getName(alt as string)}</p>
      }
    </figure>
  )
}