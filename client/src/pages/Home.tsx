import { About, Hero } from "../components/home";
import { MetaTags } from "../layouts/MetaTagsOGgraph";

export default function Home() {

  return (
    <div className="w-full md:p-10 py-10 px-6 h-full flex flex-col items-center gap-y-10">
       <MetaTags
        title='Home Page'
        description='Welcome page for users'
        url=''
        image=''
      />

      <Hero />

      <About />

    </div>
  )
}