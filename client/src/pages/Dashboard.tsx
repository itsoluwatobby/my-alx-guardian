import { Input } from "../components/component/Input";
import { useState } from "react";
import { Article } from "../components/dashbord/Article";

export default function Dashboard() {
  const [search, setSearch] = useState<string>('');
   const [expandDetail, setExpandDetail] = useState<ExpandDetailsType>(
    { id: '', toggle: 'CLOSE' }
  );

  return (
    <main className="flex items-center h-full w-full">
      <div className="flex items-center h-full w-full">
        <aside className="flex flex-col h-full overflow-y-scroll shadow-inner w-1/5 min-w-48 maxmobile:hidden">

        </aside>

        <section className="flex flex-col flex-auto rounded-md overflow-y-scroll h-full shadow-md p-3 px-2">
          <div className="w-full flex justify-center z-20 sticky top-0">
            <Input search={search} setSearch={setSearch} />
          </div>
          <div className="flex flex-col flex-auto py-4 gap-4">
            {
              [...Array(10).keys()].map((i) => (
                <Article key={i} post={{ id: i.toString() }} 
                expandDetail={expandDetail} setExpandDetail={setExpandDetail}
                />
              ))
            }
          </div>
        </section>

        <aside className="md:flex flex-col h-full overflow-y-scroll shadow-inner w-1/4 hidden">

        </aside>
      </div>
    </main>
  )
}