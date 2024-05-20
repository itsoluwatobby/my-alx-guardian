
type ImagesProps = {
  imageUri: string;
  classNames: string;
  imageClassNames?: string;
  alt?: string;
  loading?: 'eager' | 'lazy';
}

export default function GuardianImages({ imageUri, classNames, imageClassNames, alt, loading }: ImagesProps) {

  return (
    <figure className={classNames}>
      <img src={imageUri} loading={loading} alt={alt} className={`w-full h-full object-cover ${imageClassNames}`} />
    </figure>
  )
}