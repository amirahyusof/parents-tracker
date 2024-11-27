"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useActionState } from "react";
import { createActivity, State } from "@/lib/action";
import { ActivityForm, Participants } from "@/lib/definitions";
import Link from "next/link";
import {
  BellAlertIcon,
  BoltIcon,
  FaceSmileIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const formSchema = z.object({
  activityName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().optional(),
  participants: z.string().optional(),
  notes: z.string().optional()
})

export default function EditForm({
  activity,
  participants
}: {
  activity: ActivityForm;
  participants: Participants[];
}){
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityName: "",
      description: "",
      participants: "",
      notes: ""
    },
  })

  // const initialState: State = { message: null, errors: {}}
  // const [state, formAction] = useActionState(createActivity, initialState)

  return (
    <form className="space-y-8">
      <div className="rounded-md bg-gray-400 p-4 md:p-6">
        
        {/* Activity name */}
        <div className="mb-4">
          <label htmlFor="activity">
            Activity Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input 
              id="activityName"
              name="activity"
              defaultValue={activity.activityName}
              placeholder="Activity Name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description">
            Description
          </label>
          <div className="relative">
            <div>
              <input 
              id="description"
              name="description"
              defaultValue={activity.description}
              placeholder="Description of activity"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="mb-4">
          <label htmlFor="participants">
            Participants
          </label>
          <div className="relative">
            <select
              id="participants"
              name="participants"
              className="peer block w-full cursor-pointer rounded-md bordrer  border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={activity.id}
            >
              <option value="" disabled>
                 select a participant
              </option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Activity Status */}
        <fieldset>
          <legend>
            Set the activity status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                 id="new"
                 name="status"
                 type="radio"
                 value="new"
                 defaultChecked = {activity.status === 'new'}
                 className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="new"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  New <BoltIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                 id="on progress"
                 name="status"
                 type="radio"
                 value="on progress"
                 defaultChecked = {activity.status === 'on progress'}
                 className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="new"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  On Progress <BellAlertIcon className="h-4 w-4" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                 id="completed"
                 name="status"
                 type="radio"
                 value="completed"
                 defaultChecked = {activity.status === 'completed'}
                 className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="new"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Completed <FaceSmileIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Notes */}
        <div className="mb-4">
          <label htmlFor="note">
            Notes
          </label>
          <div className="relative">
            <div>
              <input 
              id="note"
              name="note"
              defaultValue={activity.notes}
              placeholder="Notes for activity"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/*Date created */}
        {/* <FormField
          control={form.control}
          name="activityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        
        
        <div className="mt-6 flex justify-end gap-4">
          <Button type="submit">Edit Activity</Button>
          <Link 
            href="/activities"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
    

  )
}