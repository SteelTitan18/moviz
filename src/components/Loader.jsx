import { TbLoader3 } from "react-icons/tb"

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <TbLoader3 className="animate-spin size-16" />
    </div>
  )
}
