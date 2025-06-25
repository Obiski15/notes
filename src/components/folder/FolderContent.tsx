import { formatDate } from "@/lib/utils"

const data = [
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
  {
    title: "Something is going on today",
    date: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique blanditiis ex, at illum a vel sit iusto nostrum voluptas eligendi quos ad consequuntur aspernatur incidunt aut quae. Voluptatibus, mollitia!",
  },
]

function FolderContent() {
  return (
    <div className="space-y-5 px-5 py-[30px]">
      {data.map((val, index) => (
        <div key={index} className="space-y-2.5 bg-[#FFFFFF08] p-5">
          <h3 className="text-lg font-semibold leading-7">{val.title}</h3>
          <div className="flex items-center justify-between gap-2.5">
            <p className="text-foreground/40">{formatDate(val.date)}</p>
            <p className="line-clamp-1 text-foreground/60">{val.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FolderContent
