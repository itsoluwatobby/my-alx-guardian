import { About, Hero } from "../components/home";


export default function Home() {

  return (
    <div className="w-full md:p-10 py-10 px-6 h-full flex flex-col items-center gap-y-10">

      <Hero />

      <About />

    </div>
  )
}