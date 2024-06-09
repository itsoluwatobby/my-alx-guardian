import GuardianImages from "../component/GuardianImages";


export default function About() {
  return (
    <div
    id='about'
    className="flex flex-col gap-y-20 items-center justify-center py-14 w-full min-h-screen">
      <p className="text-5xl">About Developer</p>

      <div className='flex flex-col items-center gap-y-10 py-3'>
        <GuardianImages
          imageUri={'/oluwatobi.jpg'}
          alt={'Oluwatobi'} isLoading={false} loading='eager'
          classNames="cursor-pointer hover:scale-[1.03] transition-transform flex-none h-48 w-48 border-2 border-gray-200 rounded-full"
          imageClassNames="rounded-full"
        />
        <div className='flex flex-col gap-y-2 w-full md:items-center'>
          <p>
            Name: <span className="font-medium">Akinola Oluwatobi</span>
          </p>
          <p>
            source code: <a href='https://github.com/itsoluwatobby/my-alx-guardian' target="_blank" className="font-medium text-blue-600 underline underline-offset-2">my-alx-guardian</a>
          </p>
          <p>
            Github Profile: <a href='https://github.com/itsoluwatobby' target="_blank" className="font-medium text-blue-600 underline underline-offset-2">Akinola Oluwatobi</a>
          </p>
          <div className="text-[13px] md:w-[80%]">
          I'm Oluwatobi Akinola Samuel.
          A software developer who has gained extensive knowledge and skills in programming languages and frameworks, like javascript, typescript, Reactjs, Nextj.s, C, Python, flask and bash scripting.
          </div>
        </div>
      </div>
    </div>
  )
}