import { Check, Trash2 } from 'lucide-react'
import React from 'react'

export default function ListActivity({childData}){
  return (
    <section className='p-6'>
      <h1 className="text-xl mb-4">Activities <span>{childData.childName}</span></h1>
      <div className="flex flex-rows">
        {childData && childData.map((child, index) => {
          <Link href={`/mainpage/activity/edit?childId=${childData.id}`}>
            <div key={index} className='card w-40 shadow-xl border-2 border border-[#FFDEB4]'>
              <div className="card-body">
                <p>{child.task}</p>
                <div className='card-actions justify-end'>
                  <button type='button' className="btn btn-xs">
                    <Check className="h-4 w-4" />
                  </button>
                  <button type='button' className="btn btn-xs">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div> 
              </div> 
            </div>
          </Link>
        })}
      </div>
    </section>
  )
}

