import GuardianImages from "../components/component/GuardianImages";


export default function Profile() {
  return (
    <main className="flex px-2 py-4 h-full w-full">
      <GuardianImages 
      imageUri="" alt="User 2" textSize="text-6xl"
      classNames="size-32 rounded-full" imageClassNames="rounded-full"
      />
      
    </main>
  )
}