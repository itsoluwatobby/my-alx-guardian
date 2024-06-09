import GuardianImages from "../component/GuardianImages";


export default function About() {
  return (
    <div className="flex flex-col gap-5 p-4 py-10">
      <p>About Developer</p>

      <div className='flex gap-3'>
        <GuardianImages
          imageUri={'/oluwatobi.jpg'}
          alt={'Oluwatobi'} isLoading={false} loading='eager'
          classNames="cursor-pointer hover:scale-[1.03] hover:animate-spin transition-transform flex-none h-48 w-48 border-2 border-gray-200 rounded-full"
          imageClassNames="rounded-full hover:animate-spin transition-transform"
        />
        Name: Akinola Oluwatobi
      </div>
    </div>
  )
}