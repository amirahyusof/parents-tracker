import { BoltIcon, ClockIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function ActivityStatus ({ status }:{ status: string}){
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-md',
        {
          'bg-slate-500 text-gray-900': status === 'new',
          'bg-blue-500 text-gray-900': status === 'on progress',
          'bg-green-500 text-gray-900': status === "completed"
        }
      )}
    >
      {status === 'new' ? (
        <>
          New
          <BoltIcon className="ml-1 w-4 text-gray-900" />

        </>
      ) : null}
      {status === 'on progress' ? (
        <>
          On Progress
          <ClockIcon className="ml-1 w-4 text-gray-900" />
        </>
      ) :null}
      {status === 'completed' ? (
        <>
          Completed
          <FaceSmileIcon className="ml-1 w-4 text-gray-900" />
        </>
      ) :null}
    </span>
  )
}