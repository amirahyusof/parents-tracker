"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useActionState } from "react";
import { createActivity, State } from "@/lib/action";
import { ActivityForm, Participants } from "@/lib/definitions";
import Link from "next/link";


const formSchema = z.object({
  activityName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().optional(),
  participants: z.string().optional(),
  notes: z.string().optional()
})

export default function FeedbackForm({
  activity,
}: {
  activity: ActivityForm;
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
          <Button type="submit">Add Feedback & Notes</Button>
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