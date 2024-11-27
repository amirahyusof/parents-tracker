"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function EditProfile({participants} :{participants: Participants[];}){
  return(
    <section>
      {/*Personal information section*/}
      <h1 className="text-2xl">Edit Profile</h1>
      
      <Card>
      <form className="space-y-8">
      <div className="rounded-md bg-gray-400 p-4 md:p-6">
        
        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="name">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input 
              id="name"
              name="name"
              defaultValue={participants.name}
              placeholder="Activity Name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div>
              <input 
              id="email"
              name="email"
              defaultValue={participants.email}
              placeholder="Description of activity"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div>
              <input 
              id="password"
              name="password"
              defaultValue={participants.password}
              placeholder="Description of activity"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="phone">
            Phone Number
          </label>
          <div className="relative">
            <div>
              <input 
              id="phone"
              name="phone"
              defaultValue={participants.phoneNumber}
              placeholder="Description of activity"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        
        
        
        <div className="mt-6 flex justify-end gap-4">
          <Button type="submit">Save Changes</Button>
          <Link 
            href="/activities"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>

        

      </Card>

     
    </section>
  )
}