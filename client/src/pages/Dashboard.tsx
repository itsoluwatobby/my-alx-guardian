import { Input } from "../components/component/Input";
import { useState } from "react";
import { Article } from "../components/dashbord/Article";

export default function Dashboard() {
  const [search, setSearch] = useState<string>('');
  const [expandDetail, setExpandDetail] = useState<ExpandDetailsType>(
    { id: '', toggle: 'CLOSE' }
  );

  return (
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
  )
}